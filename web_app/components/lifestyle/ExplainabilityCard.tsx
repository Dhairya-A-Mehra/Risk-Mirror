import React from 'react';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ExplainabilityCard = ({ explanation }: { explanation: ExplainabilityLog }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="font-bold text-white mb-3">Score Explanation</h3>
        <p className="text-sm text-slate-400 mb-4">{explanation.decisionSummary}</p>
        <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={explanation.featureImportances} layout="vertical">
                    <XAxis type="number" hide />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                    <Bar dataKey="value" name="Importance" fill="#38bdf8" radius={[0, 5, 5, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default ExplainabilityCard;