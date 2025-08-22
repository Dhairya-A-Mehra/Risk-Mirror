import { ObjectId } from 'mongodb';

export interface Profile {
  avatar: string;
  persona: string;
}

export interface Streak {
  current: number;
  longest: number;
}

export interface Gamification {
  badges: string[];
  leaderboardScore: number;
  streak: Streak;
}

export interface GoogleIntegration {
  linked: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiryDate?: Date;
}

export interface Profile {
  avatar: string; 
  persona: string; 
}

export interface Gamification {
  badges: string[];
  leaderboardScore: number;
  streak: { current: number; longest: number; };
}


export interface Integrations {
  google: GoogleIntegration;
  fitbitLinked: boolean;
  axioLinked: boolean;
}

export interface Interdependency {
  sourceRisk: 'financial' | 'health' | 'behavioral';
  targetRisk: 'financial' | 'health' | 'behavioral';
  impact: number;
  reason: string;
}

export interface DynamicRiskDNA {
  lastCalculated: Date;
  overallScore: number;
  financialScore: number;
  healthScore: number;
  behavioralScore: number;
  interdependencies: Interdependency[];
  keyBehavioralSignals: string[];
}


export interface User {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  gamification: Gamification;
  dynamicRiskDNA: DynamicRiskDNA;
  integrations: Integrations;
  profile: {
    avatar: string;
    persona: string;
    location?: {
      city: string;
      country: string;
    };
  };
  medicalExpenseForecast?: {
    predictedAnnualCost: number;
    lastCalculated: Date;
  };
}

export interface DynamicRiskDNA {
  lastCalculated: Date;
  overallScore: number;
  financialScore: number;
  healthScore: number;
  behavioralScore: number;
  financialCalmIndex: number; 
  interdependencies: Interdependency[];
  keyBehavioralSignals: string[];
}

