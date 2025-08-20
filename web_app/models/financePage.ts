// web_app/models/financePage.ts
import { DynamicRiskDNA } from './user';
import { Transaction } from './transaction';
import { FinancialInstrument } from './financialInstrument';
import { Insight } from './insight';
import { ExplainabilityLog } from './explainabilityLog';

export interface LoanEligibility {
  isEligible: boolean;
  maxAmount: number;
  reason: string;
}

export interface FinancePageData {
  wellnessScore: number; // A simplified health score
  wealthScore: number; // The financial score
  financialCalmIndex: number;
  recentTransactions: Transaction[];
  spendingByCategory: { category: string; amount: number }[];
  investmentPortfolio: FinancialInstrument[];
  loanEligibility: LoanEligibility;
  latestFinancialInsights: Insight[];
  latestLoanExplanation: ExplainabilityLog | null;
}