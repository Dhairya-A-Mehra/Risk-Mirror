// web_app/components/finance/FinancialPlanWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";
import { Plan } from "@/models/plan"; // Import the full Plan model
// import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state
// TODO: Update the import path below if Skeleton is located elsewhere
import { Skeleton } from "../ui/skeleton"; // Adjust the path as needed

interface ReusablePlanWidgetProps {
  plan: Plan | null;
  dummyPlan: Omit<Plan, '_id' | 'userId' | 'status' | 'startDate' | 'endDate'>; // Dummy plan for display
  isLoading: boolean;
  planType: 'Health' | 'Finance' | 'Lifestyle';
}

export function FinancialPlanWidget({ plan, dummyPlan, isLoading, planType }: ReusablePlanWidgetProps) {
  const displayPlan = plan || dummyPlan;

  // --- Show a loading skeleton while fetching data ---
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{displayPlan.planTitle}</CardTitle>
        <CardDescription>Your personalized roadmap for your {planType.toLowerCase()} goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayPlan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(goal.status as any)}</div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Month {goal.month}: {goal.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Target: {goal.target}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* Only show the "Create Plan" button if no real plan exists */}
        {!plan && (
            <Button variant="outline" className="mt-4 w-full">Create a New {planType} Plan</Button>
        )}
      </CardContent>
    </Card>
  );
}