import React from 'react';
import { motion } from 'framer-motion';

const getScoreColor = (score: number) => score > 75 ? 'text-sky-400' : score > 50 ? 'text-yellow-400' : 'text-red-400';

const LifestyleScoreCard = ({ score }: { score: number }) => (
  <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
    <h3 className="font-bold text-white mb-2">Lifestyle Score</h3>
    <p className={`text-5xl font-bold text-center ${getScoreColor(score)}`}>
      {score}
      <span className="text-3xl text-slate-400">/ 100</span>
    </p>
  </div>
);

export default LifestyleScoreCard;