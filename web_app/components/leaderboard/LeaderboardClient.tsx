// web_app/components/leaderboard/LeaderboardClient.tsx
"use client";

import { LeaderboardData, LeaderboardEntry } from '@/models/leaderboard';
import { motion } from 'framer-motion';
import { Crown, Flame, ShieldCheck, Award } from 'lucide-react';
import { ObjectId } from 'mongodb'; // We need this type for the props

// --- FIX: The type from the server will have string IDs after serialization ---
// We'll create a new type for what the client component actually receives.
type ClientLeaderboardEntry = Omit<LeaderboardEntry, 'userId'> & {
  userId: string; // The userId is now a string
};
type ClientLeaderboardData = {
  topUsers: ClientLeaderboardEntry[];
  currentUser: ClientLeaderboardEntry | null;
}

export function LeaderboardClient({ initialData }: { initialData: ClientLeaderboardData }) {
  const { topUsers, currentUser } = initialData;

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900';
    if (rank === 2) return 'bg-slate-300 text-slate-800';
    if (rank === 3) return 'bg-yellow-600 text-yellow-100';
    return 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
  };

  const BadgeIcon = ({ badgeName }: { badgeName: string }) => {
    return (
      <Award className="h-4 w-4 text-blue-500">
        <title>{badgeName}</title>
      </Award>
    );
  };

  const UserRow = ({ user, isCurrentUser }: { user: ClientLeaderboardEntry, isCurrentUser?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: user.rank * 0.05 }}
      className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg ${isCurrentUser ? 'bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-500' : 'bg-card'}`}
    >
      <div className="col-span-1 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankColor(user.rank)}`}>
          {user.rank === 1 ? <Crown className="h-5 w-5" /> : user.rank}
        </div>
      </div>
      <div className="col-span-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        <span className="font-medium truncate">{user.fullName}</span>
      </div>
      <div className="col-span-2 text-center font-bold text-lg">{user.combinedScore.toLocaleString()}</div>
      <div className="col-span-2 flex items-center justify-center gap-1 text-sm"><Flame className="h-4 w-4 text-orange-500" /> {user.streakScore}</div>
      <div className="col-span-1 flex items-center justify-center gap-1 text-sm"><ShieldCheck className="h-4 w-4 text-green-500" /> {user.riskFitnessScore.toFixed(0)}</div>
      <div className="col-span-2 flex items-center justify-center gap-2">
        {user.badges.map(badge => <BadgeIcon key={badge} badgeName={badge} />)}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Leaderboard</h1>
        <p className="text-slate-500 dark:text-slate-400">See how you stack up against other users in financial wellness.</p>
      </div>

      <div className="bg-card p-4 rounded-lg shadow">
        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground px-3 pb-2 border-b">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-1 text-center">Risk</div>
          <div className="col-span-2 text-center">Badges</div>
        </div>

        <div className="mt-2 space-y-2">
          {topUsers.map(user => (
            // --- FIX #1: Use direct string comparison ---
            <UserRow key={user.userId} user={user} isCurrentUser={currentUser?.userId === user.userId} />
          ))}
        </div>
      </div>
      
      {currentUser && 
        // --- FIX #2: Use direct string comparison here as well ---
        !topUsers.some(u => u.userId === currentUser.userId) && (
        <div className="sticky bottom-4">
            <UserRow user={currentUser} isCurrentUser={true} />
        </div>
      )}
    </div>
  );
}