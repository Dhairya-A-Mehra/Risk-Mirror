import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { verifyJwt } from '@/lib/jwt';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  // Get JWT from sessionToken cookie
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const decodedToken = verifyJwt(token);
  if (!decodedToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({
    insights: (user.insights && user.insights.length > 0) ? user.insights : [
      {
        type: 'recommendation',
        description: 'Complete your survey to get personalized insights!',
        createdAt: new Date(),
      },
      {
        type: 'emotionalROI',
        description: 'No emotional ROI data yet.',
        createdAt: new Date(),
      },
    ],
  });
}

