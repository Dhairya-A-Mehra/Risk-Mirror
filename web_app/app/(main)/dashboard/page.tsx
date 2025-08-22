
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { DashboardData } from '@/models/dashboard';
import { Navbar } from '@/components/layout/Navbar';
// ...existing code...

async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;

    if (!sessionToken) {
      return null;
    }

    const apiUrl = `${process.env.NEXTAUTH_URL}/api/dashboard`;

    const response = await fetch(apiUrl, {
      headers: {
        Cookie: `sessionToken=${sessionToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      
      console.log(`Failed to fetch dashboard data, status: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('An error occurred while fetching dashboard data:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  if (!dashboardData) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={dashboardData.user} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <DashboardClient initialData={dashboardData} />
      </main>
    </div>
  );
}
