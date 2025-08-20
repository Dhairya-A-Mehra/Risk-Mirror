"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SpendingChartProps { data: { category: string; amount: number }[] }
export function SpendingChart({ data }: SpendingChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">💳</div>
        <h3 className="text-xl font-bold mb-3 text-white">Spending by Category</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip wrapperClassName="!bg-white !text-black !rounded-lg !shadow-lg" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}