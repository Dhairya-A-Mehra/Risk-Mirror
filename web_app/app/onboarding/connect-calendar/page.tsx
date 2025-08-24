"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, ArrowRight, Clock, Users, Shield } from 'lucide-react';

export default function ConnectCalendarPage() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const user = await response.json();
          if (user.integrations?.google?.linked) {
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleConnectCalendar = async () => {
    setIsConnecting(true);
    try {
      // Redirect to Google OAuth
      window.location.href = '/api/auth/google/connect';
    } catch (error) {
      console.error('Failed to connect calendar:', error);
      setIsConnecting(false);
    }
  };

  const handleContinue = () => {
    router.push('/survey');
  };

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "Get personalized recommendations for optimal timing of activities based on your risk patterns."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Life Integration",
      description: "Connect your calendar events with your health, financial, and lifestyle goals."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk Awareness",
      description: "Receive alerts about potential conflicts between your schedule and your risk management goals."
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 flex items-center justify-center">
      <main className="w-full max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
        <div className="bg-black/60 border border-blue-900 backdrop-blur-lg rounded-3xl shadow-2xl p-16 flex flex-col items-center min-h-[650px] w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Risk Mirror
            </span>
            <h1 className="text-3xl font-bold text-white mb-4">
              Connect Your Calendar
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Connect your Google Calendar to get personalized insights and recommendations based on your schedule
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="w-full max-w-4xl">
            {!isConnected ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Benefits */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Why Connect Your Calendar?</h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <Card className="bg-gray-800/50 border-gray-600">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="text-cyan-400 mt-1">
                                {benefit.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                  {benefit.title}
                                </h3>
                                <p className="text-gray-300">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Connect Button */}
                <div className="flex flex-col items-center justify-center">
                  <Card className="bg-gray-800/50 border-gray-600 w-full max-w-md">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-cyan-900/30 rounded-full w-16 h-16 flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-cyan-400" />
                      </div>
                      <CardTitle className="text-white text-xl">
                        Connect Google Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-300 text-center">
                        We'll securely connect to your Google Calendar to provide personalized insights and recommendations.
                      </p>

                      <Button
                        onClick={handleConnectCalendar}
                        disabled={isConnecting}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 text-lg font-semibold"
                      >
                        {isConnecting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5" />
                            <span>Connect Calendar</span>
                          </div>
                        )}
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        Your data is encrypted and secure. We only access calendar events to provide personalized insights.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 p-4 bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Calendar Connected Successfully!
                </h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Your Google Calendar is now connected. We'll use this information to provide personalized insights and recommendations.
                </p>
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white py-3 px-8 text-lg font-semibold"
                >
                  <span>Continue to Survey</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Skip Option */}
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-400 mb-4">
                You can skip this step and connect your calendar later
              </p>
              <Button
                onClick={handleContinue}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Skip for Now
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}