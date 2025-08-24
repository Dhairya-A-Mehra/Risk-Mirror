// web_app/app/(main)/simulation/page.tsx

import React from 'react';
import SimulationCard from '@/components/simulation/SimulationCard';
import SandboxTeaser from '@/components/simulation/SandboxTeaser';
import { TrendingDown, Rocket, Truck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function SimulationPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={null} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start animate-fade-in">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Risk Simulation Center
          </h1>
          <p className="mt-2 text-slate-200 max-w-2xl mx-auto">
            Test your decision-making skills under pressure. These simulations use real-world scenarios to help you understand and improve your risk intelligence.
          </p>
        </div>

        {/* Grid of Simulation Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          <SimulationCard
            icon={<TrendingDown className="w-8 h-8 text-red-400" />}
            category="Finance"
            title="Market Crash Survivor"
            description="A simulated market crash begins, fueled by real-time news headlines. Can you make the right trades to protect your virtual portfolio from catastrophic losses?"
          />
          <SimulationCard
            icon={<Rocket className="w-8 h-8 text-green-400" />}
            category="Investment"
            title="The High-Risk IPO"
            description="A hyped tech company is going public. Weigh social media sentiment against real company news to decide if you should invest your virtual capital in this volatile IPO."
          />
          <SimulationCard
            icon={<Truck className="w-8 h-8 text-yellow-400" />}
            category="Business"
            title="The Supply Chain Crisis"
            description="As a manager, you're hit with a sudden spike in commodity prices and a supplier strike. Make critical decisions to protect your company's finances and market share."
          />
        </div>
        <div className="mt-12 w-full max-w-4xl">
          <SandboxTeaser />
        </div>
      </main>
    </div>
  );
}