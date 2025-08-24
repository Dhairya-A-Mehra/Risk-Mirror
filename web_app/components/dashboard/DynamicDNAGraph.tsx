import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DynamicRiskDNA } from "@/models/user";
import { motion } from 'framer-motion';
import { Zap, Link2, Brain, Heart, Landmark } from "lucide-react";

export function DynamicDNAGraph({ riskDNA }: { riskDNA: DynamicRiskDNA }) {
  const getBarColor = (score: number | null | undefined) => {
    // You can customize this logic based on your requirements
    return score != null && score > 0 ? "bg-blue-500" : "bg-gray-500";
  };

  const getIcon = (riskType: string) => {
    if (riskType === 'financial') return <Landmark className="h-5 w-5 text-blue-500" />;
    if (riskType === 'health') return <Heart className="h-5 w-5 text-red-500" />;
    return <Brain className="h-5 w-5 text-green-500" />;
  };

  const keySignals = riskDNA.keyBehavioralSignals || [];
  const interdependencies = riskDNA.interdependencies || [];

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">🧬</div>
        <h3 className="text-xl font-bold mb-3 text-white">Your Dynamic Risk DNA</h3>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm mb-4">A real-time, evolving profile of your financial stability.</p>
        
        <div className="space-y-4 mb-4">
          {(['financial', 'health', 'behavioral'] as const).map((key, i) => {
            const score = riskDNA[`${key}Score`];
            // Use a fallback of 0 if score is null or undefined
            const displayScore = typeof score === 'number' ? score.toFixed(0) : '0';
            const barWidth = typeof score === 'number' && score > 0 ? score : 0;

            return (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium capitalize text-white">{key} Score</span>
                  <span className="text-sm font-bold text-white">{displayScore}</span>
                </div>
                <div className="w-full bg-blue-900 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getBarColor(score)}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 text-white">Cross-Risk Links & Signals</h4>
          <div className="space-y-3">
            {interdependencies.map((dep, i) => (
              <div key={`dep-${i}`} className="flex items-center text-sm">
                {getIcon(dep.sourceRisk)}
                <div className="flex-1 border-t border-dashed border-blue-400 mx-2"></div>
                <Link2 className="h-4 w-4 text-blue-400" />
                <div className="flex-1 border-t border-dashed border-blue-400 mx-2"></div>
                {getIcon(dep.targetRisk)}
                <span className="ml-3 text-gray-300 text-xs text-left flex-shrink-0 w-40">
                  {dep.reason}
                </span>
              </div>
            ))}
            {keySignals.map((signal, i) => (
              <div key={`sig-${i}`} className="flex items-start text-sm">
                <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 