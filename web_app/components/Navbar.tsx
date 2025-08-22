"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        <Link href="/" className="text-2xl font-bold text-pink-500">
          FinWell
        </Link>

        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="#features" className="hover:text-pink-500">
            Features
          </Link>
          <Link href="#about" className="hover:text-pink-500">
            About
          </Link>
          <Link href="#contact" className="hover:text-pink-500">
            Contact
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-pink-400 text-pink-500 hover:bg-pink-100"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
