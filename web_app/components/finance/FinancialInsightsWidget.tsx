// web_app/components/finance/FinancialInsightsWidget.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Insight } from "@/models/insight";

export function FinancialInsightsWidget({ insights }: { insights: Insight[] }) {
    // Dummy data if the API doesn't provide any yet
    const dummyInsights = [
        { _id: "1", title: "High Spending Alert", description: "Your spending on 'Dining Out' is 30% higher than your monthly average. Consider setting a budget." },
        { _id: "2", title: "Investment Opportunity", description: "Negative sentiment around one of your smaller holdings has lowered its price, which could be a buying opportunity." },
    ];

    const currentInsights = insights.length > 0 ? insights : dummyInsights;

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Real-time suggestions based on your financial activity.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {currentInsights.map(insight => (
                        <div key={insight._id?.toString()} className="flex items-start space-x-3">
                            <Lightbulb className="h-5 w-5 mt-1 text-amber-500 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{insight.title}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}