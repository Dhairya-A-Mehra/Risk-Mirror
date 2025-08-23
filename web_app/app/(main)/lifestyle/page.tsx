// web_app/app/(main)/lifestyle/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar, NavbarUser } from '@/components/layout/Navbar';
import { LifestylePageData } from '@/models/lifestylePage';
import { Loader2 } from 'lucide-react';

// Import all the new lifestyle components
import LifestyleScoreCard from '@/components/lifestyle/LifestyleScoreCard';
import ExplainabilityCard from '@/components/lifestyle/ExplainabilityCard';
import RecommendationsCard from '@/components/lifestyle/RecommendationsCard';
import AnomalyAlertsCard from '@/components/lifestyle/AnomalyAlertsCard';
import CalendarCard from '@/components/lifestyle/CalendarCard';
import ActionPlanCard from '@/components/lifestyle/ActionPlanCard';
import RoutineManager from '@/components/lifestyle/RoutineManager';
import RelationshipDashboard from '@/components/lifestyle/RelationshipDashboard';
import BehavioralTrackingCard from '@/components/lifestyle/BehavioralTrackingCard';
import ForecastingCard from '@/components/lifestyle/ForecastingCard';


const LifestylePage = () => {
  const [data, setData] = useState<LifestylePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<NavbarUser | null>(null);

  useEffect(() => {
    // Fetch lifestyle data
    fetch('/api/lifestyle')
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch user info for navbar
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (json && json.fullName) setUser({ fullName: json.fullName });
      });
  }, []);
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900">
        <Navbar user={user} />
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="animate-spin w-10 h-10 text-white" />
          <span className="ml-4 text-white text-lg">Loading lifestyle data...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900">
        <Navbar user={user} />
        <div className="text-center py-10 text-white flex-1">Failed to load lifestyle data.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={user} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">Lifestyle Dashboard</h1>
          <div className="grid grid-cols-12 gap-6">
            {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <RoutineManager routines={data.routines} />
              {data.activeLifestylePlan && <ActionPlanCard plan={data.activeLifestylePlan} />}
              <ForecastingCard forecast={data.lifestyleForecast} />
              <BehavioralTrackingCard insights={data.behavioralInsights} />
            </div>
            {/* --- RIGHT COLUMN (SIDEBAR) --- */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <LifestyleScoreCard score={data.lifestyleScore} />
              <AnomalyAlertsCard anomalies={data.spendingAnomalies} />
              {data.latestLifestyleScoreExplanation && <ExplainabilityCard explanation={data.latestLifestyleScoreExplanation} />}
              <RecommendationsCard recommendations={data.lifestyleRecommendations} />
              <RelationshipDashboard milestones={data.relationshipMilestones} />
              <CalendarCard events={data.googleCalendarEvents} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LifestylePage;