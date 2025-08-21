// web_app/app/api/health/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Import all the necessary models
import { User } from '@/models/user';
import { HealthInsurancePolicy } from '@/models/healthInsurance';
import { Insight } from '@/models/insight';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { HealthPageData } from '@/models/healthPage'; // This is the data contract for the page

export async function GET(request: NextRequest) {
  // 1. Authenticate the user
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();

    // --- 2. Start Concurrent Database Queries for Performance ---
    const userPromise = db.collection<User>('users').findOne({ _id: userId });
    const policiesPromise = db.collection<HealthInsurancePolicy>('health_insurance_policies').find({ userId, isArchived: false }).toArray();
    const insightsPromise = db.collection<Insight>('insights').find({ 
      userId, 
      type: 'recommendation', // Assuming you might add a 'category' field later to filter for health insights
      isArchived: false 
    }).sort({ createdAt: -1 }).limit(3).toArray();
    const explanationPromise = db.collection<ExplainabilityLog>('explainability_logs').findOne({ 
      userId, 
      decisionType: 'Health Score Calculation' 
    }, { sort: { createdAt: -1 } });

    // Execute all queries at the same time
    const [user, policies, insights, explanation] = await Promise.all([
      userPromise, policiesPromise, insightsPromise, explanationPromise
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    // --- 3. Assemble the Final Response Payload ---
    // Note: We are NOT fetching the plan here anymore. That will be a separate client-side fetch.
    const healthPageData: HealthPageData = {
      wellnessScore: user.dynamicRiskDNA.healthScore,
      wealthScore: user.dynamicRiskDNA.financialScore,
      userCity: user.profile?.location?.city,
      insurancePolicies: policies,
      latestHealthInsights: insights,
      activeHealthPlan: null, // This will be fetched on the client
      latestHealthScoreExplanation: explanation,
      medicalExpenseForecast: user.medicalExpenseForecast?.predictedAnnualCost || 0,
    };

    return NextResponse.json(healthPageData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch health page data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}