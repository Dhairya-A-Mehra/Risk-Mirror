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
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
        <CardDescription>Real-time predictions and sentiment signals for your holdings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Value</TableHead><TableHead>Prediction</TableHead><TableHead>Sentiment</TableHead></TableRow></TableHeader>
          <TableBody>
            {portfolio.map(p => (
              <TableRow key={p.symbol}>
                <TableCell><div className="font-medium">{p.symbol}</div><div className="text-xs text-muted-foreground">{p.quantity} shares</div></TableCell>
                <TableCell>${p.currentValue.toLocaleString()}</TableCell>
                <TableCell className="flex items-center gap-1">{getPredictionIcon(p.latestPrediction?.predictedDirection)} <span className="text-xs text-muted-foreground">({(p.latestPrediction?.historicalAccuracy ?? 0) * 100}%)</span></TableCell>
                <TableCell>
                  {p.relatedSentimentSignals && p.relatedSentimentSignals[0] && (
                    <div className="flex items-center gap-1 text-xs"><AlertTriangle className="h-4 w-4 text-amber-500" /> {p.relatedSentimentSignals[0].summary}</div>
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