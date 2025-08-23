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

import { LoadScript } from '@react-google-maps/api';

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
  <div className="fixed inset-0 min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col z-0">
     
  <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Health & Wellness Hub</h1>
          <p className="text-cyan-200/80">Your center for managing physical, mental, and financial well-being.</p>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <ScoreCards wellnessScore={initialData.wellnessScore} wealthScore={initialData.wealthScore} />
        </div>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl items-stretch mx-auto">
          <div className="lg:col-span-2 flex flex-col justify-stretch"><HealthInsuranceWidget policies={initialData.insurancePolicies} /></div>
          <div className="flex flex-col justify-stretch"><MedicalExpenseWidget forecast={initialData.medicalExpenseForecast} explanation={initialData.latestHealthScoreExplanation} /></div>
        </div>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl items-stretch mx-auto">
          <div className="flex flex-col justify-stretch"><FinancialPlanWidget plan={healthPlan} dummyPlan={dummyHealthPlan} isLoading={isLoadingPlan} planType="Health" /></div>
          <div className="flex flex-col justify-stretch"><InsightsWidget insights={{ recommendations: initialData.latestHealthInsights, emotionalROI: [] }} /></div>
        </div>
  <div className="w-full max-w-6xl mx-auto">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <NearbyHospitalsMap city={initialData.userCity} />
          </LoadScript>
        </div>
      </main>
    </div>
  );
}
