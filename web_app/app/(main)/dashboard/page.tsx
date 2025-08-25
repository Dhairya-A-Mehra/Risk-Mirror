import { redirect } from 'next/navigation';
import { DashboardData } from '@/models/dashboard';
import { User } from '@/models/user';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';
import { OverallRiskGauge } from '@/components/dashboard/OverallRiskGauge';
import { RiskScoreCard } from '@/components/dashboard/RiskScoreCard';
import { ActionPlanSummary } from '@/components/dashboard/ActionPlanSummary';
import { InsightsWidget } from '@/components/dashboard/InsightsWidget';
import { EmotionalROIWidget } from '@/components/dashboard/EmotionalROIWidget';
import { PersonalizedRecommendationAlert } from '@/components/dashboard/PersonalizedRecommendationAlert';
import { RiskHealthMeterChart } from '@/components/dashboard/RiskHealthMeterChart';
import { AgentAccuracyWidget } from '@/components/dashboard/AgentAccuracyWidget';
import DynamicDNAGraph from '@/components/dashboard/DynamicDNAGraph';
import { ExplainabilityModal } from '@/components/dashboard/ExplainabilityModal';
import { RiskThresholdWidget } from '@/components/dashboard/RiskThresholdWidget';
import { DailyStressTestModal } from '@/components/dashboard/DailyStressTestModal';
import { FullCalendarWidget } from '@/components/dashboard/FullCalendarWidget';
import DashboardClient from '@/components/dashboard/DashboardClient';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface NavbarProps {
  user: Pick<User, 'fullName' | 'email' | 'profile' | 'gamification' | 'riskThreshold'>;
}

export default async function DashboardPage() {
  // Fetch all dashboard data from API routes
  const scoresRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/scores', { cache: 'no-store', credentials: 'include' });
  const scoresData = await scoresRes.json();
  const isAuthenticated = !scoresData.message;

  let aiPlanData = {};
  let insightsData = {};
  if (isAuthenticated) {
    const aiPlanRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/ai-plan', { cache: 'no-store', credentials: 'include' });
    aiPlanData = await aiPlanRes.json();
    const insightsRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/insights', { cache: 'no-store', credentials: 'include' });
    insightsData = await insightsRes.json();
  }

  // Map API responses to widget props
  const riskDNA = scoresData.riskDNA || {};
  const agentAccuracy = scoresData.agentAccuracy || {};
  const riskHistory = scoresData.riskHistory || [];
  const thresholdUser = scoresData.user || {};
  const googleCalendarEvents = scoresData.googleCalendarEvents || [];
  const latestRiskExplanation = scoresData.latestRiskExplanation || null;

  const activePlan = (aiPlanData && typeof aiPlanData === 'object' && 'plan' in aiPlanData ? aiPlanData.plan : null) as any;
  const insights = (insightsData && typeof insightsData === 'object' && 'insights' in insightsData ? insightsData.insights : { recommendations: [], emotionalROI: [] }) as any;
  const navbarUser = thresholdUser;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={navbarUser} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start animate-fade-in">
        {isAuthenticated ? (
          <>
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Overall Score & Subscores */}
              <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">Risk Dashboard</h1>
                <OverallRiskGauge score={riskDNA.overallScore} />
                <RiskScoreCard title="Health" score={riskDNA.healthScore} icon="health" color="emerald" />
                <RiskScoreCard title="Lifestyle" score={riskDNA.behavioralScore} icon="lifestyle" color="cyan" />
                <RiskScoreCard title="Finance" score={riskDNA.financialScore} icon="finance" color="blue" />
              </div>

              {/* 3-Month AI Plan & Insights */}
              <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
                <ActionPlanSummary plan={activePlan} />
                <InsightsWidget insights={insights} />
                <EmotionalROIWidget insight={insights.emotionalROI?.[0]?.description || ''} />
                <PersonalizedRecommendationAlert />
              </div>

              {/* Risk Health Meter, Agent Accuracy, Dynamic DNA Graph */}
              <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
                <RiskHealthMeterChart data={riskHistory} />
                <AgentAccuracyWidget accuracy={agentAccuracy} />
                <DynamicDNAGraph riskDNA={riskDNA} />
                <ExplainabilityModal explanation={latestRiskExplanation} />
              </div>
            </div>

            {/* Threshold, Daily Pulse Check, Calendar */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <RiskThresholdWidget user={thresholdUser} />
              <DailyStressTestModal />
              <FullCalendarWidget events={googleCalendarEvents} />
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-24">
            <h1 className="text-3xl font-bold mb-6 text-white">Please log in to view your dashboard scores.</h1>
            <p className="text-lg text-gray-300 mb-8">You must be authenticated to view your personalized risk scores and insights.</p>
            <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition">Go to Login</a>
          </div>
        )}
      </main>
    </div>
  );
}