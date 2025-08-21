import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Insight } from "@/models/insight";
import { Lightbulb, TrendingUp } from "lucide-react";

export function InsightsWidget({ insights }: { insights: { recommendations: Insight[], emotionalROI: Insight[] } }) {
  const recommendations = insights?.recommendations || [];
  const emotionalROI = insights?.emotionalROI || [];

  return (
    <Card className="h-full bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">Personalized Insights</CardTitle>
        <CardDescription className="text-gray-300">Actionable advice based on your data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="flex items-center text-base font-bold text-blue-400 mb-2">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-400" />
            Personalized Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map(rec => (
                <div key={rec._id?.toString()}>
                  <p className="font-semibold text-base text-white">{rec.title}</p>
                  <p className="text-sm text-gray-300">{rec.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No new recommendations at the moment.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="flex items-center text-base font-bold text-blue-400 mb-2">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            Emotional ROI Tracker
          </h4>
          <div className="space-y-3">
            {emotionalROI.length > 0 ? (
              emotionalROI.map(roi => (
                <div key={roi._id?.toString()}>
                  <p className="font-semibold text-base text-white">{roi.title}</p>
                  <p className="text-sm text-gray-300">{roi.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Track more data to reveal links between your finances and happiness.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
