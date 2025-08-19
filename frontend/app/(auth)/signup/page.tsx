// app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    const formData = new URLSearchParams();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    
    try {
      await signup(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Smooth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-teal-800/30"></div>
      </div>

      {/* Left Side - Illustration/Visual (2/3) */}
      <div className="flex-1 lg:flex-[2] relative flex items-center justify-center p-12 overflow-hidden">
        {/* Nuclear Fusion Animation Background - Bottom Right Intersection */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Central Fusion Core - Bottom Right at Intersection */}
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 transform translate-x-1/3 translate-y-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Core Energy Ball */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/70 via-cyan-300/70 to-teal-400/70 rounded-full blur-md"
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner Core */}
            <motion.div
              className="absolute inset-8 bg-gradient-to-r from-cyan-200/60 to-blue-200/60 rounded-full blur-sm"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Orbiting Particles - Around Bottom Right Intersection Core */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-5 h-5 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full"
              style={{
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 16) * 250,
                  Math.cos((i * Math.PI * 2) / 16) * 350,
                  Math.cos((i * Math.PI * 2) / 16) * 250,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 16) * 250,
                  Math.sin((i * Math.PI * 2) / 16) * 350,
                  Math.sin((i * Math.PI * 2) / 16) * 250,
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

          {/* Energy Rings - Bottom Right Intersection Coverage */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border-2 border-blue-400/20 rounded-full"
              style={{
                width: `${(i + 1) * 400}px`,
                height: `${(i + 1) * 400}px`,
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
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

          {/* Secondary Ripple Waves - Bottom Right Intersection */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute border-2 border-cyan-300/25 rounded-full"
              style={{
                width: `${(i + 1) * 450}px`,
                height: `${(i + 1) * 450}px`,
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
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

          {/* Intense Shockwave Effect - Bottom Right Intersection */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`shockwave-${i}`}
              className="absolute border-4 border-teal-300/30 rounded-full blur-sm"
              style={{
                width: `${(i + 1) * 500}px`,
                height: `${(i + 1) * 500}px`,
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
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

          {/* Fusion Sparks - Bottom Right Intersection Range */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full"
              style={{
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 16) * 600],
                y: [0, Math.sin((i * Math.PI * 2) / 16) * 600],
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

          {/* Energy Pulses - Bottom Right Intersection */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full blur-sm"
              style={{
                right: '0%',
                bottom: '0%',
                transform: 'translate(33%, 50%)',
              }}
              animate={{
                scale: [0, 40, 0],
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

          {/* Additional Ambient Particles */}
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

          {/* Energy Streams */}
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
              Join the future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 font-bold">
                risk management
              </span>
            </p>

            <div className="text-gray-300 text-xl relative z-20">
              Intelligent insights • Predictive analytics • Strategic advantage
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Signup Form (1/3) */}
      <div className="w-full lg:w-1/3 bg-black/20 backdrop-blur-xl border-l border-white/10 flex items-center justify-center p-8 relative">
        {/* Signup Container */}
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
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300"
            >
              Join the future of risk management
            </motion.p>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gray-800/60 backdrop-blur-lg border border-blue-400/20 rounded-2xl shadow-2xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
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
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    transition={{ duration: 0.5, delay: 0.7 }}
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
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Create a strong password"
                        required
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        required
                        className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Terms and Conditions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-xs text-gray-400"
                  >
                    By creating an account, you agree to our{' '}
                    <motion.a
                      href="#"
                      className="text-blue-300 hover:text-blue-200 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Terms of Service
                    </motion.a>{' '}
                    and{' '}
                    <motion.a
                      href="#"
                      className="text-blue-300 hover:text-blue-200 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Privacy Policy
                    </motion.a>
                  </motion.div>

                  {/* Signup Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                          />
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="mt-6 pt-6 border-t border-gray-600/30"
                >
                  <p className="text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <motion.a
                      href="/login"
                      className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign in
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
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400 text-xs">
              Start your journey with intelligent risk management
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
