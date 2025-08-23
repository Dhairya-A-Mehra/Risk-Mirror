function GaugeChart({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative h-24 w-24 mb-2 mx-auto">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" className="text-blue-900" stroke="currentColor" />
        <circle
          cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" strokeLinecap="round"
          stroke={color}
          className="transform -rotate-90 origin-center"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">{Number(score).toFixed(1)}</span>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, TrendingUp } from "lucide-react";

interface Props { wellnessScore: number; wealthScore: number; }
export function ScoreCards({ wellnessScore, wealthScore }: Props) {
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
  <Card className="min-w-[340px] ml-8 bg-[rgba(15,23,42,0.6)] backdrop-blur-lg border border-blue-900/30 shadow-xl flex flex-col justify-between">
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Wellness Score</CardTitle>
          <HeartPulse className="h-4 w-4 text-red-500"/>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <GaugeChart score={wellnessScore} color="#06b6d4" />
        </CardContent>
      </Card>
  <Card className="min-w-[340px] mr-8 bg-[rgba(15,23,42,0.6)] backdrop-blur-lg border border-blue-900/30 shadow-xl flex flex-col justify-between">
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Wealth Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500"/>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <GaugeChart score={wealthScore} color="#22c55e" />
        </CardContent>
      </Card>
    </div>
  );
}