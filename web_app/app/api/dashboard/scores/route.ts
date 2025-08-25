import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';
import { verifyJwt } from '@/lib/jwt';
import { ObjectId } from 'mongodb';

// Import ExplainabilityLog type for type hinting (optional)
// import { ExplainabilityLog } from '@/models/explainabilityLog';



export async function GET(request: NextRequest) {
  // Get JWT from sessionToken cookie
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const dbUser = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!dbUser) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  // Fetch all explainability logs for this user
  const explainabilityLogs = await db
    .collection('explainabilitylogs')
    .find({ userId: new ObjectId(decodedToken.userId) })
    .sort({ createdAt: -1 })
    .toArray();

  // Map riskHistory for all domains if present (legacy: may be array of objects with domain info)
  let riskHistory = dbUser.riskHistory || [
    { date: new Date(), score: 60 },
    { date: new Date(Date.now() - 86400000), score: 58 },
  ];
  // If riskHistory is an object with domain keys, flatten to array with domain info
  if (riskHistory && !Array.isArray(riskHistory) && typeof riskHistory === 'object') {
    riskHistory = Object.entries(riskHistory).flatMap(([domain, arr]) =>
      Array.isArray(arr)
        ? arr.map((entry: any) => ({ ...entry, domain }))
        : []
    );
  }

  return NextResponse.json({
    riskDNA: dbUser.dynamicRiskDNA || {
      overallScore: 60,
      financialScore: 60,
      healthScore: 60,
      behavioralScore: 60,
      financialCalmIndex: 60,
      lastCalculated: new Date(),
      interdependencies: [],
      keyBehavioralSignals: ['No survey data yet.'],
    },
    agentAccuracy: dbUser.agentAccuracy || { overall: 0.8, lastUpdated: new Date() },
    riskHistory,
    user: {
      fullName: dbUser.fullName || 'User',
      gamification: dbUser.gamification || { streak: { current: 0, longest: 0 }, badges: [], leaderboardScore: 0 },
      riskThreshold: dbUser.riskThreshold || 50,
    },
    googleCalendarEvents: dbUser.googleCalendarEvents || [],
    latestRiskExplanation: dbUser.latestRiskExplanation || { reason: 'No explanation available.' },
    explainabilityLogs: explainabilityLogs || [],
  });
}
