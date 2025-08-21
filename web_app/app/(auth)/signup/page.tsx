// web_app/app/signup/page.tsx
import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
  <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Left 2/3 animated branding section with layered gradients */}
      <div className="hidden md:flex w-2/3 items-center justify-center relative overflow-hidden">
        {/* Static gradient background restored */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-teal-800/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/40 via-transparent to-blue-900/50"></div>
        {/* Visible circle ripples animation */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80 animate-pulse"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-teal-800/30 animate-[pulse_8s_ease-in-out_infinite]"></div>
  <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/40 via-transparent to-blue-900/50 animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-8">
          <h2 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl text-center shadow-cyan-400/40">Risk Mirror</h2>
          <p className="text-lg text-white/80 text-center max-w-xs">Sign up to access powerful financial tools, insights, and a supportive community.</p>
        </div>
      </div>
      {/* Right 1/3 form section */}
      <div className="flex w-full md:w-1/3 h-screen items-center justify-center">
  <div className="w-full h-full p-12 space-y-8 shadow-2xl bg-black/40 border border-neutral-800 backdrop-blur-md flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Join Risk Mirror to start your journey to financial wellness.
            </p>
          </div>
          <SignUpForm />
          <p className="mt-4 text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-cyan-400 hover:text-cyan-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}