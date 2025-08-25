import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '@/lib/jwt';
import { Navbar } from '@/components/layout/Navbar';
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
type Plan = any;

export default async function DashboardPage() {
  // Get JWT from cookies at the top-level (server component context)
  const cookieStore = await cookies();
  const token = cookieStore.get('sessionToken')?.value;
  const decodedToken = token ? verifyJwt(token) : null;
  if (!decodedToken) {
    redirect('/login');
  }

  // Fetch dashboard data
  let aiPlanData: any = {};
  let insightsData: any = {};
  const scoresRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/scores', { cache: 'no-store', credentials: 'include' });
  const scoresData = await scoresRes.json() || {};
  const aiPlanRes = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/ai-plan`, { cache: 'no-store', credentials: 'include' });
  const insightsRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/insights', { cache: 'no-store', credentials: 'include' });
  aiPlanData = await aiPlanRes.json() || {};
  insightsData = await insightsRes.json();

  // Map API responses to widget props
  const riskDNA = scoresData.riskDNA || {};
  const agentAccuracy = scoresData.agentAccuracy || {};
  const riskHistory = scoresData.riskHistory || [];
  const thresholdUser = scoresData.user || {};
  const googleCalendarEvents = scoresData.googleCalendarEvents || [];
  const latestRiskExplanation = scoresData.latestRiskExplanation || {};
  const activePlan: Plan | null = (aiPlanData && typeof aiPlanData === 'object' && 'plan' in aiPlanData) ? aiPlanData.plan : null;
  const insights = (insightsData && typeof insightsData === 'object' && 'insights' in insightsData ? insightsData.insights : { recommendations: [], emotionalROI: [] }) as any;
  const navbarUser = thresholdUser;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={navbarUser} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start animate-fade-in w-full">
        {/* User greeting */}
        <div className="w-full max-w-7xl mx-auto mb-8 flex flex-col items-start">
          <h1 className="text-4xl font-bold mb-1">Welcome{navbarUser?.fullName ? `, ${navbarUser.fullName}` : ''}!</h1>
          <p className="text-lg text-cyan-200">Here is your personalized risk dashboard.</p>
        </div>

        {/* Overall Score Gauge centered */}
        <div className="w-full max-w-3xl mx-auto mb-8 flex flex-col items-center">
          <OverallRiskGauge score={riskDNA.overallScore} />
        </div>

        {/* 2-column grid: Scores and Plan/Insights */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Subscores */}
          <div className="flex flex-col gap-4">
            <RiskScoreCard title="Health" score={riskDNA.healthScore} icon="health" color="emerald" />
            <RiskScoreCard title="Lifestyle" score={riskDNA.behavioralScore} icon="lifestyle" color="cyan" />
            <RiskScoreCard title="Finance" score={riskDNA.financialScore} icon="finance" color="blue" />
            <RiskThresholdWidget user={thresholdUser} />
          </div>
          {/* Plan & Insights */}
          <div className="flex flex-col gap-4">
            <ActionPlanSummary plan={activePlan} />
            <InsightsWidget insights={insights} />
            <EmotionalROIWidget insight={insights.emotionalROI?.[0]?.description || ''} />
            <PersonalizedRecommendationAlert />
          </div>
        </div>

        {/* Full-width section: Charts and Widgets */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 flex flex-col gap-4">
            <RiskHealthMeterChart data={riskHistory} />
            <AgentAccuracyWidget accuracy={agentAccuracy} />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <DynamicDNAGraph riskDNA={riskDNA} />
            <ExplainabilityModal explanation={latestRiskExplanation} />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <DailyStressTestModal />
            <FullCalendarWidget events={googleCalendarEvents} />
          </div>
        </div>
      </main>
    </div>
  );
}
