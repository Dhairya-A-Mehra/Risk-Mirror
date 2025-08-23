import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HealthInsurancePolicy } from "@/models/healthInsurance";
import { ShieldCheck } from "lucide-react";

export function HealthInsuranceWidget({ policies }: { policies: HealthInsurancePolicy[] }) {
  return (
  <Card className="bg-[rgba(15,23,42,0.6)] backdrop-blur-lg border border-blue-900/30 shadow-xl w-full min-w-[400px] h-full flex flex-col">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Health Insurance Policies</CardTitle>
        <CardDescription className="text-cyan-200/80">Your organized policy details and premium reminders.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {policies.length > 0 ? policies.map(p => (
          <div key={p._id?.toString()} className="flex justify-between items-center p-3 bg-[rgba(15,23,42,0.7)] rounded-lg border border-blue-900/30 shadow">
            <div>
              <p className="font-bold text-cyan-200">{p.providerName} <span className="font-normal text-cyan-400/80">({p.policyType})</span></p>
              <p className="text-xs text-cyan-400/60">Policy #{p.policyNumber}</p>
            </div>
            <div>
              <p className="font-bold text-cyan-200">${p.premium.amount.toLocaleString()} / {p.premium.frequency}</p>
              <p className="text-xs text-cyan-400/60">Next due: {new Date(p.premium.nextDueDate).toLocaleDateString()}</p>
            </div>
          </div>
        )) : <p className="text-sm text-muted-foreground">No health insurance policies added yet.</p>}
      </CardContent>
    </Card>
  );
}