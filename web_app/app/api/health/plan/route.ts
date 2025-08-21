

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { Plan } from '@/models/plan';

export async function GET(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();

    const activeHealthPlan = await db.collection<Plan>('plans').findOne({
      userId,
      status: 'active',
      category: 'health'
    });
    
    return NextResponse.json(activeHealthPlan, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch health plan data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
