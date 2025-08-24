import { redirect } from 'next/navigation';
import { DashboardData } from '@/models/dashboard';
import { User } from '@/models/user';
import Navbar from '@/components/Navbar';
import DashboardClient from '@/components/dashboard/DashboardClient';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface NavbarProps {
  user: Pick<User, 'fullName' | 'email' | 'profile' | 'gamification' | 'riskThreshold'>;
}

export default async function DashboardPage() {
  const decodedToken = await verifyAuth();

  if (!decodedToken) {
    redirect('/login');
  }

  const { db } = await connectToDatabase();
  const user = await db.collection<User>('users').findOne(
    { _id: new ObjectId(decodedToken.userId) },
    { projection: { fullName: 1, email: 1, profile: 1, gamification: 1, riskThreshold: 1 } }
  );

  if (!user) {
    redirect('/login');
  }

  const navbarUser: Pick<User, 'fullName' | 'email' | 'profile' | 'gamification' | 'riskThreshold'> = {
    fullName: user.fullName,
    email: user.email,
    profile: user.profile,
    gamification: user.gamification,
    riskThreshold: user.riskThreshold,
  };

  const token = (await cookies()).get('sessionToken')?.value;
  if (!token) {
    console.log('No session token found for API request');
    redirect('/login');
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Failed to fetch dashboard data:', response.statusText);
    return <div>Error loading dashboard. Please try again later.</div>;
  }

  const dashboardData: DashboardData = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={navbarUser} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <DashboardClient initialData={dashboardData} />
      </main>
    </div>
  );
}