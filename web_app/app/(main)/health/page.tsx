// web_app/app/health/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { HealthPageClient } from '@/components/health/HealthPageClient';
import { HealthPageData } from '@/models/healthPage';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';

// --- Helper Functions remain the same ---

async function getHealthData(sessionToken: string): Promise<HealthPageData | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/health`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store',
    });
    if (!res.ok) {
        console.error(`API call to /api/health failed with status: ${res.status}`);
        return null;
    }
    return res.json();
  } catch (error) { 
    console.error('Network error while fetching health data:', error);
    return null; 
  }
}

async function getUserForNavbar(sessionToken: string): Promise<NavbarUser | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const userData = await res.json();
    return { fullName: userData.fullName };
  } catch (error) { 
    console.error('Network error while fetching user for navbar:', error);
    return null;
  }
}


// --- Main Page Component ---

export default async function HealthPage() {
  // --- THE FIX ---
  // 1. Get the session token synchronously first.
  const sessionToken = cookies().get('sessionToken')?.value;

  // 2. If no token, redirect immediately.
  if (!sessionToken) {
    redirect('/signin');
  }

  // 3. Now that we have the token, we can safely run our async data fetches.
  const [healthData, userDataForNavbar] = await Promise.all([
    getHealthData(sessionToken),
    getUserForNavbar(sessionToken)
  ]);

  // 4. If the main data fetch fails (e.g., invalid token), redirect.
  if (!healthData) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar user={userDataForNavbar} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <HealthPageClient initialData={healthData} />
      </main>
    </div>
  );
}