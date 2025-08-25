// web_app/app/api/user/threshold/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  // Extract sessionToken from cookies
  const token = request.cookies.get('sessionToken')?.value;
  const decodedToken = token ? verifyAuth(token) : null;
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { riskThreshold } = await request.json();
    if (typeof riskThreshold !== 'number' || riskThreshold < 0 || riskThreshold > 100) {
      return NextResponse.json({ message: 'Invalid risk threshold' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: userId },
      { $set: { riskThreshold } }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to update threshold:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}