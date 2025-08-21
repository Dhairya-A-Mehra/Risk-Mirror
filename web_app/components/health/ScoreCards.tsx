import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, TrendingUp } from "lucide-react";

interface Props { wellnessScore: number; wealthScore: number; }
export function ScoreCards({ wellnessScore, wealthScore }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Wellness Score</CardTitle><HeartPulse className="h-4 w-4 text-red-500"/></CardHeader><CardContent><div className="text-2xl font-bold">{wellnessScore.toFixed(1)}</div></CardContent></Card>
      <Card><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Wealth Score</CardTitle><TrendingUp className="h-4 w-4 text-green-500"/></CardHeader><CardContent><div className="text-2xl font-bold">{wealthScore.toFixed(1)}</div></CardContent></Card>
    </div>
  );
}