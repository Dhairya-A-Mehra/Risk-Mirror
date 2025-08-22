import React from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { GoalSimulation } from '@/models/lifestylePage';

interface ForecastProps {
  forecast: {
    burnoutRiskPercentage: number;
    goalSimulations: GoalSimulation[];
  }
}

const ForecastingCard = ({ forecast }: ForecastProps) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="font-bold text-white text-lg mb-4">AI Lifestyle Forecast</h3>
        <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Burnout Risk</h4>
            <div className="w-full bg-slate-700 rounded-full h-4">
                <div 
                    className="bg-gradient-to-r from-yellow-500 to-red-500 h-4 rounded-full" 
                    style={{ width: `${forecast.burnoutRiskPercentage}%` }}
                ></div>
            </div>
            <p className="text-right text-sm mt-1 text-yellow-300">{forecast.burnoutRiskPercentage}% Risk</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Goal Simulations</h4>
            <div className="space-y-3">
                {forecast.goalSimulations.map((sim, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg text-sm">
                        <p className="flex items-center"><Zap className="h-4 w-4 mr-2 text-slate-400" /> {sim.title}</p>
                        <span className={`font-bold flex items-center ${sim.impactOnScore > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {sim.impactOnScore > 0 ? <TrendingUp className="h-4 mr-1"/> : <TrendingDown className="h-4 mr-1"/>}
                            {sim.impactOnScore > 0 ? '+' : ''}{sim.impactOnScore} pts
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ForecastingCard;