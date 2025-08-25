import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({ insights: user.insights || [] });
}
