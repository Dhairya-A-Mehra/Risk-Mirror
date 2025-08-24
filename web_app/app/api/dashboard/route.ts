import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { DashboardData } from '@/models/dashboard';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  const decodedToken = await verifyAuth(request);

  if (!decodedToken) {
    console.log('Unauthorized request to /api/dashboard');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decodedToken.userId) },
      { projection: { fullName: 1, email: 1, profile: 1, gamification: 1, riskThreshold: 1, dynamicRiskDNA: 1 } }
    );

    if (!user) {
      console.log('User not found for ID:', decodedToken.userId);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const dashboardData: DashboardData = {
      user: {
        fullName: user.fullName,
        email: user.email,
        profile: user.profile,
        gamification: user.gamification,
        riskThreshold: user.riskThreshold,
      },
      riskDNA: {
        lastCalculated: user.dynamicRiskDNA?.lastCalculated || new Date(),
        overallScore: user.dynamicRiskDNA?.overallScore || 0,
        financialScore: user.dynamicRiskDNA?.financialScore || 0,
        healthScore: user.dynamicRiskDNA?.healthScore || 0,
        behavioralScore: user.dynamicRiskDNA?.behavioralScore || 0,
        financialCalmIndex: user.dynamicRiskDNA?.financialCalmIndex || 0,
        interdependencies: user.dynamicRiskDNA?.interdependencies || [],
        keyBehavioralSignals: user.dynamicRiskDNA?.keyBehavioralSignals || [],
      },
      activePlan: null,
      insights: { recommendations: [], emotionalROI: [] },
      latestRiskExplanation: null,
      googleCalendarEvents: [],
      riskHistory: [],
      agentAccuracy: {
        financial: { total: 0, correct: 0, accuracy: 0 },
        health: { total: 0, correct: 0, accuracy: 0 },
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}