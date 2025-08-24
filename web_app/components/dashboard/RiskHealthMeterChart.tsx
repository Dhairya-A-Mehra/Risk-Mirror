'use client';

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RiskHistory } from "@/models/riskHistory";

interface ChartProps {
  data: Pick<RiskHistory, 'snapshotDate' | 'riskScores'>[] | undefined;
}

export function RiskHealthMeterChart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl h-full">
        <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">📈</div>
          <h3 className="text-xl font-bold mb-3 text-white">Risk Health Meter</h3>
          <p className="text-gray-300 flex-grow leading-relaxed text-sm mb-4">No historical data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map(item => ({
    date: new Date(item.snapshotDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Overall: item.riskScores.overallScore,
    Financial: item.riskScores.financialScore,
    Health: item.riskScores.healthScore,
    Behavioral: item.riskScores.behavioralScore,
  }));

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl h-full">
      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">📈</div>
        <h3 className="text-xl font-bold mb-3 text-white">Risk Health Meter</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip wrapperClassName="!bg-white !text-black !rounded-lg !shadow-lg" />
              <Line type="monotone" dataKey="Overall" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Financial" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Health" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Behavioral" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-gray-300 flex-grow leading-relaxed text-sm mt-2">Your risk scores over the last 30 days, influenced by user data and market news.</p>
      </CardContent>
    </Card>
  );
}