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
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">🎯</div>
        <h3 className="text-xl font-bold mb-3 text-white">Agent Prediction Accuracy</h3>
        <p className="text-gray-200 flex-grow leading-relaxed text-base mb-4">Based on historical performance.</p>
        <div className="mb-4">
          <div className="flex justify-between text-base mb-1">
            <span className="text-white">Financial Agent</span>
            <span className="font-semibold text-white">{(financialAccuracy * 100).toFixed(0)}%</span>
          </div>
          <Progress value={financialAccuracy * 100} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-base mb-1">
            <span className="text-white">Health Agent</span>
            <span className="font-semibold text-white">{(healthAccuracy * 100).toFixed(0)}%</span>
          </div>
          <Progress value={healthAccuracy * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}