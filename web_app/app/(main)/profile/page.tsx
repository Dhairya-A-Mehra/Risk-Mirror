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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Elements to match landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-teal-800/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/40 via-transparent to-blue-900/50"></div>
      </div>
      <Navbar user={userDataForNavbar} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-center">
  <div className="w-full max-w-4xl rounded-2xl shadow-2xl bg-black/40 border border-neutral-800 p-6 backdrop-blur-md">
          <ProfileClient initialUser={user} />
        </div>
      </main>
    </div>
  );
}