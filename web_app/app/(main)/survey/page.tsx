// web_app/app/(main)/survey/page.tsx
"use client";

import React, { useState } from 'react';
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
        body: JSON.stringify({ ...surveyData, submittedAt: new Date() }), // In a real app, userId would be added here
      });
      
      if (!response.ok) throw new Error('Network response was not ok.');
      
      // Redirect to the dashboard on successful submission
      router.push('/dashboard');
      
    } catch (error) {
      console.error("Submission failed", error);
      setSubmissionError('Failed to submit survey. Please try again.');
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <SurveyProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <div className="bg-slate-800/50 p-8 rounded-2xl shadow-2xl border border-slate-700/50 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 1 && <PsychometricStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 2 && <FinancialStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 3 && <HealthStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 4 && <LifestyleStep data={surveyData} setData={setSurveyData} />}
              {currentStep === 5 && <GameStep data={surveyData} setData={setSurveyData} />}
            </motion.div>
          </AnimatePresence>

          {submissionError && <p className="text-red-400 text-sm mt-4 text-center">{submissionError}</p>}
          
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1 || isSubmitting}
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {currentStep < TOTAL_STEPS ? (
              <button 
                onClick={handleNext}
                className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-600 disabled:opacity-50 flex items-center"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit & See Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;