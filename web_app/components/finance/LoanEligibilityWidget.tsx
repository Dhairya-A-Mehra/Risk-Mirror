import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExplainabilityModal } from "@/components/dashboard/ExplainabilityModal"; // Re-use the modal!
import { LoanEligibility } from "@/models/financePage";
import { ExplainabilityLog } from "@/models/explainabilityLog";

interface Props { eligibility: LoanEligibility; explanation: ExplainabilityLog | null; }
export function LoanEligibilityWidget({ eligibility, explanation }: Props) {
  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">🏦</div>
        <h3 className="text-xl font-bold mb-3 text-white">Loan Eligibility</h3>
        <div className={`mb-2 font-bold text-lg ${eligibility.isEligible ? 'text-green-400' : 'text-red-400'}`}>{eligibility.isEligible ? 'Eligible' : 'Not Recommended'}</div>
        <div className="text-sm text-gray-300">{eligibility.reason}</div>
        {eligibility.isEligible && <div className="text-sm text-cyan-400 mt-2">Max Amount: ${eligibility.maxAmount.toLocaleString()}</div>}
        {explanation && <div className="mt-4 w-full"><ExplainabilityModal explanation={explanation} /></div>}
      </CardContent>
    </Card>
  );
}