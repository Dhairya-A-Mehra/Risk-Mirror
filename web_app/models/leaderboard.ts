// web_app/models/leaderboard.ts
import { ObjectId } from "mongodb";

// This interface defines a single entry on the leaderboard
export interface LeaderboardEntry {
  rank: number;
  userId: ObjectId;
  fullName: string;
  avatar: string;
  combinedScore: number; // The main score for ranking
  streakScore: number;
  riskFitnessScore: number; // The overall risk score
  badges: string[];
}

// This is the full data payload for the leaderboard page
export interface LeaderboardData {
  topUsers: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null; // The logged-in user's rank and score
}