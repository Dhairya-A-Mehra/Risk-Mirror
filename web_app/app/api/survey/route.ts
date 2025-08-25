// web_app/app/api/survey/route.ts

import { NextResponse, NextRequest } from 'next/server'; // MODIFIED: Import NextRequest
import { SurveySubmission } from '@/models/survey';
import { DynamicRiskDNA } from '@/models/user';

// --- ADDED IMPORTS ---
// For connecting to the database
import { connectToDatabase } from '@/lib/mongodb'; 
// For verifying the user's session token
import { verifyAuth } from '@/lib/auth'; 
// For converting the user ID string to a MongoDB ObjectId
import { ObjectId } from 'mongodb'; 

/**
 * Calculates the initial Risk DNA based on survey answers.
 * This function is self-contained and correct. NO CHANGES NEEDED HERE.
 */
const calculateInitialRiskDNA = (submission: SurveySubmission): DynamicRiskDNA => {
  let financialScore = 50;
  const financial = submission.financial ?? {};
  const health = submission.health ?? {};
  const lifestyle = submission.lifestyle ?? {};
  const psychometricAnswers = submission.psychometricAnswers ?? [];
  const simulationResult = submission.simulationResult ?? {};

  // Defensive defaults using optional chaining and fallback values
  const monthlyIncome = typeof financial.monthlyIncome === 'number' ? financial.monthlyIncome : 0;
  const monthlyExpenses = typeof financial.monthlyExpenses === 'number' ? financial.monthlyExpenses : 0;
  const totalSavings = typeof financial.totalSavings === 'number' ? financial.totalSavings : 0;
  const totalDebt = typeof financial.totalDebt === 'number' ? financial.totalDebt : 1;
  const hasInvestments = !!financial.hasInvestments;

  const netIncome = monthlyIncome - monthlyExpenses;
  const savingsToDebtRatio = totalSavings / (totalDebt || 1);
  financialScore += netIncome > 1000 ? 15 : 5;
  financialScore += savingsToDebtRatio > 2 ? 20 : 5;
  financialScore += hasInvestments ? 15 : 0;

  let healthScore = 40;
  const exerciseFrequency = typeof health.exerciseFrequency === 'number' ? health.exerciseFrequency : 0;
  const dietQuality = typeof health.dietQuality === 'number' ? health.dietQuality : 1;
  const sleepHoursPerNight = typeof health.sleepHoursPerNight === 'number' ? health.sleepHoursPerNight : 0;
  healthScore += exerciseFrequency * 3;
  healthScore += dietQuality * 5;
  healthScore += sleepHoursPerNight > 6 ? 15 : 5;

  let behavioralScore = 30;
  const riskAnswerObj = psychometricAnswers.find(a => a.questionId === 'risk-propensity');
  const riskTakingAnswer = typeof riskAnswerObj?.answerValue === 'number' ? riskAnswerObj.answerValue : 3;
  const workLifeBalance = typeof lifestyle.workLifeBalance === 'number' ? lifestyle.workLifeBalance : 3;
  const decisionQualityScore = typeof simulationResult.decisionQualityScore === 'number' ? simulationResult.decisionQualityScore : 0;
  behavioralScore += workLifeBalance * 4;
  behavioralScore += (5 - riskTakingAnswer) * 5;
  behavioralScore += decisionQualityScore * 0.5;

  financialScore = Math.max(0, Math.min(100, Math.round(financialScore)));
  healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
  behavioralScore = Math.max(0, Math.min(100, Math.round(behavioralScore)));

  // Only calculate overallScore if all are valid numbers
  const validScores = [financialScore, healthScore, behavioralScore].every(s => typeof s === 'number' && !isNaN(s));
  const overallScore = validScores ? Math.round((financialScore + healthScore + behavioralScore) / 3) : 0;

  return {
    lastCalculated: new Date(),
    overallScore,
    financialScore,
    healthScore,
    behavioralScore,
    financialCalmIndex: 60,
    interdependencies: [],
    keyBehavioralSignals: ['Initial assessment complete.'],
  };
};


// --- THIS IS THE UPDATED AND CORRECTED FUNCTION ---
export async function POST(req: NextRequest) {
  // 1. Accept unauthenticated survey submissions
  let userId: ObjectId | null = null;
  let decodedToken: any = null;
  try {
    decodedToken = await verifyAuth(req);
    if (decodedToken && decodedToken.userId) {
      userId = new ObjectId(decodedToken.userId);
    }
  } catch (e) {
    // No token, allow anonymous
    userId = null;
  }

  try {
    const body: SurveySubmission = await req.json();

    // 2. Calculate the user's initial risk scores from the survey data
    const initialRiskDNA = calculateInitialRiskDNA(body);
    console.log("Calculated Initial Risk DNA:", initialRiskDNA);

    if (userId) {
      // 3. Connect to the database
      const { db } = await connectToDatabase();
      // 4. Update the specific user's document with the new dynamicRiskDNA
      const result = await db.collection('users').updateOne(
        { _id: userId },
        { $set: { dynamicRiskDNA: initialRiskDNA } }
      );
      // Check if the update was successful
      if (result.modifiedCount === 0) {
        return NextResponse.json({ message: 'User not found or data was unchanged' }, { status: 404 });
      }
      // 5. Return a success response
      return NextResponse.json({ 
        message: 'Survey submitted and risk profile updated successfully!',
        calculatedScores: initialRiskDNA 
      }, { status: 200 });
    } else {
      // Anonymous submission: just return calculated scores
      return NextResponse.json({ 
        message: 'Survey submitted anonymously. No user profile updated.',
        calculatedScores: initialRiskDNA 
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Survey submission failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}