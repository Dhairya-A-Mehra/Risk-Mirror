// web_app/components/dashboard/FinancialPlanWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plan } from "@/models/plan";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";

export function FinancialPlanWidget({ plan }: { plan: Plan | null }) {
  if (!plan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>3-Month Financial Plan</CardTitle>
          <CardDescription>No active plan found. Let's create one!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusIcon = (status: 'on-track' | 'at-risk' | 'completed') => {
    if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'at-risk') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <CircleDashed className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.planTitle}</CardTitle>
        <CardDescription>Your personalized roadmap to financial success.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {plan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(goal.status)}</div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Month {goal.month}: {goal.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Target: {goal.target}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}