import { ObjectId } from "mongodb";

export interface LeaderboardEntry {
  rank: number;
  userId: ObjectId;
  fullName: string;
  avatar: string;
  combinedScore: number; 
  streakScore: number;
  riskFitnessScore: number; 
  badges: string[];
}

export interface LeaderboardData {
  topUsers: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null; 
}
