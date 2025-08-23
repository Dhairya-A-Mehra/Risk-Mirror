import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExplainabilityModal } from "@/components/dashboard/ExplainabilityModal";
import { ExplainabilityLog } from "@/models/explainabilityLog";

interface Props { forecast: number; explanation: ExplainabilityLog | null; }
export function MedicalExpenseWidget({ forecast, explanation }: Props) {
  return (
  <Card className="min-h-[220px] bg-[rgba(15,23,42,0.6)] backdrop-blur-lg rounded-xl border border-blue-900/30 shadow-xl h-full flex flex-col">
      <CardHeader>
        <CardTitle>Medical Expense Forecast</CardTitle>
        <CardDescription>Predicted annual costs based on your profile.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <p className="text-4xl font-bold">${forecast.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">per year (estimated)</p>
        </div>
        <div className="mt-4">
          <ExplainabilityModal explanation={explanation} />
        </div>
      </CardContent>
    </Card>
  );
}