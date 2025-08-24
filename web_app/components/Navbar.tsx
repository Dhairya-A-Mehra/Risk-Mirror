'use client';

import { User } from '@/models/user';
import Link from 'next/link';

interface NavbarProps {
  user: Pick<User, 'fullName' | 'email' | 'profile' | 'gamification' | 'riskThreshold'>;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="w-full bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Risk Mirror
        </Link>

        <div className="hidden md:flex gap-6 text-gray-300 font-medium">
          <Link href="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:text-blue-400">
            Profile
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <span className="text-gray-300">Welcome, {user.fullName}</span>
          <Link
            href="/api/auth/signout"
            className="px-4 py-2 rounded-xl border border-blue-400 text-blue-400 hover:bg-blue-500/10"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}