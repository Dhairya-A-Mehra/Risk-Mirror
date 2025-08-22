import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plan, MonthlyGoal } from "@/models/plan";

export function ActionPlanSummary({ plan }: { plan: Pick<Plan, 'planTitle' | 'monthlyGoals'> | null }) {
  if (!plan) return <Card><CardHeader><CardTitle>No Active Plan</CardTitle></CardHeader></Card>;

  const firstGoal: MonthlyGoal | undefined = plan.monthlyGoals[0];
 

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{plan.planTitle}</CardTitle>
        <CardDescription>{firstGoal ? `${firstGoal.description} (Target: ${firstGoal.target})` : 'No goals set.'}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  );
}
