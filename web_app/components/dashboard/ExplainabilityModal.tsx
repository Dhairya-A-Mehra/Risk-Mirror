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
        <Button variant="outline" className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white">View Detailed Explanation</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-3 text-white">Decision Factors for Risk Score</DialogTitle>
          <DialogDescription className="text-gray-300 flex-grow leading-relaxed text-base mb-4">{explanation.decisionSummary}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-xs text-center text-gray-300 mb-4 p-2 bg-blue-900 rounded-md">
            Powered by SHAP & LIME models to show the impact of each factor on your score.
          </p>
          <ul className="space-y-3">
            {sortedFeatures.map((feat, i) => (
              <li key={i}>
                <div className="flex justify-between items-center text-base mb-1">
                  <span className="font-medium text-white">{feat.feature}</span>
                  <span className={`font-semibold ${feat.value > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {feat.value > 0 ? 'Increased Risk' : 'Decreased Risk'}
                  </span>
                </div>
                <div className="w-full h-3 bg-blue-900 rounded-full">
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