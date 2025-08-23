"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, UserCircle } from "lucide-react";


export interface NavbarUser {
  fullName: string;
}

export function Navbar({ user }: { user: NavbarUser | null }) {
    const { logout } = useAuth();

    return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 shadow-xl backdrop-blur-lg" style={{background: 'rgba(15, 23, 42, 0.6)'}}>
            <div className="max-w-7xl mx-auto flex h-16 items-center px-6 justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Risk Mirror</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-base font-medium">
                        <Link href="/dashboard" className="text-white/80 hover:text-cyan-300 transition-colors">Dashboard</Link>
                        <Link href="/finance" className="text-white/80 hover:text-cyan-300 transition-colors">Finance</Link>
                        <Link href="/simulation" className="text-white/80 hover:text-cyan-300 transition-colors">Simulation</Link>
                        <Link href="/leaderboard" className="text-white/80 hover:text-cyan-300 transition-colors">Leaderboard</Link>
                        <Link href="/chatbot" className="text-white/80 hover:text-cyan-300 transition-colors">Chatbot</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    {user && <span className="text-base font-semibold text-white/90 mr-2">{user.fullName}</span>}
                    <Button variant="ghost" size="icon" className="text-cyan-300 hover:bg-blue-900/30"><Bell className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="text-cyan-300 hover:bg-blue-900/30"><UserCircle className="h-5 w-5" /></Button>
                    <Button
  variant="outline"
  className="border-cyan-400 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold hover:bg-cyan-700/80 hover:text-white transition"
  onClick={logout}
>
  Sign Out
</Button>
                </div>
            </div>
        </header>
    );
}
