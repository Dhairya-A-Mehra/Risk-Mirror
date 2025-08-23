// web_app/app/onboarding/connect-calendar/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";

export default function ConnectCalendarPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900">
      <Card className="w-full max-w-lg text-center shadow-2xl bg-black/40 border border-blue-900 backdrop-blur-lg rounded-3xl text-white">
        <CardHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-200/30">
            <CheckCircle2 className="h-7 w-7 text-green-400" />
          </div>
          <CardTitle className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Account Created!</CardTitle>
          <CardDescription className="mt-4 text-white/80 text-lg">
            Welcome to <span className="font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Risk Mirror</span>.<br />
            To unlock the full power of your dashboard, connect your calendar for personalized insights and reminders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-white/70">
            By connecting your calendar, Risk Mirror can help you manage your time,<br />
            remind you of financial deadlines, and find opportunities to work on your goals.
          </p>
          {/* This Link is the button that starts the Google OAuth flow */}
          <Link href="/api/auth/google/connect" passHref>
            <Button className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:bg-teal-600 border border-white/10 shadow rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Connect with Google Calendar
            </Button>
          </Link>
          {/* Allow the user to skip if they really want to */}
          <Link href="/signin">
            <Button variant="link" className="text-xs text-white/60 hover:text-cyan-300">
              I'll do this later, take me to sign in
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}