
"use client";

import { useState } from "react";
import { useMemo, useCallback } from "react";
import { motion } from 'framer-motion';

const questions = [
  "What is your primary financial goal? (Saving for retirement, Building emergency fund, Investing for growth, Debt reduction, Home purchase)",
  "How would you describe your current risk tolerance when investing? (Very Conservative, Conservative, Moderate, Aggressive, Very Aggressive)",
  "What is your current age range? (18-25, 26-35, 36-45, 46-55, 56-65, 65+)",
  "What is your approximate annual household income? (<$30k, $30k-$50k, $50k-$75k, $75k-$100k, $100k-$150k, $150k+)",
  "How much of your income can you currently save each month? (0-5%, 6-10%, 11-15%, 16-20%, 20%+)",
  "Do you currently have any existing investments? (No investments, Savings account only, Stocks/bonds, Real estate, Retirement accounts, Multiple types)",
  "How familiar are you with different investment options? (Beginner, Some knowledge, Intermediate, Advanced, Expert)",
  "What is your investment time horizon for your primary goal? (Less than 1 year, 1-3 years, 3-5 years, 5-10 years, 10+ years)",
  "How important is having immediate access to your money? (Very important, Somewhat important, Neutral, Not very important, Not important at all)",
  "Do you currently track your monthly budget and expenses? (Never, Rarely, Sometimes, Often, Always)",
  "What would you do if your investments lost 20% of their value in a month? (Sell immediately, Sell some, Hold steady, Buy more, Significantly increase investment)",
  "How often do you review and adjust your financial strategy? (Never, Annually, Quarterly, Monthly, Weekly)"
];

export default function SurveyPage() {
  const memoQuestions = useMemo(() => questions, []);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const currentSurvey = 1; 
  const totalSurveys = 4;
  const progressPercentage = (currentSurvey / totalSurveys) * 100;
  
  const getAnsweredQuestions = () => {
  return answers.filter(answer => answer.trim() !== "").length;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white relative overflow-hidden py-6 px-4">
     
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mb-8 relative z-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent mb-2">
            Survey Progress
          </h2>
          <p className="text-gray-300 text-sm">
            Survey {currentSurvey} of {totalSurveys} • {getAnsweredQuestions()} of {memoQuestions.length} questions completed
          </p>
        </div>
        
      
        <div className="relative">
          <div className="w-full h-3 bg-gray-700/50 rounded-full backdrop-blur-sm border border-gray-600/30">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
         
          <div className="flex justify-between mt-3">
            {Array(totalSurveys).fill(null).map((_, i) => (
              <motion.div
                key={i}
                className={`flex flex-col items-center ${i + 1 <= currentSurvey ? 'text-blue-300' : 'text-gray-500'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  i + 1 <= currentSurvey 
                    ? 'bg-gradient-to-r from-blue-400 to-teal-400 border-blue-400 text-white shadow-lg' 
                    : 'bg-gray-700/50 border-gray-600 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                <span className="text-xs mt-1 font-medium">
                  {i === 0 ? 'Psychometric' : i === 1 ? 'Financial' : i === 2 ? 'Health' : 'Lifestyle'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
     
      <div className="absolute inset-0 overflow-hidden">
      
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 via-cyan-300/15 to-teal-400/20 blur-xl"
            style={{
              width: `${150 + Math.random() * 200}px`,
              height: `${80 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 50 - 25],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={`droplet-${i}`}
            className="absolute w-1 bg-gradient-to-b from-cyan-300/80 to-blue-400/60 rounded-full"
            style={{
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 0.8, 0],
              scaleY: [0.5, 1, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeIn",
              delay: Math.random() * 8,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}

        
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-300/40 to-teal-300/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              y: [0, Math.random() * 200 + 100],
              x: [0, Math.random() * 100 - 50],
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 10,
            }}
          />
        ))}


        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`splash-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-200/60 to-blue-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0%',
            }}
            animate={{
              y: [0, -100 - Math.random() * 150],
              x: [0, Math.random() * 60 - 30],
              scale: [1, 0.3, 0],
              opacity: [0.8, 0.4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 6,
              repeatDelay: Math.random() * 4,
            }}
          />
        ))}

        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-cyan-900/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/20 rounded-2xl shadow-2xl p-10 w-full max-w-7xl relative z-10 mx-auto"
        style={{ width: "85%" }} 
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent text-center"
        >
          Psychometric Risk Assessment
        </motion.h1>
        
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              className="flex flex-col h-full"
            >
              <motion.div
                className="mb-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/20 backdrop-blur-sm h-full flex flex-col"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(55, 65, 81, 0.4)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.p
                  className="mb-4 text-gray-200 font-medium text-sm leading-relaxed flex-grow"
                  whileHover={{ color: "#93c5fd" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold rounded-full mr-3">
                    {i + 1}
                  </span>
                  {q}
                </motion.p>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[i] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="w-full border border-gray-600/40 bg-gray-800/60 p-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60 transition-all duration-300 backdrop-blur-sm shadow-inner"
                    placeholder="Enter your answer..."
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      borderColor: "rgba(59, 130, 246, 0.6)"
                    }}
                  />
                  {answers[i] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="relative group mt-10"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition duration-300"></div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-xl py-5 font-semibold shadow-lg transition-all duration-300 text-lg flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Complete Psychometric Assessment ({getAnsweredQuestions()}/{questions.length})
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}
