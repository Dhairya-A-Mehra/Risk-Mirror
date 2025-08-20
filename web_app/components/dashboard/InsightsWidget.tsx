// web_app/components/dashboard/InsightsWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Insight } from "@/models/insight";
import { Lightbulb, TrendingUp } from "lucide-react";

export function InsightsWidget({ insights }: { insights: { recommendations: Insight[], emotionalROI: Insight[] } }) {
  const recommendations = insights?.recommendations || [];
  const emotionalROI = insights?.emotionalROI || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Personalized Insights</CardTitle>
        <CardDescription>Actionable advice based on your data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* --- NEW: Dedicated Section for Recommendations --- */}
        <div>
          <h4 className="flex items-center text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
            Personalized Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map(rec => (
                <div key={rec._id?.toString()}>
                  <p className="font-medium text-sm text-slate-700 dark:text-slate-300">{rec.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{rec.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No new recommendations at the moment.</p>
            )}
          </div>
        </div>

        {/* --- NEW: Dedicated Section for Emotional ROI Tracker --- */}
        <div>
          <h4 className="flex items-center text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
            Emotional ROI Tracker
          </h4>
          <div className="space-y-3">
            {emotionalROI.length > 0 ? (
              emotionalROI.map(roi => (
                <div key={roi._id?.toString()}>
                  <p className="font-medium text-sm text-slate-700 dark:text-slate-300">{roi.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{roi.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">Track more data to reveal links between your finances and happiness.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}