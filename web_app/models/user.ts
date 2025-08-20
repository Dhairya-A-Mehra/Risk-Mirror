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
export interface DynamicRiskDNA {
  lastCalculated: Date;
  overallScore: number;
  financialScore: number;
  healthScore: number;
  behavioralScore: number;
}
export interface Integrations {
  googleCalendarLinked: boolean;
  fitbitLinked: boolean;
  axioLinked: boolean;
}
export interface User {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
  gamification: Gamification;
  dynamicRiskDNA: DynamicRiskDNA;
  integrations: Integrations;
}