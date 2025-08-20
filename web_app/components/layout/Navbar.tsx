// web_app/components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, UserCircle } from "lucide-react";
// Remove the direct dependency on DashboardData
// import { DashboardData } from "@/models/dashboard";

// --- FIX: Create a specific interface for the Navbar's props ---
export interface NavbarUser {
  fullName: string;
}

export function Navbar({ user }: { user: NavbarUser | null }) {
    const { logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex items-center">
                    <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">Risk Mirror</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="/dashboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Dashboard</Link>
                        {/* Add the finance link */}
                        <Link href="/finance" className="text-foreground/60 transition-colors hover:text-foreground/80">Finance</Link>
                        <Link href="/simulation" className="text-foreground/60 transition-colors hover:text-foreground/80">Simulation</Link>
                        <Link href="/leaderboard" className="text-foreground/60 transition-colors hover:text-foreground/80">Leaderboard</Link>
                        <Link href="/chatbot" className="text-foreground/60 transition-colors hover:text-foreground/80">Chatbot</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    {/* Display the user's name if they exist */}
                    {user && <span className="text-sm font-medium">{user.fullName}</span>}
                    <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><UserCircle className="h-5 w-5" /></Button>
                    <Button variant="outline" onClick={logout}>Sign Out</Button>
                </div>
            </div>
        </header>
    );
}