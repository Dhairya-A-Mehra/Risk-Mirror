// web_app/app/(main)/survey/page.tsx
"use client";

import React, { useState } from 'react';
// Removed Navbar import
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SurveySubmission } from '@/models/survey';

// Import step components
import PsychometricStep from '@/components/survey/PsychometricStep';
import FinancialStep from '@/components/survey/FinancialStep';
import HealthStep from '@/components/survey/HealthStep';
import LifestyleStep from '@/components/survey/LifestyleStep';
import GameStep from '@/components/survey/GameStep';
import SurveyProgressBar from '@/components/survey/SurveyProgressBar';
import { Loader2 } from 'lucide-react';

const TOTAL_STEPS = 5;

const SurveyPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  
  // Initialize the state with default values, matching the model
  const [surveyData, setSurveyData] = useState<Omit<SurveySubmission, '_id' | 'userId' | 'submittedAt'>>({
    psychometricAnswers: [],
    financial: { monthlyIncome: 0, monthlyExpenses: 0, totalSavings: 0, totalDebt: 0, hasInvestments: false, investmentTypes: [] },
    health: { exerciseFrequency: 0, dietQuality: 3, sleepHoursPerNight: 7 },
    lifestyle: { workLifeBalance: 3, socialFrequency: 'weekly' },
    simulationResult: { decisionQualityScore: 0, riskAversionScore: 0 },
  });
  
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError('');
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...surveyData, submittedAt: new Date() }),
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      router.push('/dashboard');
    } catch (error) {
      setSubmissionError('Failed to submit survey. Please try again.');
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 flex items-center justify-center">
      <main className="w-full max-w-2xl mx-auto p-4 sm:p-8 lg:p-12">
        <div className="bg-black/60 border border-blue-900 backdrop-blur-lg rounded-3xl shadow-2xl p-16 flex flex-col items-center min-h-[650px] w-full">
          <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">Risk Mirror</span>
          <span className="text-lg text-cyan-300 font-bold mb-8 tracking-wide">Survey</span>
          <div className="w-full max-w-lg mb-10">
            <SurveyProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10 w-full max-w-lg"
            >
              {/* Survey Steps */}
              {currentStep === 1 && <PsychometricStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 2 && <FinancialStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 3 && <HealthStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 4 && <LifestyleStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 5 && <GameStep data={surveyData} setData={setSurveyData} />}
              <div className="flex justify-between mt-12 gap-6">
                <button
                  className="px-8 py-3 rounded-xl bg-slate-800/90 text-white text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 border border-white/10 shadow"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  Back
                </button>
                {currentStep < TOTAL_STEPS ? (
                  <button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold hover:bg-teal-600 transition disabled:opacity-50 border border-white/10 shadow"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-bold hover:bg-sky-700 transition disabled:opacity-50 border border-white/10 shadow"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 inline-block mr-2" /> : null}
                    Submit
                  </button>
                )}
              </div>
              {submissionError && <p className="text-red-400 mt-8 text-center text-base font-semibold">{submissionError}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
export default SurveyPage;
