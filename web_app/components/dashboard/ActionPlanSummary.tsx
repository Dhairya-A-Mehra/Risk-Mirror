import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plan, MonthlyGoal } from "@/models/plan";

export function ActionPlanSummary({ plan }: { plan: Pick<Plan, 'planTitle' | 'monthlyGoals'> | null }) {
  if (!plan) return <Card><CardHeader><CardTitle>No Active Plan</CardTitle></CardHeader></Card>;

  const firstGoal: MonthlyGoal | undefined = plan.monthlyGoals[0];
  // If you want to show progress, you need to add currentAmount/targetAmount to MonthlyGoal type
  // For now, just show description and target

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{plan.planTitle}</CardTitle>
        <CardDescription>{firstGoal ? `${firstGoal.description} (Target: ${firstGoal.target})` : 'No goals set.'}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* You can add more details or a progress bar if MonthlyGoal has progress info */}
      </CardContent>
    </Card>
  );
}