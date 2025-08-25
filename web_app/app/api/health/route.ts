

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyJwt } from '@/lib/jwt';
import { ObjectId } from 'mongodb';

import { User } from '@/models/user';
import { HealthInsurancePolicy } from '@/models/healthInsurance';
import { Insight } from '@/models/insight';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { HealthPageData } from '@/models/healthPage'; 


export async function GET(request: NextRequest) {
  // Read JWT from sessionToken cookie (same as /api/auth/me)
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();

    const userPromise = db.collection<User>('users').findOne({ _id: userId });
    const policiesPromise = db.collection<HealthInsurancePolicy>('health_insurance_policies').find({ userId, isArchived: false }).toArray();
    const insightsPromise = db.collection<Insight>('insights').find({ 
      userId, 
      type: 'recommendation', 
      isArchived: false 
    }).sort({ createdAt: -1 }).limit(3).toArray();
    const explanationPromise = db.collection<ExplainabilityLog>('explainability_logs').findOne({ 
      userId, 
      decisionType: 'Health Score Calculation' 
    }, { sort: { createdAt: -1 } });

    const [user, policies, insights, explanation] = await Promise.all([
      userPromise, policiesPromise, insightsPromise, explanationPromise
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    const healthPageData: HealthPageData = {
      wellnessScore: (user as any).dynamicRiskDNA?.healthScore ?? 0,
      wealthScore: (user as any).dynamicRiskDNA?.financialScore ?? 0,
      userCity: (user as any).profile?.location?.city,
      insurancePolicies: policies,
      latestHealthInsights: insights,
      activeHealthPlan: null, 
      latestHealthScoreExplanation: explanation,
      medicalExpenseForecast: (user as any).medicalExpenseForecast?.predictedAnnualCost || 0,
    };

    return NextResponse.json(healthPageData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch health page data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
