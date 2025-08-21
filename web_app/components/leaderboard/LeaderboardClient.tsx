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
  if (rank === 1) return 'bg-yellow-400 text-gray-900 font-extrabold';
  if (rank === 2) return 'bg-blue-900 text-blue-200 font-extrabold';
  if (rank === 3) return 'bg-teal-900 text-white';
    return 'bg-gray-900 text-blue-400 font-extrabold';
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
        <div className="w-10 h-10 bg-gray-900 border border-blue-400/30 rounded-full flex items-center justify-center">
          <span className="text-blue-900 font-bold text-base">{user.fullName.charAt(0)}</span>
        </div>
        <span className="font-medium truncate text-[#232e52]">{user.fullName}</span>
      </div>
      <div className="col-span-2 text-center font-bold text-lg text-[#232e52]">{user.combinedScore.toLocaleString()}</div>
  <div className="col-span-2 flex items-center justify-center gap-1 text-sm text-blue-900"><Flame className="h-4 w-4 text-orange-500" /> {user.streakScore}</div>
  <div className="col-span-1 flex items-center justify-center gap-1 text-sm text-blue-900"><ShieldCheck className="h-4 w-4 text-green-500" /> {user.riskFitnessScore.toFixed(0)}</div>
      <div className="col-span-2 flex items-center justify-center gap-2">
        {user.badges.map(badge => <BadgeIcon key={badge} badgeName={badge} />)}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-2">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">Leaderboard</h1>
        <p className="text-lg text-white font-semibold drop-shadow-sm">See how you stack up against other users in financial wellness.</p>
      </div>

      <div className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl p-4">
        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-cyan-300 px-3 pb-2 border-b border-blue-400/30">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4">User</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-1 text-center">Risk</div>
          <div className="col-span-2 text-center">Badges</div>
        </div>

        <div className="mt-2 space-y-2">
          {topUsers.map(user => (
            <UserRow key={user.userId} user={user} isCurrentUser={currentUser?.userId === user.userId} />
          ))}
        </div>
      </div>
      
      {currentUser && 
        !topUsers.some(u => u.userId === currentUser.userId) && (
        <div className="sticky bottom-4">
            <UserRow user={currentUser} isCurrentUser={true} />
        </div>
      )}
    </div>
  );
}