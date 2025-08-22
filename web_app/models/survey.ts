// web_app/models/survey.ts
import { ObjectId } from 'mongodb';

// Structure for answers from the psychometric test
export interface PsychometricAnswer {
  questionId: string;
  // e.g., 1-5 for a Likert scale, or a specific choice
  answerValue: number; 
}

// Structure for the outcome of the simulation game
export interface SimulationGameResult {
  // A score based on how 'optimal' the user's decisions were
  decisionQualityScore: number; 
  // A score indicating the user's willingness to take risks
  riskAversionScore: number; 
}

// This is the complete data contract for a user's survey submission
export interface SurveySubmission {
  _id?: ObjectId;
  userId: ObjectId;
  submittedAt: Date;

  // Section 1: Psychometric Test
  psychometricAnswers: PsychometricAnswer[];

  // Section 2: Financial Survey
  financial: {
    monthlyIncome: number;
    monthlyExpenses: number;
    totalSavings: number;
    totalDebt: number;
    hasInvestments: boolean;
    investmentTypes: ('stocks' | 'crypto' | 'real_estate' | 'other')[];
  };

  // Section 3: Health Survey
  health: {
    // How many days per week do you exercise?
    exerciseFrequency: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    // On a scale of 1-5, how would you rate your diet?
    dietQuality: 1 | 2 | 3 | 4 | 5;
    // Average hours of sleep per night
    sleepHoursPerNight: number;
  };

  // Section 4: Lifestyle Survey
  lifestyle: {
    // On a scale of 1-5, how is your work-life balance?
    workLifeBalance: 1 | 2 | 3 | 4 | 5;
    // How often do you engage in social activities?
    socialFrequency: 'daily' | 'weekly' | 'monthly' | 'rarely';
  };
  
  // Final Section: Simulation Game
  simulationResult: SimulationGameResult;
}