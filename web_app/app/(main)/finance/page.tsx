
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FinancePageClient } from '@/components/finance/FinancePageClient';
import { FinancePageData } from '@/models/financePage';
import { Navbar, NavbarUser } from '@/components/layout/Navbar'; 

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
  
  if (!sessionToken) {
    redirect('/signin');
  }

  const [financeData, userDataForNavbar] = await Promise.all([
    getFinanceData(sessionToken),
    getUserForNavbar(sessionToken)
  ]);
  
  if (!financeData) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={userDataForNavbar} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <FinancePageClient initialData={financeData} />
      </main>
    </div>
  );
}
