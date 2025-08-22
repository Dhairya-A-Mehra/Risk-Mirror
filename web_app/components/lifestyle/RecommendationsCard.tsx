import React from 'react';
import { Insight } from '@/models/insight';
import { Lightbulb } from 'lucide-react';

const RecommendationsCard = ({ recommendations }: { recommendations: Insight[] }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="font-bold text-white mb-4">Personalized Recommendations</h3>
        <ul className="space-y-3">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start text-sm">
                <Lightbulb className="h-4 w-4 mr-3 mt-0.5 text-sky-400 shrink-0" />
                <span><strong className="text-slate-200">{rec.title}:</strong> {rec.description}</span>
            </li>
          ))}
        </ul>
    </div>
);

export default RecommendationsCard;