import { ObjectId } from 'mongodb';

export interface Profile {
  avatar: string;
  persona: string;
  location?: {
    city: string;
    country: string;
  };
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
  financialCalmIndex: number;
  interdependencies: Interdependency[];
  keyBehavioralSignals: string[];
}

export interface User {
  _id?: ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  medicalExpenseForecast?: {
    predictedAnnualCost: number;
    lastCalculated: Date;
  };
  passwordHash: string;
  fullName: string;
  // gamification: Gamification;
  // dynamicRiskDNA: DynamicRiskDNA;
  // integrations: Integrations;
  // profile: Profile;
  // riskThreshold: number; // Made non-optional to match DashboardData
}