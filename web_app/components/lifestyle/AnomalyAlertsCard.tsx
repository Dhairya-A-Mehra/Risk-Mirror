import React from 'react';
import { Transaction } from '@/models/transaction';
import { AlertTriangle } from 'lucide-react';

const AnomalyAlertsCard = ({ anomalies }: { anomalies: Pick<Transaction, 'description' | 'amount' | 'fraudScore'>[] }) => (
  <div className="bg-red-600/30 border border-red-500 p-6 rounded-2xl shadow-lg">
    <h3 className="font-bold text-white mb-4 flex items-center text-lg">
      <AlertTriangle className="h-6 w-6 mr-2 text-red-400 drop-shadow" />
      <span className="text-white">Spending Anomaly Detected</span>
    </h3>
        <ul className="space-y-3">
          {anomalies.map((anomaly, i) => (
      <li key={i} className="text-base">
        <p className="text-white font-semibold text-base">{anomaly.description}</p>
        <p className="text-white">Amount: <span className="font-bold text-red-300">${anomaly.amount.toFixed(2)}</span> | Fraud Risk: <span className="font-bold text-red-400 bg-red-900/60 px-2 py-1 rounded">{((anomaly.fraudScore || 0) * 100).toFixed(0)}%</span></p>
      </li>
          ))}
        </ul>
    </div>
);

export default AnomalyAlertsCard;