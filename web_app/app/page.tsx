"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Smooth gradient overlay for better blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-teal-800/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/40 via-transparent to-blue-900/50"></div>
        
        {/* Cloudburst Animation Layer */}
        {/* Animated Storm Clouds */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`storm-cloud-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/15 via-cyan-300/10 to-teal-400/15 blur-2xl"
            style={{
              width: `${200 + Math.random() * 300}px`,
              height: `${100 + Math.random() * 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 75 - 35],
              scale: [0.6, 1.4, 0.6],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}

        {/* Rain Droplets - Intense Cloudburst */}
        {Array.from({ length: 120 }).map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-0.5 bg-gradient-to-b from-cyan-300/70 to-blue-400/50 rounded-full"
            style={{
              height: `${15 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 30}%`,
            }}
              animate={{
                y: [0, typeof window !== 'undefined' ? window.innerHeight + 150 : 1000],
                opacity: [0, 1, 0.7, 0],
                scaleY: [0.3, 1, 1, 0.3],
              }}
            transition={{
              duration: 1.5 + Math.random() * 2.5,
              repeat: Infinity,
              ease: "easeIn",
              delay: Math.random() * 6,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}

        {/* Storm Energy Particles */}
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={`storm-particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-300/60 to-teal-300/60 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
            animate={{
              y: [0, Math.random() * 300 + 150],
              x: [0, Math.random() * 120 - 60],
              scale: [0, 2, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 12,
            }}
          />
        ))}

        {/* Thunder Ripples */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`thunder-ripple-${i}`}
            className="absolute border-2 border-cyan-400/25 rounded-full"
            style={{
              width: `${(i + 1) * 250}px`,
              height: `${(i + 1) * 250}px`,
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 20}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [0, 2.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5 + Math.random() * 5,
            }}
          />
        ))}

        {/* Water Splash Effects - Ground Impact */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`splash-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-200/70 to-blue-300/70 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0%',
            }}
            animate={{
              y: [0, -80 - Math.random() * 120],
              x: [0, Math.random() * 50 - 25],
              scale: [1.5, 0.2, 0],
              opacity: [0.9, 0.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 8,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}

        {/* Atmospheric Mist Layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-cyan-900/20"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-800/10 to-transparent"
          animate={{
            x: [-200, 200, -200],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Original floating orbs - keeping for layered effect */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      {/* Navbar */}
      <motion.nav 
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 text-white px-6 py-4 flex justify-between items-center shadow-xl relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Risk Mirror
        </motion.h1>
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 border border-white/20">
              Login
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 border border-white/20">
              Sign Up
            </Button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6 relative z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />
        <motion.h2
          className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          RISK
          <br />
          <motion.span
            className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            MIRROR
          </motion.span>
        </motion.h2>
        <motion.p
          className="max-w-3xl text-2xl mb-8 text-gray-300 font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Reflect on tomorrow's risks today. Harness the power of 
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {" "}AI-driven insights{" "}
          </motion.span>
          to transform uncertainty into strategic advantage.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Button className="relative bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-300 hover:to-teal-300 text-gray-900 px-10 py-4 text-xl rounded-full shadow-2xl transform transition-all duration-300 font-bold">
              Start Your Journey
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 text-xl rounded-full backdrop-blur-sm transition-all duration-300">
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
              Revolutionary Features
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of risk management with cutting-edge technology
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Quantum Risk Analysis",
                desc: "Advanced quantum computing algorithms that process millions of risk scenarios in real-time.",
                color: "from-blue-500 to-teal-500",
                icon: "🔮",
              },
              {
                title: "Neural Network Predictions",
                desc: "Deep learning models that evolve and adapt, learning from global patterns to predict risks.",
                color: "from-teal-500 to-cyan-500",
                icon: "🧠",
              },
              {
                title: "Holographic Dashboards",
                desc: "Immersive 3D visualizations that transform complex risk data into actionable insights.",
                color: "from-cyan-500 to-blue-500",
                icon: "🌐",
              },
              {
                title: "AI-Powered Forecasting",
                desc: "Machine learning algorithms analyze patterns to predict future risk scenarios with accuracy.",
                color: "from-blue-600 to-cyan-600",
                icon: "🎯",
              },
              {
                title: "Real-Time Monitoring",
                desc: "Continuous surveillance of risk factors with instant alerts and automated protocols.",
                color: "from-teal-600 to-blue-600",
                icon: "👁️",
              },
              {
                title: "Blockchain Security",
                desc: "Immutable audit trails and decentralized risk verification for data integrity.",
                color: "from-cyan-600 to-teal-600",
                icon: "🔗",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="group"
              >
                <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl hover:shadow-blue-400/40 transition-all duration-300 h-full group-hover:bg-gray-700/80 hover:border-teal-400/50">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.3, type: "spring", stiffness: 300 }
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <motion.div
                      className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 0 25px rgba(20, 184, 166, 0.6)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {i + 1}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-teal-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 flex-grow leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Value Proposition Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-teal-800/30 backdrop-blur-sm"></div>
        <div className="w-full text-center relative z-10">
          <motion.h3
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent px-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Risk Mirror Dominates
          </motion.h3>
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Step into the future where risk management isn't reactive—it's predictive, 
            intelligent, and seamlessly integrated into your decision-making process.
          </motion.p>
          
          <div className="relative h-48 w-full overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -2400], // Much larger movement for ultra-wide screens
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              style={{ 
                width: "max-content",
                willChange: "transform"
              }}
            >
              {/* Create enough duplicates for seamless full-screen loop */}
              {Array(8).fill(null).map((_, setIndex) => (
                [
                  {
                    title: "Quantum Security",
                    desc: "Unbreakable encryption protocols",
                    icon: "🔐",
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    title: "Global Intelligence",
                    desc: "Worldwide threat monitoring",
                    icon: "🌍",
                    color: "from-teal-500 to-cyan-500"
                  },
                  {
                    title: "Instant Response",
                    desc: "Microsecond alert systems",
                    icon: "⚡",
                    color: "from-cyan-500 to-blue-500"
                  },
                  {
                    title: "Predictive Analytics",
                    desc: "Future-proof risk modeling",
                    icon: "🎯",
                    color: "from-blue-600 to-teal-600"
                  },
                  {
                    title: "Cloud Integration",
                    desc: "Seamless multi-cloud deployment",
                    icon: "☁️",
                    color: "from-teal-600 to-cyan-600"
                  },
                  {
                    title: "Advanced Reporting",
                    desc: "Intelligent business insights",
                    icon: "📊",
                    color: "from-cyan-600 to-blue-600"
                  }
                ].map((item, i) => {
                  const uniqueKey = `${setIndex}-${i}`;
                  return (
                    <motion.div
                      key={uniqueKey}
                      className="group flex-shrink-0"
                      style={{ minWidth: "320px" }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -10,
                        transition: { 
                          duration: 0.4, 
                          type: "spring", 
                          stiffness: 200
                        }
                      }}
                    >
                      <div className="bg-gray-800/90 backdrop-blur-lg border border-blue-400/40 rounded-xl p-5 h-40 hover:bg-gray-700/90 hover:border-teal-400/60 transition-all duration-500 shadow-lg hover:shadow-blue-400/40 relative overflow-hidden">
                        {/* Gear-like background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-10"
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full" 
                               style={{
                                 background: `conic-gradient(from 0deg, transparent 45deg, rgba(20, 184, 166, 0.1) 55deg, transparent 65deg, rgba(59, 130, 246, 0.1) 75deg, transparent 85deg)`,
                                 transform: 'scale(1.2)'
                               }}
                          />
                        </motion.div>
                        
                        <motion.div
                          className="text-3xl mb-2 relative z-10"
                          animate={{
                            rotate: [0, -360]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.1
                          }}
                          whileHover={{ 
                            scale: 1.3,
                            rotate: 720,
                            transition: { duration: 0.8, type: "spring" }
                          }}
                        >
                          {item.icon}
                        </motion.div>
                        <motion.div
                          className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative z-10`}
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: {
                              duration: 6,
                              repeat: Infinity,
                              ease: "linear"
                            },
                            scale: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        />
                        <h4 className="text-sm font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-teal-300 transition-all duration-300 relative z-10">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-xs leading-tight relative z-10">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )).flat()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mb-8"
          >
            <div>
              <h5 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Risk Mirror
              </h5>
              <p className="text-gray-300">
                Transforming uncertainty into strategic advantage through intelligent risk management.
              </p>
            </div>
            <div>
              <h6 className="text-lg font-semibold mb-4 text-white">Solutions</h6>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Enterprise Risk</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Financial Analytics</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Compliance Suite</li>
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-semibold mb-4 text-white">Company</h6>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-teal-400 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-teal-400 transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-teal-400 transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            className="border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-gray-400">
              © 2025 Risk Mirror. All rights reserved. | Powered by Intelligent Analytics
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
