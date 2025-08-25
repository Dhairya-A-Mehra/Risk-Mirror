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
  // Defensive: always use numbers, never NaN/null, and strong defaults
  const financial = submission.financial ?? {};
  const health = submission.health ?? {};
  const lifestyle = submission.lifestyle ?? {};
  const psychometricAnswers = Array.isArray(submission.psychometricAnswers) ? submission.psychometricAnswers : [];
  const simulationResult = submission.simulationResult ?? {};

  // Financial
  const monthlyIncome = Number.isFinite(financial.monthlyIncome) ? financial.monthlyIncome : 0;
  const monthlyExpenses = Number.isFinite(financial.monthlyExpenses) ? financial.monthlyExpenses : 0;
  const totalSavings = Number.isFinite(financial.totalSavings) ? financial.totalSavings : 0;
  const totalDebt = Number.isFinite(financial.totalDebt) && financial.totalDebt !== 0 ? financial.totalDebt : 1;
  const hasInvestments = typeof financial.hasInvestments === 'boolean' ? financial.hasInvestments : false;
  const investmentTypes = Array.isArray(financial.investmentTypes) ? financial.investmentTypes.length : 0;

  let financialScore = 50;
  const netIncome = monthlyIncome - monthlyExpenses;
  const savingsToDebtRatio = totalSavings / totalDebt;
  financialScore += netIncome > 1000 ? 15 : 5;
  financialScore += savingsToDebtRatio > 2 ? 20 : 5;
  financialScore += hasInvestments ? 15 : 0;
  financialScore += investmentTypes * 2; // reward for diversification

  // Health
  const exerciseFrequency = Number.isFinite(health.exerciseFrequency) ? health.exerciseFrequency : 0;
  const dietQuality = Number.isFinite(health.dietQuality) ? health.dietQuality : 3;
  const sleepHoursPerNight = Number.isFinite(health.sleepHoursPerNight) ? health.sleepHoursPerNight : 7;

  let healthScore = 40;
  healthScore += exerciseFrequency * 3;
  healthScore += dietQuality * 5;
  healthScore += sleepHoursPerNight > 6 ? 15 : 5;

  // Lifestyle & Behavioral
  const workLifeBalance = Number.isFinite(lifestyle.workLifeBalance) ? lifestyle.workLifeBalance : 3;
  const socialFrequency = typeof lifestyle.socialFrequency === 'string' ? lifestyle.socialFrequency : 'monthly';
  let socialScore = 0;
  if (socialFrequency === 'daily') socialScore = 10;
  else if (socialFrequency === 'weekly') socialScore = 7;
  else if (socialFrequency === 'monthly') socialScore = 4;
  else socialScore = 1;

  let behavioralScore = 30;
  const riskAnswerObj = psychometricAnswers.find(a => a.questionId === 'risk-propensity');
  const riskTakingAnswer = (riskAnswerObj && Number.isFinite(riskAnswerObj.answerValue)) ? riskAnswerObj.answerValue : 3;
  const decisionQualityScore = Number.isFinite(simulationResult.decisionQualityScore) ? simulationResult.decisionQualityScore : 5;
  behavioralScore += workLifeBalance * 4;
  behavioralScore += (5 - riskTakingAnswer) * 5;
  behavioralScore += decisionQualityScore * 0.5;
  behavioralScore += socialScore;

  // Clamp and round
  financialScore = Math.max(0, Math.min(100, Math.round(financialScore)));
  healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
  behavioralScore = Math.max(0, Math.min(100, Math.round(behavioralScore)));

  // Always valid numbers
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
  // 1. Accept unauthenticated survey submissions
  let userId: ObjectId | null = null;
  let decodedToken: any = null;
  try {
    // Extract sessionToken from cookies
    const token = req.cookies.get('sessionToken')?.value;
    if (token) {
      decodedToken = await verifyAuth(token);
      if (decodedToken && decodedToken.userId) {
        userId = new ObjectId(decodedToken.userId);
      }
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

      // 4. Prepare update object
      const updateObj: any = {
        dynamicRiskDNA: initialRiskDNA,
        latestSurveySubmission: body, // For backward compatibility
      };

      // Optionally map basic details to top-level user fields if present
      if (body.basicDetails) {
        if (body.basicDetails.fullName) updateObj.fullName = body.basicDetails.fullName;
        if (body.basicDetails.age) updateObj.age = body.basicDetails.age;
        if (body.basicDetails.gender) updateObj.gender = body.basicDetails.gender;
        if (body.basicDetails.email) updateObj.email = body.basicDetails.email;
        if (body.basicDetails.phone) updateObj.phone = body.basicDetails.phone;
      }

      // Push the new survey submission to the surveySubmissions array
      const result = await db.collection('users').updateOne(
        { _id: userId },
        Object.assign({ $set: updateObj }, { $push: { surveySubmissions: { ...body, submittedAt: new Date() } } }) as any
      );
      // Check if the update was successful
      if (result.modifiedCount === 0) {
        return NextResponse.json({ message: 'User not found or data was unchanged' }, { status: 404 });
      }
      // 5. Return a success response
      return NextResponse.json({ 
        message: 'Survey submitted and risk profile updated successfully! All details saved.',
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