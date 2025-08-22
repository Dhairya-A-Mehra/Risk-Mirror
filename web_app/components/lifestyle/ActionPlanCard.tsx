import React from 'react';
import { Plan } from '@/models/plan';

const ActionPlanCard = ({ plan }: { plan: Plan }) => (
  <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
    <h3 className="font-bold text-white text-lg mb-4">3-Month Lifestyle Plan</h3>
    <div className="relative border-l-2 border-slate-700/50 ml-3">
      {plan.monthlyGoals.map((goal) => (
        <div key={goal.month} className="mb-6 ml-8">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full ring-4 ring-slate-800">
                <span className="text-sky-400 font-bold">{goal.month}</span>
            </span>
            <h4 className="font-semibold text-slate-200">{goal.description}</h4>
            <p className="text-sm text-slate-400">Target: {goal.target}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ActionPlanCard;