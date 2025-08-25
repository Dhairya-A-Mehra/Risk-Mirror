import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { getAIPlan } from '@/lib/ai';

export async function GET(request: NextRequest) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({ aiPlan: user.aiPlan?.[0] });
}

export async function POST(request: NextRequest) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  const plan = await getAIPlan(user); // Call AI system
  await db.collection('users').updateOne(
    { _id: user._id },
    { $set: { aiPlan: [{ startDate: new Date(), endDate: new Date(Date.now() + 90*24*3600*1000), plan }] } }
  );
  return NextResponse.json({ aiPlan: plan });
}
