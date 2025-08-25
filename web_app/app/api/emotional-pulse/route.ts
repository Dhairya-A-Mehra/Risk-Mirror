// web_app/app/api/emotional-pulse/route.ts


import { NextResponse, NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Groq from 'groq-sdk';
import { HealthLog } from '@/models/healthLog';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;


export async function POST(request: NextRequest) {
  // Get JWT from sessionToken cookie
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const voice = formData.get('voice') as File | null;
    const typing = formData.get('typing') as string;

    let faceScore = 0;
    let voiceScore = 0;
    let typingScore = 0;
    let inputCount = typing ? 1 : 0;


    // IMAGE ANALYSIS: OpenAI Vision API
    if (image && OPENAI_API_KEY) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const base64Image = imageBuffer.toString('base64');
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Analyze this face for signs of stress, panic, or depression. Output a JSON object with a single property "score" (0-100, higher=worse). Example: {"score": 50}.' },
                { type: 'image_url', image_url: { url: `data:${image.type};base64,${base64Image}` } },
              ],
            },
          ],
          max_tokens: 100,
          response_format: { type: 'json_object' },
        }),
      });
      const openaiData = await openaiRes.json();
      let parsedImage: any = { score: 0 };
      try {
        parsedImage = JSON.parse(openaiData.choices?.[0]?.message?.content || '{}');
      } catch (e) {}
      faceScore = typeof parsedImage.score === 'number' ? parsedImage.score : 0;
      inputCount++;
    }

    // VOICE ANALYSIS: AssemblyAI
    if (voice && ASSEMBLYAI_API_KEY) {
      // Upload audio to AssemblyAI
      const voiceBuffer = Buffer.from(await voice.arrayBuffer());
      const uploadRes = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: { 'authorization': ASSEMBLYAI_API_KEY },
        body: voiceBuffer,
      });
      const uploadData = await uploadRes.json();
      const audio_url = uploadData.upload_url;
      // Request transcription + emotion
      const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'authorization': ASSEMBLYAI_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          audio_url,
          emotion_detection: true,
        }),
      });
      const transcriptData = await transcriptRes.json();
      // Poll for completion
      let transcriptId = transcriptData.id;
      let status = transcriptData.status;
      let emotions = [];
      for (let i = 0; i < 20 && status !== 'completed'; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const pollRes = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: { 'authorization': ASSEMBLYAI_API_KEY },
        });
        const pollData = await pollRes.json();
        status = pollData.status;
        if (status === 'completed') {
          emotions = pollData.emotions || [];
        }
      }
      // Score: average of negative emotions (anger, fear, sadness, etc.)
      if (emotions.length > 0) {
        const negative = emotions.filter((e: any) => ['angry','fear','sad','disgust'].includes(e.emotion));
        if (negative.length > 0) {
          voiceScore = Math.round(negative.reduce((sum: number, e: any) => sum + e.confidence * 100, 0) / negative.length);
        }
      }
      inputCount++;
    }

    if (typing) {
      const typingPrompt = `Analyze this typed text for signs of panic, stress, or depression: "${typing}". Output a JSON object with a single property "score" containing a stress score from 0 to 100. Example: {"score": 50}.`;
      const typingResponse = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: typingPrompt }],
        response_format: { type: 'json_object' },
      });
      const typingContent = typingResponse.choices[0].message.content;
      if (!typingContent) {
        console.error('Typing response content is null');
        throw new Error('Failed to analyze typing input');
      }
      let parsedTyping: any;
      try {
        parsedTyping = JSON.parse(typingContent as string);
      } catch (error) {
        console.error('Failed to parse typing response:', typingContent, error);
        parsedTyping = { score: 0 };
      }
      typingScore = typeof parsedTyping.score === 'number' ? parsedTyping.score : 0;
    }

    const stressScore = inputCount > 0 ? (faceScore + voiceScore + typingScore) / inputCount : 0;

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    if (user) {
      const adjustment = stressScore / 10;
      const newHealthScore = Math.max(0, Math.min(100, user.dynamicRiskDNA.healthScore - adjustment));
      const newOverallScore = (user.dynamicRiskDNA.financialScore + newHealthScore + user.dynamicRiskDNA.behavioralScore) / 3;

      await db.collection('users').updateOne({ _id: userId }, {
        $set: {
          'dynamicRiskDNA.healthScore': newHealthScore,
          'dynamicRiskDNA.overallScore': newOverallScore,
          'dynamicRiskDNA.lastCalculated': new Date(),
        }
      });

      const healthLog: HealthLog = {
        userId,
        createdAt: new Date(),
        emotionScan: { emotion: 'analyzed', stressLevel: stressScore },
        typingTest: { text: typing, score: typingScore },
      };
      await db.collection('health_logs').insertOne(healthLog);

      const threshold = user.riskThreshold || 50;
      let newStreak = user.gamification.streak;
      if (newOverallScore >= threshold) {
        newStreak.current += 1;
        if (newStreak.current > newStreak.longest) {
          newStreak.longest = newStreak.current;
        }
      } else {
        newStreak.current = 0;
      }
      await db.collection('users').updateOne({ _id: userId }, {
        $set: { 'gamification.streak': newStreak }
      });
    }

    return NextResponse.json({ success: true, stressScore }, { status: 200 });
  } catch (error) {
    console.error('Emotional pulse analysis failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}