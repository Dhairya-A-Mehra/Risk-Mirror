"use client";

import { FinancePageData } from '@/models/financePage';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ScoreCards } from './ScoreCards';
import { BoxBreathing } from './BoxBreathing';
import { SpendingChart } from './SpendingChart';
import { InvestmentPortfolio } from './InvestmentPortfolio';
import { LoanEligibilityWidget } from './LoanEligibilityWidget';
import { RecentTransactions } from './RecentTransactions';
import { FinancialPlanWidget } from './FinancialPlanWidget'; 
import { FinancialInsightsWidget } from './FinancialInsightsWidget'; 

export function FinancePageClient({ initialData }: { initialData: FinancePageData }) {
  const [showBreathing, setShowBreathing] = useState(false);
  
  const triggerPanicMode = () => setShowBreathing(true);
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {showBreathing && <BoxBreathing onClose={() => setShowBreathing(false)} />}
      </AnimatePresence>
      
      <div className="mb-2">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Financial Hub
        </h1>
        <p className="text-lg text-white font-semibold drop-shadow-sm">
          Your command center for wealth and financial wellness.
        </p>
      </div>

      <ScoreCards
        wealthScore={typeof initialData.wealthScore === 'number' ? initialData.wealthScore : 0}
        wellnessScore={typeof initialData.wellnessScore === 'number' ? initialData.wellnessScore : 0}
        financialCalmIndex={typeof initialData.financialCalmIndex === 'number' ? initialData.financialCalmIndex : 0}
        onPanic={triggerPanicMode}
      />

      <FinancialPlanWidget 
        plan={null}
        dummyPlan={{
          planTitle: 'No Plan',
          category: 'finance',
          monthlyGoals: []
        }}
        isLoading={false}
        planType="Finance"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <InvestmentPortfolio portfolio={initialData.investmentPortfolio} />
        </div>
        <div className="lg:col-span-2">
          <SpendingChart data={initialData.spendingByCategory} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <LoanEligibilityWidget 
            eligibility={initialData.loanEligibility}
            explanation={initialData.latestLoanExplanation}
          />
        </div>
        <div className="lg:col-span-3">
          <FinancialInsightsWidget insights={initialData.latestFinancialInsights} />
        </div>
      </div>

      <RecentTransactions transactions={initialData.recentTransactions} />
    </div>
  );
}
