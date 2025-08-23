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
  const { financial, health, lifestyle, psychometricAnswers, simulationResult } = submission;

  const netIncome = financial.monthlyIncome - financial.monthlyExpenses;
  const savingsToDebtRatio = financial.totalSavings / (financial.totalDebt || 1);
  financialScore += netIncome > 1000 ? 15 : 5;
  financialScore += savingsToDebtRatio > 2 ? 20 : 5;
  financialScore += financial.hasInvestments ? 15 : 0;
  
  let healthScore = 40;
  healthScore += health.exerciseFrequency * 3;
  healthScore += health.dietQuality * 5;
  healthScore += health.sleepHoursPerNight > 6 ? 15 : 5;

  let behavioralScore = 30;
  const riskTakingAnswer = psychometricAnswers.find(a => a.questionId === 'risk-propensity')?.answerValue || 3;
  behavioralScore += lifestyle.workLifeBalance * 4;
  behavioralScore += (5 - riskTakingAnswer) * 5;
  behavioralScore += simulationResult.decisionQualityScore * 0.5;
  
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
    financialCalmIndex: 60,
    interdependencies: [],
    keyBehavioralSignals: ['Initial assessment complete.'],
  };
};


// --- THIS IS THE UPDATED AND CORRECTED FUNCTION ---
export async function POST(req: NextRequest) {
  // 1. Verify that the user is logged in
  const decodedToken = verifyAuth(req);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  // Convert the string ID from the token into a MongoDB ObjectId
  const userId = new ObjectId(decodedToken.userId);

  try {
    const body: SurveySubmission = await req.json();

    // 2. Calculate the user's initial risk scores from the survey data
    const initialRiskDNA = calculateInitialRiskDNA(body);
    console.log("Calculated Initial Risk DNA:", initialRiskDNA);

    // 3. Connect to the database
    const { db } = await connectToDatabase();
    
    // 4. Update the specific user's document with the new dynamicRiskDNA
    const result = await db.collection('users').updateOne(
      { _id: userId }, // The filter: find the user with this ID
      { 
        $set: { 
          dynamicRiskDNA: initialRiskDNA 
        } 
      } // The update: set the dynamicRiskDNA field to our calculated object
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

  } catch (error) {
    console.error('Survey submission failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}