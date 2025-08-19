// app/(main)/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
  
  // Mock data for demonstration
  const riskScore = 72;
  const assessmentProgress = {
    psychometric: 100,
    financial: 85,
    health: 60,
    lifestyle: 30
  };

  const portfolioData = [
    { name: 'Conservative Bonds', value: 45, risk: 'Low', return: '+3.2%' },
    { name: 'Growth Stocks', value: 30, risk: 'High', return: '+12.8%' },
    { name: 'Real Estate', value: 15, risk: 'Medium', return: '+7.1%' },
    { name: 'Crypto Assets', value: 10, risk: 'Very High', return: '+24.5%' }
  ];

  const recentAlerts = [
    { type: 'warning', message: 'Market volatility increased 15% in your high-risk assets', time: '2 hours ago' },
    { type: 'info', message: 'Complete your Health assessment to unlock personalized insights', time: '1 day ago' },
    { type: 'success', message: 'Your risk-adjusted portfolio gained 8.2% this month', time: '3 days ago' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nuclear fusion energy cores */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(20, 184, 166, 0.2) 40%, transparent 70%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
          }}
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Energy particles orbiting the cores */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`energy-${i}`}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: '10%',
              top: '20%',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
            }}
            animate={{
              x: [0, 300 * Math.cos((i * Math.PI * 2) / 20), 0],
              y: [0, 300 * Math.sin((i * Math.PI * 2) / 20), 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}

        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`energy-teal-${i}`}
            className="absolute w-1.5 h-1.5 bg-teal-400 rounded-full"
            style={{
              right: '15%',
              bottom: '25%',
              boxShadow: '0 0 8px rgba(20, 184, 166, 0.8)',
            }}
            animate={{
              x: [0, 250 * Math.cos((i * Math.PI * 2) / 15), 0],
              y: [0, 250 * Math.sin((i * Math.PI * 2) / 15), 0],
              scale: [0.3, 1.2, 0.3],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Cloud merger animation */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${
              i % 3 === 0 ? 'from-blue-400/20 to-cyan-400/10' :
              i % 3 === 1 ? 'from-teal-400/20 to-blue-400/10' :
              'from-cyan-400/20 to-teal-400/10'
            } blur-2xl`}
            style={{
              width: `${120 + Math.random() * 200}px`,
              height: `${120 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 400 - 200, 0],
              y: [0, Math.random() * 300 - 150, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Additional floating particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'bg-blue-300/60 w-1 h-1' :
              i % 4 === 1 ? 'bg-teal-300/60 w-1.5 h-1.5' :
              i % 4 === 2 ? 'bg-cyan-300/60 w-0.5 h-0.5' :
              'bg-blue-400/60 w-2 h-2'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: i % 3 === 0 ? '0 0 10px rgba(59, 130, 246, 0.6)' : 
                         i % 3 === 1 ? '0 0 10px rgba(20, 184, 166, 0.6)' :
                         '0 0 10px rgba(6, 182, 212, 0.6)',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Energy waves */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/8 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Secondary energy wave */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-teal-400/6 to-transparent"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />

        {/* Pulsing energy field */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-teal-500/5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ripple effects */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-blue-400/20"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
              width: '100px',
              height: '100px',
            }}
            animate={{
              scale: [1, 4, 1],
              opacity: [0.8, 0.2, 0],
              borderWidth: ['2px', '1px', '0px'],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Secondary ripples with teal color */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`ripple-teal-${i}`}
            className="absolute rounded-full border border-teal-400/25"
            style={{
              right: `${15 + (i * 12)}%`,
              bottom: `${20 + (i * 8)}%`,
              width: '80px',
              height: '80px',
            }}
            animate={{
              scale: [1, 3.5, 1],
              opacity: [0.7, 0.1, 0],
              borderWidth: ['2px', '1px', '0px'],
            }}
            transition={{
              duration: 3.5 + i * 0.6,
              repeat: Infinity,
              delay: i * 1.2 + 2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Central ripple effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30"
          style={{
            width: '150px',
            height: '150px',
          }}
          animate={{
            scale: [1, 5, 1],
            opacity: [0.9, 0.1, 0],
            borderWidth: ['3px', '1px', '0px'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 1,
            ease: "easeOut"
          }}
        />

        {/* Animated grid lines */}
        {/* Vertical grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`v-grid-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-full"
            style={{
              left: `${12.5 * (i + 1)}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Horizontal grid lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`h-grid-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent w-full"
            style={{
              top: `${16.67 * (i + 1)}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Random animated grid intersections */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`intersection-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${12.5 * (Math.floor(Math.random() * 8) + 1)}%`,
              top: `${16.67 * (Math.floor(Math.random() * 6) + 1)}%`,
              boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                '0 0 8px rgba(6, 182, 212, 0.8)',
                '0 0 16px rgba(6, 182, 212, 1)',
                '0 0 8px rgba(6, 182, 212, 0.8)',
              ],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Traveling light along grid lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`traveling-light-${i}`}
            className="absolute w-2 h-2 bg-blue-300 rounded-full"
            style={{
              boxShadow: '0 0 12px rgba(147, 197, 253, 1)',
            }}
            animate={{
              x: i % 2 === 0 ? ['0vw', '100vw'] : ['100vw', '0vw'],
              y: `${20 + (i * 20)}vh`,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}

        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`traveling-light-v-${i}`}
            className="absolute w-2 h-2 bg-teal-300 rounded-full"
            style={{
              boxShadow: '0 0 12px rgba(153, 246, 228, 1)',
            }}
            animate={{
              y: i % 2 === 0 ? ['0vh', '100vh'] : ['100vh', '0vh'],
              x: `${25 + (i * 25)}vw`,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <motion.nav 
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-xl relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Risk Mirror Dashboard
        </motion.h1>
        <div className="flex items-center gap-4">
          <motion.div 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome back, <span className="text-blue-300 font-semibold">Alex Chen</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 border border-white/20">
              Settings
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Main Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Overall Risk Score */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl hover:shadow-blue-400/40 transition-all duration-300 relative overflow-hidden h-48">
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-teal-400/20 rounded-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">Risk Score</h3>
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 40px rgba(20, 184, 166, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </motion.div>
                </div>
                <div className="flex items-end gap-2">
                  <motion.span 
                    className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {riskScore}
                  </motion.span>
                  <span className="text-sm text-gray-400 mb-1">/100</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">Moderate Risk Profile</p>
                
                {/* Risk Score Progress Bar */}
                <div className="mt-auto">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-teal-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Value */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-teal-400/30 rounded-2xl shadow-2xl hover:shadow-teal-400/40 transition-all duration-300 relative overflow-hidden h-48">
              {/* Animated corner accents */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-400/30 to-transparent rounded-bl-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">Portfolio Value</h3>
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  $247,583
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.span 
                    className="text-green-400 text-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    ↗ +8.2%
                  </motion.span>
                  <span className="text-gray-400 text-sm">this month</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assessment Progress */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-cyan-400/30 rounded-2xl shadow-2xl hover:shadow-cyan-400/40 transition-all duration-300 relative overflow-hidden h-48">
              {/* Animated pulse effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">Assessment</h3>
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                >
                  69%
                </motion.div>
                <p className="text-sm text-gray-300 mb-3">Complete</p>
                <div className="space-y-2 mt-auto">
                  {Object.entries(assessmentProgress).map(([key, value], index) => (
                    <motion.div 
                      key={key} 
                      className="flex items-center justify-between text-xs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span className={`${value === 100 ? 'text-green-400' : value > 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {value}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Alerts */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-yellow-400/30 rounded-2xl shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 relative overflow-hidden h-48">
              {/* Animated warning stripes */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-orange-400/10 to-yellow-400/5"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">Alerts</h3>
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(251, 191, 36, 0.5)",
                        "0 0 30px rgba(251, 191, 36, 0.8)",
                        "0 0 15px rgba(251, 191, 36, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  3
                </motion.div>
                <p className="text-sm text-gray-300">Active notifications</p>
                <div className="mt-auto">
                  <motion.div 
                    className="w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Breakdown */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                    Portfolio Breakdown
                  </h2>
                  <div className="flex gap-2">
                    {['1D', '7D', '1M', '3M', '1Y'].map((period) => (
                      <motion.button
                        key={period}
                        onClick={() => setSelectedTimeframe(period)}
                        className={`px-3 py-1 rounded-full text-xs transition-all ${
                          selectedTimeframe === period
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {period}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {portfolioData.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/20 hover:bg-gray-600/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          item.risk === 'Low' ? 'bg-green-400' :
                          item.risk === 'Medium' ? 'bg-yellow-400' :
                          item.risk === 'High' ? 'bg-orange-400' : 'bg-red-400'
                        }`} />
                        <div>
                          <h4 className="font-medium text-white">{item.name}</h4>
                          <p className="text-sm text-gray-400">{item.risk} Risk</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{item.value}%</div>
                        <div className={`text-sm ${item.return.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {item.return}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-teal-900/50 rounded-xl border border-blue-400/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h4 className="font-semibold text-blue-300 mb-2">AI Recommendation</h4>
                  <p className="text-sm text-gray-300">
                    Consider rebalancing your portfolio by reducing crypto exposure by 3% and increasing 
                    conservative bonds to optimize your risk-return ratio based on your current risk score.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Alerts & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-teal-400/30 rounded-2xl shadow-2xl h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-6">
                  Recent Activity
                </h2>

                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === 'warning' ? 'bg-yellow-400' :
                          alert.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-200 leading-relaxed">{alert.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                  <div className="space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl py-3 text-sm">
                        Complete Health Assessment
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl py-3 text-sm">
                        Rebalance Portfolio
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl py-3 text-sm">
                        View Full Report
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
