import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DailyStressTestModal } from './DailyStressTestModal';

export function OverallRiskGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45; 
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    return "#3b82f6";
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full flex flex-col justify-center items-center">
      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          🏆
        </div>
        <div className="relative h-32 w-32 mb-2">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" className="text-blue-900" stroke="currentColor" />
            <circle
              cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" strokeLinecap="round"
              stroke={getColor(score)}
              className="transform -rotate-90 origin-center"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{Number(score).toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">Overall Risk Fitness</h3>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm">Your overall risk fitness score.</p>
           <DailyStressTestModal />
        </CardContent>
      </Card>
    
  );
}
