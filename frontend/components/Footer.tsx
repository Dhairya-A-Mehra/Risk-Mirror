"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FinWell. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-pink-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-pink-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
