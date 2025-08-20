// web_app/components/finance/FinancialPlanWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";

// In a real app, you would import the Plan model
// import { Plan } from "@/models/plan";
interface Plan { planTitle: string; monthlyGoals: any[] } // Dummy type for now

export function FinancialPlanWidget({ plan }: { plan: Plan | null }) {
  // Dummy data for display purposes
  const dummyPlan = {
    planTitle: "3-Month Savings Boost",
    monthlyGoals: [
        { month: 1, description: "Reduce dining out expenses by 20%", target: "Save 3,000 INR", status: "completed" },
        { month: 2, description: "Increase emergency fund", target: "Save 5,000 INR", status: "on-track" },
        { month: 3, description: "Review and optimize subscriptions", target: "Save 500 INR", status: "at-risk" },
    ]
  };

  const currentPlan = plan || dummyPlan;

  const getStatusIcon = (status: 'on-track' | 'at-risk' | 'completed') => {
    if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'at-risk') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <CircleDashed className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">💡</div>
        <h3 className="text-xl font-bold mb-3 text-white">{currentPlan.planTitle}</h3>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm mb-4">Your personalized roadmap to achieve your financial goals.</p>
        <ul className="space-y-4">
          {currentPlan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0">{getStatusIcon(goal.status as any)}</div>
              <div>
                <div className="font-semibold text-white text-base mb-1">Month {goal.month}: {goal.description}</div>
                <div className="text-sm text-cyan-300 leading-relaxed">Target: {goal.target}</div>
              </div>
            </li>
          ))}
        </ul>
        {!plan && (
            <Button variant="outline" className="mt-4 w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white">Create a New Plan</Button>
        )}
      </CardContent>
    </Card>
  );
}