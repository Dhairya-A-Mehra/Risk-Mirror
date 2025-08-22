import React from 'react';
import { Insight } from '@/models/insight';
import { Activity } from 'lucide-react';

const BehavioralTrackingCard = ({ insights }: { insights: Insight[] }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="font-bold text-white mb-4 flex items-center"><Activity className="h-5 w-5 mr-2" /> Behavioral Patterns</h3>
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li key={i} className="text-sm bg-slate-900/50 p-3 rounded-lg">
                <p className="font-semibold text-slate-200">{insight.title}</p>
                <p className="text-slate-400">{insight.description}</p>
            </li>
          ))}
        </ul>
    </div>
);

export default BehavioralTrackingCard;