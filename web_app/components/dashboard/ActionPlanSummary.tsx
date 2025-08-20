import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plan } from "@/models/plan";

export function ActionPlanSummary({ plan }: { plan: Pick<Plan, 'planType' | 'goals'> | null }) {
  if (!plan) return <Card><CardHeader><CardTitle>No Active Plan</CardTitle></CardHeader></Card>;

  const firstGoal = plan.goals[0];
  const progress = firstGoal ? (firstGoal.currentAmount / firstGoal.targetAmount) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{plan.planType}</CardTitle>
        <CardDescription>{firstGoal?.description || 'No goals set.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}