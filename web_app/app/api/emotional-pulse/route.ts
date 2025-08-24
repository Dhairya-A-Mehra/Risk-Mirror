// web_app/app/api/emotional-pulse/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Groq from 'groq-sdk';
import { HealthLog } from '@/models/healthLog';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  const decodedToken = verifyAuth(request);
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

    if (image) {
      console.warn('Image analysis not supported by Groq API. Skipping.');
    }

    if (voice) {
      console.warn('Voice transcription not supported by Groq API. Skipping.');
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