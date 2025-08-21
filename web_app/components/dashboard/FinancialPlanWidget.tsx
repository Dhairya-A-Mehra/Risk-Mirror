
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plan } from "@/models/plan";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";

export function FinancialPlanWidget({ plan }: { plan: Plan | null }) {
  if (!plan) {
    return (
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-6 text-center h-full flex flex-col">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">💡</div>
          <h3 className="text-xl font-bold mb-3 text-white">3-Month Financial Plan</h3>
          <p className="text-gray-300 flex-grow leading-relaxed text-sm">No active plan found. Let's create one!</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: 'on-track' | 'at-risk' | 'completed') => {
    if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'at-risk') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <CircleDashed className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">💡</div>
        <h3 className="text-xl font-bold mb-3 text-white">{plan.planTitle}</h3>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm mb-4">Your personalized roadmap to financial success.</p>
        <ul className="space-y-4">
          {plan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(goal.status)}</div>
              <div>
                <p className="font-medium text-white">Month {goal.month}: {goal.description}</p>
                <p className="text-sm text-gray-300">Target: {goal.target}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
