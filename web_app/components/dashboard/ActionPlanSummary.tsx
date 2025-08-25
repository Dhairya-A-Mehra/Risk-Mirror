import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plan, MonthlyGoal } from "@/models/plan";

export function ActionPlanSummary({ plan }: { plan: Pick<Plan, 'planTitle' | 'monthlyGoals'> | null }) {
  if (!plan) return (
    <Card className="bg-green-400/10 border-4 border-green-400 rounded-2xl shadow-2xl backdrop-blur-lg min-h-[120px] flex flex-col justify-center">
      <CardContent className="flex flex-col justify-center h-full min-h-[80px] py-3">
        <div className="text-white flex items-center gap-2 text-lg font-bold mb-1"><span className="animate-pulse text-2xl">⏳</span> No Active Plan</div>
        <div className="text-white/90 text-sm">Your personalized plan is being prepared. Please check back soon!</div>
      </CardContent>
    </Card>
  );

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
