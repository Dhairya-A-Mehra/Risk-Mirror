// web_app/components/health/HealthPageClient.tsx
"use client";

import { HealthPageData } from '@/models/healthPage';
import { useState, useEffect } from 'react';
import { Plan } from '@/models/plan';

import { ScoreCards } from './ScoreCards';
import { HealthInsuranceWidget } from './HealthInsuranceWidget';
import { MedicalExpenseWidget } from './MedicalExpenseWidget';
import { NearbyHospitalsMap } from './NearbyHospitalsMap';
import { FinancialPlanWidget } from '@/components/finance/FinancialPlanWidget';
import { InsightsWidget } from '@/components/dashboard/InsightsWidget';
import { APIProvider } from '@react-google-maps/api'; // Let's use the better library we decided on earlier

export function HealthPageClient({ initialData }: { initialData: HealthPageData }) {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  
  const [healthPlan, setHealthPlan] = useState<Plan | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);

  useEffect(() => {
    const fetchHealthPlan = async () => {
      setIsLoadingPlan(true);
      try {
        const response = await fetch('/api/health/plan');
        if (response.ok) {
          const planData = await response.json();
          setHealthPlan(planData);
        }
      } catch (error) {
        console.error("Failed to fetch health plan:", error);
      } finally {
        setIsLoadingPlan(false);
      }
    };
    
    fetchHealthPlan();
  }, []);

  const dummyHealthPlan = {
    planTitle: "3-Month Wellness Boost",
    category: "health" as "health",
    monthlyGoals: [
        { month: 1 as 1, description: "Improve Sleep Quality", target: "Average 7+ hours of sleep per night", status: "on-track" as "on-track" },
        { month: 2 as 2, description: "Increase Physical Activity", target: "Achieve 7,500 steps daily", status: "at-risk" as "at-risk" },
        { month: 3 as 3, description: "Practice Mindfulness", target: "Use a meditation app 3 times a week", status: "completed" as "completed" },
    ]
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Health & Wellness Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Your center for managing physical, mental, and financial well-being.
        </p>
      </div>

      <ScoreCards 
        wellnessScore={initialData.wellnessScore} 
        wealthScore={initialData.wealthScore} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthInsuranceWidget policies={initialData.insurancePolicies} />
        </div>
        <div>
          <MedicalExpenseWidget 
            forecast={initialData.medicalExpenseForecast}
            explanation={initialData.latestHealthScoreExplanation}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialPlanWidget 
            plan={healthPlan} 
            dummyPlan={dummyHealthPlan}
            isLoading={isLoadingPlan}
            planType="Health"
        />
        <InsightsWidget insights={{ recommendations: initialData.latestHealthInsights, emotionalROI: [] }} />
      </div>

      {/* --- THE FIX for the map --- */}
      {/* We use APIProvider from @vis.gl/react-google-maps, which is a cleaner and more modern library */}
      {/* It acts as the context provider for any map components inside it. */}
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <NearbyHospitalsMap city={initialData.userCity} />
      </APIProvider>
    </div>
  );
}