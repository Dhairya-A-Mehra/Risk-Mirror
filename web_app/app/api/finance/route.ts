

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { User } from '@/models/user';
import { Transaction } from '@/models/transaction';
import { FinancialInstrument } from '@/models/financialInstrument';
import { Insight } from '@/models/insight';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { FinancePageData } from '@/models/financePage';

export async function GET(request: NextRequest) {
  const decodedToken = await verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();

    const userPromise = db.collection<User>('users').findOne({ _id: userId });
    const transactionsPromise = db.collection<Transaction>('transactions').find({ userId }).sort({ transactionDate: -1 }).limit(100).toArray();
    const portfolioPromise = db.collection<FinancialInstrument>('financial_instruments').find({ userId }).toArray();
    const insightsPromise = db.collection<Insight>('insights').find({ userId, type: 'recommendation', isArchived: false }).sort({ createdAt: -1 }).limit(3).toArray();
    const loanExplanationPromise = db.collection<ExplainabilityLog>('explainability_logs').findOne({ userId, decisionType: 'Loan Recommendation' }, { sort: { createdAt: -1 } });

    const [user, transactions, portfolio, insights, loanExplanation] = await Promise.all([
      userPromise, transactionsPromise, portfolioPromise, insightsPromise, loanExplanationPromise
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    
    const spendingByCategory = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    const loanEligibility = {
        isEligible: user.dynamicRiskDNA.financialScore > 70,
        maxAmount: 500000,
        reason: user.dynamicRiskDNA.financialScore > 70 ? "Strong credit profile and financial score." : "Financial score is below the threshold. Focus on reducing debt."
    };

    const financePageData: FinancePageData = {
      wellnessScore: user.dynamicRiskDNA.healthScore,
      wealthScore: user.dynamicRiskDNA.financialScore,
      financialCalmIndex: user.dynamicRiskDNA.financialCalmIndex || 60,
      recentTransactions: transactions.slice(0, 10), // only first 10 for display
      spendingByCategory: Object.entries(spendingByCategory).map(([category, amount]) => ({ category, amount })),
      investmentPortfolio: portfolio,
      loanEligibility,
      latestFinancialInsights: insights,
      latestLoanExplanation: loanExplanation
    };

    return NextResponse.json(financePageData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch finance page data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
