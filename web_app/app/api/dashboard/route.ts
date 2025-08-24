// web_app/app/api/dashboard/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { getRedisClient } from '@/lib/redis';
import { ObjectId } from 'mongodb';
import { google } from 'googleapis';

// Import all models
import { User } from '@/models/user';
import { Plan } from '@/models/plan';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { Insight } from '@/models/insight';
import { RiskHistory } from '@/models/riskHistory';
import { Prediction } from '@/models/prediction';
import { DashboardData } from '@/models/dashboard';

export async function GET(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);
  
  let redis;
  try {
    redis = getRedisClient();
  } catch (error) {
    console.error("Could not initialize Redis client:", error);
    // If Redis can't connect, we can proceed without caching, but we log the error.
  }

  const cacheKey = `dashboard:${userId.toString()}`;
  if (redis) {
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log(`--- DASHBOARD CACHE HIT for user: ${userId.toString()} ---`);
        return NextResponse.json(JSON.parse(cachedData));
      }
    } catch (error) {
      console.warn("Redis cache check failed:", error);
    }
  }

  console.log(`--- DASHBOARD CACHE MISS for user: ${userId.toString()} ---`);

  try {
    const { db } = await connectToDatabase();

    const userPromise = db.collection<User>('users').findOne({ _id: userId }, { projection: { passwordHash: 0 } });
    const activePlanPromise = db.collection<Plan>('plans').findOne({ userId, status: 'active' });
    const insightsPromise = db.collection<Insight>('insights').find({ userId, isArchived: false }).sort({ createdAt: -1 }).limit(5).toArray();
    const latestRiskExplanationPromise = db.collection<ExplainabilityLog>('explainability_logs').findOne({ userId, decisionType: 'Risk Score Calculation' }, { sort: { createdAt: -1 } });
    const riskHistoryPromise = db.collection<RiskHistory>('risk_history').find({ userId }).sort({ snapshotDate: -1 }).limit(30).toArray();
    const accuracyPromise = db.collection<Prediction>('predictions').aggregate([
      { $match: { userId, isCorrect: { $exists: true } } },
      { $group: { _id: "$agent", total: { $sum: 1 }, correct: { $sum: { $cond: ["$isCorrect", 1, 0] } } } }
    ]).toArray();
    
    const [user, activePlan, insights, latestRiskExplanation, riskHistory, accuracyResults] = await Promise.all([
      userPromise, activePlanPromise, insightsPromise, latestRiskExplanationPromise, riskHistoryPromise, accuracyPromise
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    let googleCalendarEvents: any[] = [];
    if (user.integrations?.google?.linked && user.integrations.google.accessToken) {
        // ... your google calendar fetch logic ...
    }

    const financialAccuracy = accuracyResults.find((r:any) => r._id === 'Financial Agent') || { total: 0, correct: 0 };
    const healthAccuracy = accuracyResults.find((r:any) => r._id === 'Health Agent') || { total: 0, correct: 0 };

    const dashboardData: DashboardData = {
      user: { fullName: user.fullName, email: user.email, profile: user.profile, gamification: user.gamification },
      riskDNA: user.dynamicRiskDNA,
      activePlan,
      insights: {
        recommendations: insights.filter(i => i.type === 'recommendation'),
        emotionalROI: insights.filter(i => i.type === 'emotional_roi'),
      },
      latestRiskExplanation,
      googleCalendarEvents: googleCalendarEvents.map(e => ({
        summary: e.summary || 'No Title',
        start: e.start || { date: new Date().toISOString() },
        end: e.end || { date: new Date().toISOString() }
      })),
      riskHistory: riskHistory.reverse(),
      agentAccuracy: {
        financial: { total: financialAccuracy.total, correct: financialAccuracy.correct, accuracy: financialAccuracy.total > 0 ? (financialAccuracy.correct / financialAccuracy.total) : 0 },
        health: { total: healthAccuracy.total, correct: healthAccuracy.correct, accuracy: healthAccuracy.total > 0 ? (healthAccuracy.correct / healthAccuracy.total) : 0 }
      }
    };

    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(dashboardData), 'EX', 300);
        console.log(`--- Dashboard data stored in cache for user: ${userId.toString()} ---`);
      } catch (error) {
        console.warn("Redis cache set failed:", error);
      }
    }

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}