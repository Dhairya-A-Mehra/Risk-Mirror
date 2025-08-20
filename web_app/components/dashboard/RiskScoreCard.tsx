// web_app/components/dashboard/RiskScoreCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface RiskScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: string;
}

export function RiskScoreCard({ title, score, icon, color }: RiskScoreCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</CardTitle>
          <div className={color}>{icon}</div>
        </CardHeader>
        <CardContent>
          {/* Ensure score is treated as a number before calling toFixed */}
          <div className="text-4xl font-bold text-slate-800 dark:text-slate-100">{Number(score).toFixed(1)}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Score (Higher is Better)</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}