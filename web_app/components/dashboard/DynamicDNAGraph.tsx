// web_app/components/dashboard/DynamicDNAGraph.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DynamicRiskDNA } from "@/models/user";
import { motion } from 'framer-motion';
import { Zap, Link2, Brain, Heart, Landmark } from "lucide-react";

export function DynamicDNAGraph({ riskDNA }: { riskDNA: DynamicRiskDNA }) {
  const getBarColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const getIcon = (riskType: string) => {
    if (riskType === 'financial') return <Landmark className="h-5 w-5 text-blue-500" />;
    if (riskType === 'health') return <Heart className="h-5 w-5 text-red-500" />;
    return <Brain className="h-5 w-5 text-green-500" />;
  };

  const keySignals = riskDNA.keyBehavioralSignals || [];
  const interdependencies = riskDNA.interdependencies || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Dynamic Risk DNA</CardTitle>
        <CardDescription>A real-time, evolving profile of your financial stability.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bar Chart for Scores */}
        <div className="space-y-4">
          {(['financial', 'health', 'behavioral'] as const).map((key, i) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">{key} Score</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{riskDNA[`${key}Score`].toFixed(0)}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <motion.div
                  className={`h-2.5 rounded-full ${getBarColor(riskDNA[`${key}Score`])}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${riskDNA[`${key}Score`]}%` }}
                  transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* --- NEW: Cross-Risk Interdependency Mapping Visualization --- */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200">Cross-Risk Links & Signals</h4>
          <div className="space-y-3">
             {interdependencies.map((dep, i) => (
                <div key={`dep-${i}`} className="flex items-center text-sm">
                    {getIcon(dep.sourceRisk)}
                    <div className="flex-1 border-t border-dashed border-slate-400 mx-2"></div>
                    <Link2 className="h-4 w-4 text-slate-500" />
                    <div className="flex-1 border-t border-dashed border-slate-400 mx-2"></div>
                    {getIcon(dep.targetRisk)}
                    <span className="ml-3 text-slate-600 dark:text-slate-400 text-xs text-left flex-shrink-0 w-40">
                      {dep.reason}
                    </span>
                </div>
             ))}
             {keySignals.map((signal, i) => (
                <div key={`sig-${i}`} className="flex items-start text-sm">
                    <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{signal}</span>
                </div>
             ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}