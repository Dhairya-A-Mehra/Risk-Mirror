// web_app/app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { DashboardData } from '@/models/dashboard';
import { Navbar } from '@/components/layout/Navbar';
// ...existing code...

// This function fetches data on the server before the page is rendered.
async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;

    // If there's no token, we can immediately say they're not authenticated.
    if (!sessionToken) {
      return null;
    }

    // Ensure we use the full URL for server-side fetch
    const apiUrl = `${process.env.NEXTAUTH_URL}/api/dashboard`;

    const response = await fetch(apiUrl, {
      headers: {
        Cookie: `sessionToken=${sessionToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      // If the API returns an error (like 401 Unauthorized), it's not a server crash,
      // it just means the session is invalid.
      console.log(`Failed to fetch dashboard data, status: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('An error occurred while fetching dashboard data:', error);
    // A catch block here indicates a more serious problem, like the API server being down.
    return null;
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  // --- THE MAIN FIX ---
  // If we don't have data, we redirect.
  // This must be done *before* any attempt to render components that need the data.
  if (!dashboardData) {
    redirect('/login');
  }

  // If we've reached this point, we can be 100% certain that dashboardData is NOT null.
  // The component can now render safely.
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={dashboardData.user} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <DashboardClient initialData={dashboardData} />
      </main>
    </div>
  );
}