// web_app/app/onboarding/connect-calendar/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Calendar } from "lucide-react";
import Link from "next/link";

export default function ConnectCalendarPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Account Created!</CardTitle>
          <CardDescription className="mt-2 text-slate-500">
            Welcome to Risk Mirror. To unlock the full power of your dashboard,
            let's connect your calendar for personalized insights and reminders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            By connecting your calendar, Risk Mirror can help you manage your time,
            remind you of financial deadlines, and find opportunities to work on your goals.
          </p>
          
          {/* This Link is the button that starts the Google OAuth flow */}
          <Link href="/api/auth/google/connect" passHref>
            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Connect with Google Calendar
            </Button>
          </Link>
          
          {/* Allow the user to skip if they really want to */}
          <Link href="/signin">
            <Button variant="link" className="text-xs text-slate-500">
              I'll do this later, take me to sign in
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}