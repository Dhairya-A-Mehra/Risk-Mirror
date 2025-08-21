// web_app/models/user.ts
import { ObjectId } from 'mongodb';

// --- Embedded Sub-documents ---

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
  avatar: string; // For the custom avatar
  persona: string; // For persona types (heavy investor, etc.)
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

// --- Main User Model ---

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
    // We add location for the map feature
    location?: {
      city: string;
      country: string;
      // You could also store lat/lon for more precise lookups
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
  // Feature 14: Financial Calm Index
  financialCalmIndex: number; // A score combining financial volatility and user stress
  interdependencies: Interdependency[];
  keyBehavioralSignals: string[];
}

