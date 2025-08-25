
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyJwt } from '@/lib/jwt';
import { ObjectId } from 'mongodb';
import { getAIPlan } from '@/lib/ai';

export async function GET(request: NextRequest) {
  // Get JWT from sessionToken cookie
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const decodedToken = verifyJwt(token);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  // Always call the AI system for a fresh plan
  const plan = await getAIPlan(user);
  return NextResponse.json({ aiPlan: plan });
}

export async function POST(request: NextRequest) {
  // Get JWT from sessionToken cookie
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const decodedToken = verifyJwt(token);
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
