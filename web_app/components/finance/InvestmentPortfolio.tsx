import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FinancialInstrument } from "@/models/financialInstrument";
import { ArrowUpRight, ArrowDownRight, Minus, AlertTriangle } from 'lucide-react';

export function InvestmentPortfolio({ portfolio }: { portfolio: FinancialInstrument[] }) {
  const getPredictionIcon = (dir?: string) => {
    if (dir === 'up') return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (dir === 'down') return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-slate-500" />;
  };
    return (
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">📊</div>
          <h3 className="text-xl font-bold mb-3 text-white">Investment Portfolio</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Symbol</TableHead>
                <TableHead className="text-white">Value</TableHead>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Prediction</TableHead>
                <TableHead className="text-white">Sentiment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((p, i) => (
                <TableRow key={p.symbol}>
                  <TableCell className="font-medium text-white">{p.symbol}</TableCell>
                  <TableCell className="text-cyan-400">${p.currentValue.toLocaleString()}</TableCell>
                  <TableCell className="text-white">{p.quantity}</TableCell>
                  <TableCell className="flex items-center gap-1 text-white">
                    {getPredictionIcon(p.latestPrediction?.predictedDirection)}
                    <span className="text-xs text-gray-300">{(p.latestPrediction?.historicalAccuracy ?? 0) * 100}%</span>
                  </TableCell>
                  <TableCell>
                    {p.relatedSentimentSignals && p.relatedSentimentSignals[0] && (
                      <div className="flex items-center gap-1 text-xs text-amber-400"><AlertTriangle className="h-4 w-4" /> {p.relatedSentimentSignals[0].summary}</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}