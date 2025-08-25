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

  // Forward cookies to internal API fetches for SSR
  const cookieHeader = cookieStore.getAll().map((c: any) => `${c.name}=${c.value}`).join('; ');

  // Fetch dashboard data with error handling
  let aiPlanData: any = {};
  let insightsData: any = {};
  let scoresData: any = {};
  let fetchError = null;
  try {
    const scoresRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/scores', { cache: 'no-store', headers: { Cookie: cookieHeader } });
    if (!scoresRes.ok) throw new Error('Failed to fetch scores');
    scoresData = await scoresRes.json() || {};
    const aiPlanRes = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/ai-plan`, { cache: 'no-store', headers: { Cookie: cookieHeader } });
    if (!aiPlanRes.ok) throw new Error('Failed to fetch AI plan');
    aiPlanData = await aiPlanRes.json() || {};
    const insightsRes = await fetch(process.env.NEXTAUTH_URL + '/api/dashboard/insights', { cache: 'no-store', headers: { Cookie: cookieHeader } });
    if (!insightsRes.ok) throw new Error('Failed to fetch insights');
    insightsData = await insightsRes.json();
  } catch (err: any) {
    fetchError = err.message || 'Unknown error';
  }

  // Map API responses to widget props, fallback to empty/defaults if error
  const riskDNA = scoresData.riskDNA || {};
  const agentAccuracy = scoresData.agentAccuracy || {};
  let riskHistory = scoresData.riskHistory || [];
  if (Array.isArray(riskHistory) && riskHistory.length > 0 && riskHistory[0].domain) {
    const grouped: Record<string, any[]> = {};
    riskHistory.forEach((entry: any) => {
      if (!grouped[entry.domain]) grouped[entry.domain] = [];
      grouped[entry.domain].push(entry);
    });
    riskHistory = grouped;
  }
  const thresholdUser = scoresData.user || {};
  const googleCalendarEvents = scoresData.googleCalendarEvents || [];
  const latestRiskExplanation = scoresData.latestRiskExplanation || {};
  const explainabilityLogs = scoresData.explainabilityLogs || [];
  const activePlan: Plan | null = (aiPlanData && typeof aiPlanData === 'object' && 'plan' in aiPlanData) ? aiPlanData.plan : null;
  const insights = (insightsData && typeof insightsData === 'object' && 'insights' in insightsData ? insightsData.insights : { recommendations: [], emotionalROI: [] }) as any;
  const navbarUser = thresholdUser;

  if (fetchError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white">
        <div className="max-w-xl mx-auto p-8 bg-black/40 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Dashboard Error</h1>
          <p className="mb-2">Sorry, we couldn't load your dashboard data.</p>
          <pre className="bg-black/60 rounded p-2 text-red-300 text-xs overflow-x-auto">{fetchError}</pre>
          <a href="/" className="mt-4 inline-block px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">Go Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={navbarUser} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start animate-fade-in w-full">
        {/* Top: Welcome and Alerts (horizontal row) */}
        <div className="w-full max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-6 items-stretch">
          {/* Welcome message */}
          <div className="flex-1 flex flex-col justify-center min-w-[260px]">
            <h1 className="text-4xl font-bold mb-1">Welcome{navbarUser?.fullName ? `, ${navbarUser.fullName}` : ''}!</h1>
            <p className="text-lg text-cyan-200">Here is your personalized risk dashboard.</p>
            <a
              href="/survey"
              className="mt-4 inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold shadow hover:bg-teal-600 transition border border-white/10"
            >
              Give Survey Again
            </a>
          </div>
          {/* Alerts side by side */}
          <div className="flex flex-row gap-6 items-stretch flex-[2] min-w-[320px]">
            <div className="flex-1 flex items-stretch"><PersonalizedRecommendationAlert /></div>
            <div className="flex-1 flex items-stretch"><ActionPlanSummary plan={activePlan} /></div>
          </div>
        </div>

        {/* Top section: Overall and Subscores */}
        <div className="w-full max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-stretch">
          {/* Overall Risk Gauge */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-center">
            <OverallRiskGauge score={riskDNA.overallScore} />
          </div>
          {/* Subscores: Health, Lifestyle, Finance */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <RiskScoreCard title="Health" score={riskDNA.healthScore} icon={<span className="text-emerald-400 text-2xl">❤️</span>} color="emerald" />
            <RiskScoreCard title="Lifestyle" score={riskDNA.behavioralScore} icon={<span className="text-cyan-400 text-2xl">🧠</span>} color="cyan" />
            <RiskScoreCard title="Finance" score={riskDNA.financialScore} icon={<span className="text-blue-400 text-2xl">💰</span>} color="blue" />
          </div>
        </div>

        {/* Main widgets: 2 rows, symmetrical grid */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <RiskThresholdWidget user={thresholdUser} />
            {/* Show risk history for each domain if grouped, else as array */}
            {riskHistory && typeof riskHistory === 'object' && !Array.isArray(riskHistory) ? (
              Object.entries(riskHistory).map(([domain, arr]) => {
                const safeArr = Array.isArray(arr) ? arr.filter(e => e && e.snapshotDate && e.riskScores) : [];
                return (
                  <div key={domain}>
                    <h4 className="text-md font-semibold mb-2">{domain.charAt(0).toUpperCase() + domain.slice(1)} Risk History</h4>
                    <RiskHealthMeterChart data={safeArr as any} />
                  </div>
                );
              })
            ) : (
              <RiskHealthMeterChart data={Array.isArray(riskHistory) ? riskHistory.filter(e => e && e.snapshotDate && e.riskScores) : []} />
            )}
            <AgentAccuracyWidget accuracy={agentAccuracy} />
          </div>
          {/* Center column */}
          <div className="flex flex-col gap-6">
            <EmotionalROIWidget insight={insights.emotionalROI?.[0]?.description || ''} />
            <InsightsWidget insights={insights} />
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-6">
            <DynamicDNAGraph riskDNA={riskDNA} />
            {/* Show all explainability logs, most recent first */}
            {explainabilityLogs && explainabilityLogs.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Explainability Logs</h3>
                <ul className="space-y-2">
                  {explainabilityLogs.map((log: any) => (
                    <li key={log._id || log.createdAt} className="bg-white/10 rounded-lg p-4">
                      <div className="font-bold">{log.decisionType}</div>
                      <div className="text-sm text-cyan-200">{new Date(log.createdAt).toLocaleString()}</div>
                      <div className="mt-1">{log.decisionSummary}</div>
                      <div className="mt-2">
                        <span className="font-semibold">Feature Importances:</span>
                        <ul className="ml-4 list-disc">
                          {log.featureImportances && log.featureImportances.map((f: any, idx: number) => (
                            <li key={idx}>{f.feature}: <span className="font-mono">{f.value}</span></li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ExplainabilityModal explanation={latestRiskExplanation} />
            )}
            {/* <DailyStressTestModal /> removed as requested */}
            <FullCalendarWidget events={googleCalendarEvents} />
          </div>
        </div>
      </main>
    </div>
  );
}
