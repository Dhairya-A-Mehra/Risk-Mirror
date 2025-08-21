// web_app/components/finance/FinancePageClient.tsx
"use client";

import { FinancePageData } from '@/models/financePage';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- Import ALL necessary widgets, including the new ones ---
import { ScoreCards } from './ScoreCards';
import { BoxBreathing } from './BoxBreathing';
import { SpendingChart } from './SpendingChart';
import { InvestmentPortfolio } from './InvestmentPortfolio';
import { LoanEligibilityWidget } from './LoanEligibilityWidget';
import { RecentTransactions } from './RecentTransactions';
import { FinancialPlanWidget } from './FinancialPlanWidget'; // NEW
import { FinancialInsightsWidget } from './FinancialInsightsWidget'; // NEW

export function FinancePageClient({ initialData }: { initialData: FinancePageData }) {
  const [showBreathing, setShowBreathing] = useState(false);
  
  // This function represents the "Adaptive Panic Mode Trigger"
  const triggerPanicMode = () => setShowBreathing(true);
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {/* Feature 1 & 13: Box Breathing, triggered by panic mode */}
        {showBreathing && <BoxBreathing onClose={() => setShowBreathing(false)} />}
      </AnimatePresence>
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Financial Hub
        </h1>
        <p className="text-lg text-white font-semibold drop-shadow-sm">
          Your command center for wealth and financial wellness.
        </p>
      </div>

      {/* Row 1: Key Metrics - The Vitals */}
      {/* Features 14 & 15: Wellness + Wealth Scores, Financial Calm Index */}
      <ScoreCards
        wealthScore={initialData.wealthScore}
        wellnessScore={initialData.wellnessScore}
        financialCalmIndex={initialData.financialCalmIndex}
        onPanic={triggerPanicMode}
      />

      {/* Row 2: The Core Actionable Plan */}
      {/* Feature 7: 3-Month Financial Plan */}
      <FinancialPlanWidget plan={null} /> {/* Assuming plan data will be added to FinancePageData */}

      {/* Row 3: Investments and Spending Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Features 3, 8, 11: Stock Predictions & Sentiment Analysis */}
        <div className="lg:col-span-3">
          <InvestmentPortfolio portfolio={initialData.investmentPortfolio} />
        </div>
        {/* Feature 2: Axio API data visualization */}
        <div className="lg:col-span-2">
          <SpendingChart data={initialData.spendingByCategory} />
        </div>
      </div>
      
      {/* Row 4: Insights and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Feature 6 & 4: Loan Eligibility & Explainability */}
        <div className="lg:col-span-2">
          <LoanEligibilityWidget 
            eligibility={initialData.loanEligibility}
            explanation={initialData.latestLoanExplanation}
          />
        </div>
        {/* Feature 5: Personalized Risk Recommendations */}
        <div className="lg:col-span-3">
          <FinancialInsightsWidget insights={initialData.latestFinancialInsights} />
        </div>
      </div>

      {/* Row 5: Transaction History */}
      {/* Features 2, 9, 10: Axio Sync, Bank Sync, Fraud Detection */}
      <RecentTransactions transactions={initialData.recentTransactions} />
    </div>
  );
}