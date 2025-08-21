import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HealthInsurancePolicy } from "@/models/healthInsurance";
import { ShieldCheck } from "lucide-react";

export function HealthInsuranceWidget({ policies }: { policies: HealthInsurancePolicy[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Insurance Policies</CardTitle>
        <CardDescription>Your organized policy details and premium reminders.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {policies.length > 0 ? policies.map(p => (
          <div key={p._id?.toString()} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-bold">{p.providerName} <span className="font-normal text-muted-foreground">({p.policyType})</span></p>
              <p className="text-xs text-muted-foreground">Policy #{p.policyNumber}</p>
            </div>
            <div>
              <p className="font-bold">${p.premium.amount.toLocaleString()} / {p.premium.frequency}</p>
              <p className="text-xs text-muted-foreground">Next due: {new Date(p.premium.nextDueDate).toLocaleDateString()}</p>
            </div>
          </div>
        )) : <p className="text-sm text-muted-foreground">No health insurance policies added yet.</p>}
      </CardContent>
    </Card>
  );
}