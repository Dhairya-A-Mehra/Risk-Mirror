import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleDashed, AlertCircle } from "lucide-react";
import { Plan } from "@/models/plan"; 
import { Skeleton } from "@/components/ui/skeleton"; 

interface ReusablePlanWidgetProps {
  plan: Plan | null;
  dummyPlan: Omit<Plan, '_id' | 'userId' | 'status' | 'startDate' | 'endDate'>; 
  isLoading: boolean;
  planType: 'Health' | 'Finance' | 'Lifestyle';
}

export function FinancialPlanWidget({ plan, dummyPlan, isLoading, planType }: ReusablePlanWidgetProps) {
  const displayPlan = plan || dummyPlan;

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
        <CardDescription>Your personalized roadmap to achieve your financial goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {displayPlan.monthlyGoals.map((goal, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(goal.status as any)}</div>
              <div>
                <div className="font-semibold text-white text-base mb-1">Month {goal.month}: {goal.description}</div>
                <div className="text-sm text-cyan-300 leading-relaxed">Target: {goal.target}</div>
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
