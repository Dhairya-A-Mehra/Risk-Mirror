// web_app/app/api/survey/route.ts

import { NextResponse } from 'next/server';
import { SurveySubmission } from '@/models/survey';
import { DynamicRiskDNA } from '@/models/user';

/**
 * MOCK FUNCTION: Calculates the initial Risk DNA based on survey answers.
 * In a real application, this logic would be far more complex and likely
 * involve machine learning models.
 */
const calculateInitialRiskDNA = (submission: SurveySubmission): DynamicRiskDNA => {
  let financialScore = 50;
  const { financial, health, lifestyle, psychometricAnswers, simulationResult } = submission;

  // Calculate Financial Score
  const netIncome = financial.monthlyIncome - financial.monthlyExpenses;
  const savingsToDebtRatio = financial.totalSavings / (financial.totalDebt || 1);
  financialScore += netIncome > 1000 ? 15 : 5;
  financialScore += savingsToDebtRatio > 2 ? 20 : 5;
  financialScore += financial.hasInvestments ? 15 : 0;
  
  // Calculate Health Score
  let healthScore = 40;
  healthScore += health.exerciseFrequency * 3;
  healthScore += health.dietQuality * 5;
  healthScore += health.sleepHoursPerNight > 6 ? 15 : 5;

  // Calculate Behavioral/Lifestyle Score
  // Combines lifestyle, psychometric, and game results
  let behavioralScore = 30;
  const riskTakingAnswer = psychometricAnswers.find(a => a.questionId === 'risk-propensity')?.answerValue || 3;
  behavioralScore += lifestyle.workLifeBalance * 4;
  behavioralScore += (5 - riskTakingAnswer) * 5; // Higher aversion = higher score initially
  behavioralScore += simulationResult.decisionQualityScore * 0.5;
  
  // Clamp scores between 0 and 100
  financialScore = Math.max(0, Math.min(100, Math.round(financialScore)));
  healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
  behavioralScore = Math.max(0, Math.min(100, Math.round(behavioralScore)));

  const overallScore = Math.round((financialScore + healthScore + behavioralScore) / 3);

  return {
    lastCalculated: new Date(),
    overallScore,
    financialScore,
    healthScore,
    behavioralScore,
    // Add other default values as needed from your user model
    financialCalmIndex: 60,
    interdependencies: [],
    keyBehavioralSignals: ['Initial assessment complete.'],
  };
};


export async function POST(req: Request) {
  try {
    const body: SurveySubmission = await req.json();

    // --- In a real application, you would do the following: ---
    // 1. Validate the incoming data.
    // 2. Get the authenticated user's ID from the session.
    // 3. Save the full `SurveySubmission` to a 'surveys' collection in your database.
    
    console.log("Received survey submission:", body);

    // 4. Calculate the user's initial risk scores.
    const initialRiskDNA = calculateInitialRiskDNA(body);
    console.log("Calculated Initial Risk DNA:", initialRiskDNA);

    // 5. Update the User document in the 'users' collection with the new `dynamicRiskDNA`.
    //    db.collection('users').updateOne({ _id: userId }, { $set: { dynamicRiskDNA: initialRiskDNA } });
    
    return NextResponse.json({ 
      message: 'Survey submitted successfully!',
      calculatedScores: initialRiskDNA 
    }, { status: 200 });

  } catch (error) {
    console.error('Survey submission failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}  