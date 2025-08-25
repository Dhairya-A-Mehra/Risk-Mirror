



import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileClient } from '@/components/profile/ProfileClient';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';
import { verifyJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function ProfilePage() {
  const token = (await cookies()).get('sessionToken')?.value;
  const decodedToken = token ? verifyJwt(token) : null;
  if (!decodedToken) {
    redirect('/login');
  }
  // Fetch full user from DB using userId from JWT
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ _id: new ObjectId(decodedToken.userId) });
  if (!user) {
    redirect('/login');
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
          <ProfileClient initialUser={user as any} />
        </div>
      </main>
    </div>
  );
}

