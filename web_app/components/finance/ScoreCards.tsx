import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, HeartPulse, Shield } from "lucide-react";

interface ScoreCardsProps { wealthScore: number; wellnessScore: number; financialCalmIndex: number; onPanic: () => void; }
export function ScoreCards({ wealthScore, wellnessScore, financialCalmIndex, onPanic }: ScoreCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Wealth Score</CardTitle><TrendingUp className="h-4 w-4 text-green-500"/></CardHeader><CardContent><div className="text-2xl font-bold">{wealthScore.toFixed(1)}</div></CardContent></Card>
      <Card><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Wellness Score</CardTitle><HeartPulse className="h-4 w-4 text-red-500"/></CardHeader><CardContent><div className="text-2xl font-bold">{wellnessScore.toFixed(1)}</div></CardContent></Card>
      {/* A low calm index could be a button to trigger panic mode */}
      <Card onClick={onPanic} className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Financial Calm Index</CardTitle><Shield className="h-4 w-4 text-blue-500"/></CardHeader><CardContent><div className="text-2xl font-bold">{financialCalmIndex.toFixed(1)}</div><p className="text-xs text-muted-foreground">Click if feeling stressed</p></CardContent></Card>
    </div>
  );
}