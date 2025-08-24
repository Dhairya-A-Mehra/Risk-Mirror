// web_app/components/simulation/SimulationCard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface SimulationCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ icon, category, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)' }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl shadow-lg flex flex-col p-6 h-full"
    >
      {/* Card Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 bg-slate-700/50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <span className="text-sm font-semibold text-sky-400">{category}</span>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
      </div>
      
      {/* Card Body */}
      <p className="text-slate-400 text-sm flex-grow">
        {description}
      </p>

      {/* Card Footer */}
      <div className="mt-6">
        <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold">
          Start Simulation
        </Button>
      </div>
    </motion.div>
  );
};

export default SimulationCard;