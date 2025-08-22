import React from 'react';
import { motion } from 'framer-motion';

const SurveyProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const percentage = (currentStep / totalSteps) * 100;
  return (
    <div>
      <p className="text-center text-sky-400 text-sm font-semibold mb-2">Step {currentStep} of {totalSteps}</p>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <motion.div
          className="bg-sky-400 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default SurveyProgressBar;