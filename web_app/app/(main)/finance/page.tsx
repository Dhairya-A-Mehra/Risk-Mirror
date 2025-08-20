// web_app/app/finance/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FinancePageClient } from '@/components/finance/FinancePageClient';
import { FinancePageData } from '@/models/financePage';
import { Navbar, NavbarUser } from '@/components/layout/Navbar'; // Import NavbarUser type

// Fetch the full finance data for the page content
async function getFinanceData(sessionToken: string): Promise<FinancePageData | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/finance`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch finance data:', error);
    return null;
  }
}

// Fetch just the basic user data for the navbar
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
    console.error('Failed to fetch user for navbar:', error);
    return null;
  }
}

export default async function FinancePage() {
  const sessionCookies = await cookies();
  const sessionToken = sessionCookies.get('sessionToken')?.value;
  
  // If there's no session, redirect immediately
  if (!sessionToken) {
    redirect('/signin');
  }

  // Fetch both sets of data in parallel for performance
  const [financeData, userDataForNavbar] = await Promise.all([
    getFinanceData(sessionToken),
    getUserForNavbar(sessionToken)
  ]);
  
  // If the main data fails to load, the session is likely invalid, so redirect
  if (!financeData) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* The Navbar now receives the correctly typed, real user data */}
      <Navbar user={userDataForNavbar} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <FinancePageClient initialData={financeData} />
      </main>
    </div>
  );
}