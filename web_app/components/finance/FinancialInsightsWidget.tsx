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
            <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">💡</div>
                    <h3 className="text-xl font-bold mb-3 text-white">Financial Insights</h3>
                    <ul className="w-full space-y-4">
                        {currentInsights.map((insight, i) => (
                            <li key={i} className="text-left">
                                <div className="font-semibold text-white text-base mb-1">{insight.title}</div>
                                <div className="text-sm text-cyan-300 leading-relaxed">{insight.description}</div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
    );
}