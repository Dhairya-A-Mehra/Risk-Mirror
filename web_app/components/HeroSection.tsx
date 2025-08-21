"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-pink-300 via-pink-400 to-pink-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold leading-tight">
          Your Personal <span className="text-pink-200">CFO</span>,  
          <br /> Anytime, Anywhere
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto">
          Take control of your finances with AI-powered insights,  
          interactive dashboards, and gamified risk simulations.
        </p>

        
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-2xl shadow-md hover:bg-pink-100"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 border border-white rounded-2xl hover:bg-pink-500"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
