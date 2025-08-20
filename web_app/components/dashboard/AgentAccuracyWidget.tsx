// web_app/components/dashboard/AgentAccuracyWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define a more specific interface for this component's props
interface AccuracyProps {
  accuracy?: {
    financial: { total: number; correct: number; accuracy: number };
    health: { total: number; correct: number; accuracy: number };
  };
}

export function AgentAccuracyWidget({ accuracy }: AccuracyProps) {
  // Provide default values to prevent crashes if accuracy data is missing
  const financialAccuracy = accuracy?.financial?.accuracy ?? 0;
  const healthAccuracy = accuracy?.health?.accuracy ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Prediction Accuracy</CardTitle>
        <CardDescription>Based on historical performance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-300">Financial Agent</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{(financialAccuracy * 100).toFixed(0)}%</span>
          </div>
          <Progress value={financialAccuracy * 100} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-300">Health Agent</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{(healthAccuracy * 100).toFixed(0)}%</span>
          </div>
          <Progress value={healthAccuracy * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}