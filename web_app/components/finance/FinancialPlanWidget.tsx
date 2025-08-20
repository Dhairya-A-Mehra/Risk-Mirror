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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{currentPlan.planTitle}</CardTitle>
        <CardDescription>Your personalized roadmap to achieve your financial goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {currentPlan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(goal.status as any)}</div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Month {goal.month}: {goal.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Target: {goal.target}</p>
              </div>
            </li>
          ))}
        </ul>
        {!plan && (
            <Button variant="outline" className="mt-4 w-full">Create a New Plan</Button>
        )}
      </CardContent>
    </Card>
  );
}