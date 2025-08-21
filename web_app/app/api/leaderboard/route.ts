

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { User } from '@/models/user';
import { LeaderboardData, LeaderboardEntry } from '@/models/leaderboard';

export async function GET(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const currentUserId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>('users');

    const topUsersCursor = usersCollection.find({}, {
      projection: {
        fullName: 1,
        'profile.avatar': 1,
        'gamification.leaderboardScore': 1,
        'gamification.streak.current': 1,
        'gamification.badges': 1,
        'dynamicRiskDNA.overallScore': 1,
      }
    }).sort({ 'gamification.leaderboardScore': -1 }).limit(100);

    const topUsers = await topUsersCursor.toArray();

    const currentUserRank = await usersCollection.countDocuments({
      'gamification.leaderboardScore': { $gt: topUsers.find(u => u._id.equals(currentUserId))?.gamification.leaderboardScore ?? -1 }
    }) + 1;

    let currentUserData: LeaderboardEntry | null = null;
    
    const formattedTopUsers: LeaderboardEntry[] = topUsers.map((user, index) => {
      const entry: LeaderboardEntry = {
        rank: index + 1,
        userId: user._id!,
        fullName: user.fullName,
        avatar: user.profile.avatar,
        combinedScore: user.gamification.leaderboardScore,
        streakScore: user.gamification.streak.current,
        riskFitnessScore: user.dynamicRiskDNA.overallScore,
        badges: user.gamification.badges.slice(0, 3), 
      };

      if (user._id.equals(currentUserId)) {
        
        currentUserData = { ...entry, rank: currentUserRank };
      }
      return entry;
    });

    if (!currentUserData) {
        const user = await usersCollection.findOne({ _id: currentUserId });
        if (user) {
            currentUserData = {
                rank: currentUserRank,
                userId: user._id!,
                fullName: user.fullName,
                avatar: user.profile.avatar,
                combinedScore: user.gamification.leaderboardScore,
                streakScore: user.gamification.streak.current,
                riskFitnessScore: user.dynamicRiskDNA.overallScore,
                badges: user.gamification.badges.slice(0, 3),
            };
        }
    }

    const leaderboardData: LeaderboardData = {
      topUsers: formattedTopUsers,
      currentUser: currentUserData
    };

    return NextResponse.json(leaderboardData, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
