// web_app/components/dashboard/DashboardClient.tsx
"use client";

import { DashboardData } from '@/models/dashboard';

// --- Import ALL 12 of your feature components ---
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
// EmotionalROIWidget and CalendarWidget were combined into newer versions,
// but we will ensure their features are represented.

import { Brain, Heart, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function DashboardClient({ initialData }: { initialData: DashboardData }) {
  // We can use the overall score for the alert. Let's assume lower is worse/higher risk.
  const isHighRisk = initialData.riskDNA.overallScore < 40;

  return (
    <div className="flex flex-col gap-6">
      
      {/* ======================================================================= */}
      {/*                             HEADER SECTION                            */}
      {/* ======================================================================= */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Welcome back, {initialData.user.fullName}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Your personalized life co-pilot dashboard. This is your Life CFO Mode.
        </p>
      </div>

      {/* ======================================================================= */}
      {/*               FEATURE 3: PERSONALIZED RECOMMENDATION ALERT              */}
      {/* ======================================================================= */}
      {isHighRisk && <PersonalizedRecommendationAlert />}

      {/* ======================================================================= */}
      {/*                  ROW 1: THE VITALS (AT-A-GLANCE SCORES)                 */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        {/* FEATURE 4 & 10: Daily Stress Test trigger & Risk Fitness Score visual */}
        <OverallRiskGauge score={initialData.riskDNA.overallScore} />
      </div>

      {/* ======================================================================= */}
      {/*                ROW 2: CORE ANALYSIS (TRENDS & DNA)                    */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FEATURE 5: Risk Health Meter Chart */}
        <div className="lg:col-span-2">
          <RiskHealthMeterChart data={initialData.riskHistory} />
        </div>
        
        {/* FEATURE 8 & 9: Dynamic Risk DNA & Interdependency Mapping */}
        <div className="lg:col-span-1">
          <DynamicDNAGraph riskDNA={initialData.riskDNA} />
        </div>
      </div>
      
      {/* ======================================================================= */}
      {/*             ROW 3: THE INTELLIGENT LAYER (PLANS & INSIGHTS)             */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FEATURE 7: 3-Month Action Plan */}
        <FinancialPlanWidget plan={initialData.activePlan} />
        
        {/* FEATURE 11 & a part of FEATURE 3: Emotional ROI & Recommendations */}
        <InsightsWidget insights={initialData.insights} />
      </div>

      {/* ======================================================================= */}
      {/*                 ROW 4: THE TRUST & UTILITY LAYER                       */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FEATURE 6: Google Calendar Integration */}
        <div className="lg:col-span-2">
          <FullCalendarWidget events={initialData.googleCalendarEvents} />
        </div>

        {/* This column holds the final two features */}
        <div className="space-y-6">
          {/* FEATURE 1: Agent Accuracy Score */}
          <AgentAccuracyWidget accuracy={initialData.agentAccuracy} />

          {/* FEATURE 2: Explainability (SHAP/LIME) */}
          <Card>
              <CardHeader>
                  <CardTitle>Decision Insights</CardTitle>
                  <CardDescription>The 'why' behind your score.</CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
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