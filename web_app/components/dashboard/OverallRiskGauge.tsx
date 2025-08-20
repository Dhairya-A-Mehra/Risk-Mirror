// web_app/components/dashboard/OverallRiskGauge.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DailyStressTestModal } from './DailyStressTestModal';

export function OverallRiskGauge({ score }: { score: number }) {
  // Assuming a score of 0-100 where higher is better (less risk)
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 70) return "#22c55e"; // green for low risk
    if (s >= 40) return "#f59e0b"; // amber for medium risk
    return "#ef4444"; // red for high risk
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="flex flex-col items-center justify-center h-full text-center">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Overall Risk Fitness</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" className="text-slate-200 dark:text-slate-700" stroke="currentColor" />
              <motion.circle
                cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" strokeLinecap="round"
                stroke={getColor(score)}
                className="transform -rotate-90 origin-center"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{Number(score).toFixed(1)}</span>
            </div>
          </div>
           <DailyStressTestModal />
        </CardContent>
      </Card>
    </motion.div>
  );
}