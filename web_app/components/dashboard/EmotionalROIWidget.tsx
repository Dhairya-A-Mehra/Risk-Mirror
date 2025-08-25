import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function EmotionalROIWidget({ insight }: { insight: string }) {
  return (
    <Card className="bg-gradient-to-r from-blue-900/80 via-cyan-800/70 to-blue-700/80 border border-cyan-400/30 rounded-2xl shadow-2xl backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">Emotional ROI <TrendingUp className="h-5 w-5 text-cyan-400" /></CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base text-white/90">{insight}</p>
      </CardContent>
    </Card>
  );
}