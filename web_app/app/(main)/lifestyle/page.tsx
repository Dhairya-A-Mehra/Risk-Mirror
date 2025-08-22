// web_app/app/(main)/lifestyle/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lifestyle');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: LifestylePageData = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-10">Failed to load lifestyle data.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Lifestyle Dashboard</h1>
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
  );
};

export default LifestylePage;