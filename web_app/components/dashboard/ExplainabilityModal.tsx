// web_app/components/dashboard/ExplainabilityModal.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { ExplainabilityLog } from "@/models/explainabilityLog";

export function ExplainabilityModal({ explanation }: { explanation: ExplainabilityLog | null }) {
  if (!explanation) {
    return <Button variant="outline" className="w-full" disabled>Explanation Unavailable</Button>;
  }

  // Sort by the absolute impact of the feature
  const sortedFeatures = explanation.featureImportances.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">View Detailed Explanation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Decision Factors for Risk Score</DialogTitle>
          <DialogDescription>{explanation.decisionSummary}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* --- NEW: Explicitly mention the technology --- */}
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mb-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
            Powered by SHAP & LIME models to show the impact of each factor on your score.
          </p>
          <ul className="space-y-3">
            {sortedFeatures.map((feat, i) => (
              <li key={i}>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{feat.feature}</span>
                  <span className={`font-semibold ${feat.value > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {feat.value > 0 ? 'Increased Risk' : 'Decreased Risk'}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full">
                   <div 
                     style={{ width: `${Math.min(Math.abs(feat.value) * 100, 100)}%`}} 
                     className={`h-3 rounded-full ${feat.value > 0 ? 'bg-red-500' : 'bg-green-500'}`} 
                   />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}