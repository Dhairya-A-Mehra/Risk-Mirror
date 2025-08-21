// web_app/app/leaderboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LeaderboardClient } from '@/components/leaderboard/LeaderboardClient';
import { LeaderboardData } from '@/models/leaderboard';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';

async function getLeaderboardData(sessionToken: string): Promise<LeaderboardData | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/leaderboard`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store', // Leaderboard data should be fresh
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    return null;
  }
}

async function getUserForNavbar(sessionToken: string): Promise<NavbarUser | null> {
  // ... (You can reuse the function from finance/page.tsx)
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const userData = await res.json();
    return { fullName: userData.fullName };
  } catch (error) { return null; }
}

export default async function LeaderboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  if (!sessionToken) { redirect('/signin'); }

  const [leaderboardData, userDataForNavbar] = await Promise.all([
    getLeaderboardData(sessionToken),
    getUserForNavbar(sessionToken)
  ]);

  if (!leaderboardData) {
    // Handle the case where data couldn't be fetched, maybe show an error page
    return <div>Error loading leaderboard. Please try again later.</div>;
  }

  // Convert ObjectId to string for userId in topUsers and currentUser
  const clientLeaderboardData = {
    ...leaderboardData,
    topUsers: leaderboardData.topUsers.map((entry: any) => ({
      ...entry,
      userId: entry.userId.toString(),
    })),
    currentUser: leaderboardData.currentUser
      ? {
          ...leaderboardData.currentUser,
          userId: leaderboardData.currentUser.userId.toString(),
        }
      : null,
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={userDataForNavbar} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <LeaderboardClient initialData={clientLeaderboardData} />
      </main>
    </div>
  );
}