
"use client";

import { DashboardData } from '@/models/dashboard';

import { RiskScoreCard } from './RiskScoreCard';
import { OverallRiskGauge } from './OverallRiskGauge';
import { RiskHealthMeterChart } from './RiskHealthMeterChart';
import { DynamicDNAGraph } from './DynamicDNAGraph';
import { FinancialPlanWidget } from './FinancialPlanWidget';
import { InsightsWidget } from './InsightsWidget';
import { FullCalendarWidget } from './FullCalendarWidget';
import { ExplainabilityModal } from './ExplainabilityModal';
import { AgentAccuracyWidget } from './AgentAccuracyWidget';
import { PersonalizedRecommendationAlert } from './PersonalizedRecommendationAlert';


import { Brain, Heart, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function DashboardClient({ initialData }: { initialData: DashboardData }) {
  const isHighRisk = initialData.riskDNA.overallScore < 40;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="mb-2">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Welcome back, {initialData.user.fullName}!
        </h1>
        <p className="text-lg text-white font-semibold drop-shadow-sm">
          Your personalized life co-pilot dashboard. This is your Life CFO Mode.
        </p>
      </div>

      {isHighRisk && <PersonalizedRecommendationAlert />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-items-stretch">
        <RiskScoreCard
          title="Financial Wellness"
          score={initialData.riskDNA.financialScore}
          icon={<Landmark className="h-6 w-6" />}
          color="text-blue-500"
        />
        <RiskScoreCard
          title="Health & Mind"
          score={initialData.riskDNA.healthScore}
          icon={<Heart className="h-6 w-6" />}
          color="text-red-500"
        />
        <RiskScoreCard
          title="Lifestyle & Habits"
          score={initialData.riskDNA.behavioralScore}
          icon={<Brain className="h-6 w-6" />}
          color="text-green-500"
        />
        <OverallRiskGauge score={initialData.riskDNA.overallScore} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col h-full">
          <RiskHealthMeterChart data={initialData.riskHistory} />
        </div>
        <div className="lg:col-span-1 flex flex-col h-full">
          <DynamicDNAGraph riskDNA={initialData.riskDNA} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="flex flex-col h-full">
          <FinancialPlanWidget plan={initialData.activePlan} />
        </div>
        <div className="flex flex-col h-full">
          <InsightsWidget insights={initialData.insights} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col h-full">
          <FullCalendarWidget events={initialData.googleCalendarEvents} />
        </div>
        <div className="space-y-6 flex flex-col h-full">
          <AgentAccuracyWidget accuracy={initialData.agentAccuracy} />
          <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Decision Insights</CardTitle>
              <CardDescription className="text-gray-300">The 'why' behind your score.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-300">
                Understand the key factors that influenced your latest risk score calculation.
              </p>
              <ExplainabilityModal explanation={initialData.latestRiskExplanation} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
