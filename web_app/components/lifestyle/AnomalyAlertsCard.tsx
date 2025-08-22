import React from 'react';
import { Transaction } from '@/models/transaction';
import { AlertTriangle } from 'lucide-react';

const AnomalyAlertsCard = ({ anomalies }: { anomalies: Pick<Transaction, 'description' | 'amount' | 'fraudScore'>[] }) => (
    <div className="bg-yellow-500/10 border border-yellow-400/30 p-6 rounded-2xl shadow-lg">
        <h3 className="font-bold text-white mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
            Spending Anomaly Detected
        </h3>
        <ul className="space-y-3">
          {anomalies.map((anomaly, i) => (
            <li key={i} className="text-sm">
                <p className="text-slate-200 font-semibold">{anomaly.description}</p>
                <p className="text-slate-400">Amount: ${anomaly.amount.toFixed(2)} | Fraud Risk: <span className="text-yellow-400">{((anomaly.fraudScore || 0) * 100).toFixed(0)}%</span></p>
            </li>
          ))}
        </ul>
    </div>
);

export default AnomalyAlertsCard;