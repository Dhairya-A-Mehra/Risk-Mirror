"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  const [username, setUsername] = useState(''); // FastAPI OAuth2 expects 'username'
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    try {
      await login(formData);
    } finally {
      setIsLoading(false);
    }
  }, [username, password, login]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex relative overflow-hidden">
      {/* Optimized Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduced overlays for performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80"></div>
      </div>

      {/* Left Side - Illustration/Visual (2/3) */}
      <div className="flex-1 lg:flex-[2] relative flex items-center justify-center p-12 overflow-hidden">
        {/* Nuclear Fusion Animation Background - Full Page Coverage */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Central Fusion Core - Top Left Corner (Partially Clipped) */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Core Energy Ball */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 rounded-full blur-lg"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner Core */}
            <motion.div
              className="absolute inset-8 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-md"
              animate={{
                scale: [1, 0.7, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Orbiting Particles - Around Top Left Core (Adjusted Position) */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-5 h-5 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full"
              style={{
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 16) * 200,
                  Math.cos((i * Math.PI * 2) / 16) * 300,
                  Math.cos((i * Math.PI * 2) / 16) * 200,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 16) * 200,
                  Math.sin((i * Math.PI * 2) / 16) * 300,
                  Math.sin((i * Math.PI * 2) / 16) * 200,
                ],
                scale: [0.4, 1.2, 0.4],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}

          {/* Energy Rings - Reduced Coverage */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border-2 border-blue-400/20 rounded-full"
              style={{
                width: `${(i + 1) * 300}px`,
                height: `${(i + 1) * 300}px`,
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0, 0.5, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            />
          ))}

          {/* Secondary Ripple Waves - Reduced */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute border-2 border-cyan-300/25 rounded-full"
              style={{
                width: `${(i + 1) * 350}px`,
                height: `${(i + 1) * 350}px`,
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0.2, 2.0, 0.2],
                opacity: [0, 0.4, 0],
                rotate: [360, 0],
              }}
              transition={{
                duration: 15 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.0,
              }}
            />
          ))}

          {/* Intense Shockwave Effect - Reduced */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`shockwave-${i}`}
              className="absolute border-4 border-teal-300/30 rounded-full blur-sm"
              style={{
                width: `${(i + 1) * 400}px`,
                height: `${(i + 1) * 400}px`,
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0, 3.0, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 2,
              }}
            />
          ))}

          {/* Fusion Sparks - Reduced Range */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full"
              style={{
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 16) * 500],
                y: [0, Math.sin((i * Math.PI * 2) / 16) * 500],
                scale: [1, 0],
                opacity: [1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.1,
                repeatDelay: 3,
              }}
            />
          ))}

          {/* Energy Pulses - Reduced */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full blur-sm"
              style={{
                left: '10%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0, 30, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 4,
              }}
            />
          ))}

          {/* Additional Ambient Particles - Reduced */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`ambient-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/25 to-teal-400/25 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 0.6, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          ))}

          {/* Energy Streams - Reduced */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-1 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full"
              style={{
                height: `${150 + Math.random() * 200}px`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-2xl text-center">

          {/* Animated Background Orbs for Illustration */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-teal-400/20 rounded-full blur-2xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-20"
          >
            <h1 className="text-6xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              RISK
              <br />
              MIRROR
            </h1>
            
            <p className="text-2xl lg:text-3xl text-gray-200 mb-12 leading-relaxed font-light">
              Transform uncertainty into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 font-bold">
                strategic advantage
              </span>
            </p>

            <div className="text-gray-300 text-xl relative z-20">
              AI-powered insights • Real-time monitoring • Predictive analytics
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form (1/3) */}
      <div className="w-full lg:w-1/3 bg-black/20 backdrop-blur-xl border-l border-white/10 flex items-center justify-center p-8 relative">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300"
            >
              Sign in to your account
            </motion.p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gray-800/60 backdrop-blur-lg border border-blue-400/20 rounded-2xl shadow-2xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Forgot Password Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-right"
                  >
                    <motion.a
                      href="#"
                      className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Forgot password?
                    </motion.a>
                  </motion.div>

                  {/* Login Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                          />
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="mt-6 pt-6 border-t border-gray-600/30"
                >
                  <p className="text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <motion.a
                      href="/signup"
                      className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign up
                    </motion.a>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400 text-xs">
              Secure access to your dashboard
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}