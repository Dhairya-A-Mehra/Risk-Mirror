import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, HeartPulse, Shield } from "lucide-react";

interface ScoreCardsProps { wealthScore: number; wellnessScore: number; financialCalmIndex: number; onPanic: () => void; }
export function ScoreCards({ wealthScore, wellnessScore, financialCalmIndex, onPanic }: ScoreCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-6 text-center h-full flex flex-col">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg"><TrendingUp className="h-6 w-6 text-green-400"/></div>
          <div className="text-4xl font-bold text-white mb-2">{wealthScore.toFixed(1)}</div>
          <h3 className="text-xl font-bold mb-3 text-white">Wealth Score</h3>
          <p className="text-gray-300 flex-grow leading-relaxed text-sm">Higher is better</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-6 text-center h-full flex flex-col">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"><HeartPulse className="h-6 w-6 text-red-400"/></div>
          <div className="text-4xl font-bold text-white mb-2">{wellnessScore.toFixed(1)}</div>
          <h3 className="text-xl font-bold mb-3 text-white">Wellness Score</h3>
          <p className="text-gray-300 flex-grow leading-relaxed text-sm">Higher is better</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full cursor-pointer hover:bg-blue-900/30" onClick={onPanic}>
        <CardContent className="p-6 text-center h-full flex flex-col">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            <Shield className="h-8 w-8 text-white drop-shadow-lg" />
          </div>
          <div className="text-4xl font-bold text-white mb-2">{financialCalmIndex.toFixed(1)}</div>
          <h3 className="text-xl font-bold mb-3 text-white">Financial Calm Index</h3>
          <p className="text-gray-300 flex-grow leading-relaxed text-sm">Click if feeling stressed</p>
        </CardContent>
      </Card>
    </div>
  );
}