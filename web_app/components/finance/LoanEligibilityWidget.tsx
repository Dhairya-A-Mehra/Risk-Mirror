import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExplainabilityModal } from "@/components/dashboard/ExplainabilityModal"; // Re-use the modal!
import { LoanEligibility } from "@/models/financePage";
import { ExplainabilityLog } from "@/models/explainabilityLog";

interface Props { eligibility: LoanEligibility; explanation: ExplainabilityLog | null; }
export function LoanEligibilityWidget({ eligibility, explanation }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Loan Eligibility</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <div>
          <p className={`text-2xl font-bold ${eligibility.isEligible ? 'text-green-500' : 'text-red-500'}`}>
            {eligibility.isEligible ? "Eligible" : "Not Recommended"}
          </p>
          <p className="text-sm text-muted-foreground">{eligibility.reason}</p>
        </div>
        <div className="mt-4">
          <ExplainabilityModal explanation={explanation} />
        </div>
      </CardContent>
    </Card>
  );
}