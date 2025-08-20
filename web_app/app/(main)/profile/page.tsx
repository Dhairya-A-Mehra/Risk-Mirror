// web_app/app/profile/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileClient } from '@/components/profile/ProfileClient';
import { User } from '@/models/user';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';

async function getUserProfile(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  if (!sessionToken) return null;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
      headers: { Cookie: `sessionToken=${sessionToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    redirect('/signin');
  }
  
  const userDataForNavbar: NavbarUser = { fullName: user.fullName };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar user={userDataForNavbar} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <ProfileClient initialUser={user} />
      </main>
    </div>
  );
}