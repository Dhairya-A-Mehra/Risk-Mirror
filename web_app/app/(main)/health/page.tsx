
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { HealthPageClient } from '@/components/health/HealthPageClient';
import { HealthPageData } from '@/models/healthPage';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';


async function getHealthData(sessionToken: string): Promise<HealthPageData | null> {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/health`, {
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



export default async function HealthPage() {
  
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  if (!sessionToken) {
  redirect('/login');
  }

  const [healthData, userDataForNavbar] = await Promise.all([
    getHealthData(sessionToken),
    getUserForNavbar(sessionToken)
  ]);

  if (!healthData) {
  redirect('/login');
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
