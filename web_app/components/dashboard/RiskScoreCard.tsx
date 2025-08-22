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
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg`}>{icon}</div>
        <div className="text-4xl font-bold text-white mb-2">{Number(score).toFixed(1)}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm">Score (Higher is Better)</p>
      </CardContent>
    </Card>
  );
}
