import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { getEmotionalPulseScore } from '@/lib/ai';

export async function POST(request: NextRequest) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  const { imageUrl, voiceUrl, text } = await request.json();
  const score = await getEmotionalPulseScore({ imageUrl, voiceUrl, text });
  await db.collection('users').updateOne(
    { _id: user._id },
    { $push: { emotionalPulse: { date: new Date(), imageUrl, voiceUrl, text, score } } } as any // Type assertion to bypass TS error
  );
  return NextResponse.json({ score });
}
