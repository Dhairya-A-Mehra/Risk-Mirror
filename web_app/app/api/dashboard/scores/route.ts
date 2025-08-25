import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  let decodedToken = null;
  try {
    decodedToken = await verifyAuth(request);
    console.log('[scores API] Decoded token:', decodedToken);
  } catch (e) {
    console.error('[scores API] Error in verifyAuth:', e);
    decodedToken = null;
  }
  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const dbUser = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  console.log('[scores API] User from DB:', dbUser);
  if (!dbUser) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json({
    riskDNA: dbUser.dynamicRiskDNA || {},
    agentAccuracy: dbUser.agentAccuracy || {},
    riskHistory: dbUser.riskHistory || [],
    user: {
      fullName: dbUser.fullName || '',
      gamification: dbUser.gamification || { streak: { current: 0, longest: 0 }, badges: [], leaderboardScore: 0 },
      riskThreshold: dbUser.riskThreshold || 50,
    },
    googleCalendarEvents: dbUser.googleCalendarEvents || [],
    latestRiskExplanation: dbUser.latestRiskExplanation || null,
  });
}
