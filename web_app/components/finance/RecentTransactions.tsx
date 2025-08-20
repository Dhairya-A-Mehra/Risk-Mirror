import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Update the import path below if your Table components are located elsewhere
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/models/transaction";

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
        <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
          <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">🧾</div>
            <h3 className="text-xl font-bold mb-3 text-white">Recent Transactions</h3>
            <ul className="divide-y divide-blue-900 w-full">
              {transactions.map((tx, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span className="font-medium text-white">{tx.description}</span>
                  <span className="text-sm text-cyan-400">{tx.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
  );
}