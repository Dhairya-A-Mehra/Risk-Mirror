// web_app/components/dashboard/RiskHealthMeterChart.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RiskHistory } from "@/models/riskHistory";

// This component expects a prop 'data' which is an array of risk history objects
interface ChartProps { 
  data: Pick<RiskHistory, 'snapshotDate' | 'riskScores'>[] | undefined;
}

export function RiskHealthMeterChart({ data }: ChartProps) {
  // Add a defensive check for undefined or empty data
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Health Meter</CardTitle>
          <CardDescription>Your overall risk score over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 w-full flex items-center justify-center">
          <p className="text-slate-500">No historical data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }

  const formattedData = data.map(item => ({
    date: new Date(item.snapshotDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Overall: item.riskScores.overallScore,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>Risk Health Meter</CardTitle>
          <CardDescription>Your overall risk score over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent className="h-80 w-full pt-4">
          <ResponsiveContainer>
            <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
              />
              <Line type="monotone" dataKey="Overall" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}