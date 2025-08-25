import React from 'react';

export function AIPlanWidget({ plan }: { plan?: { plan: string, startDate?: string, endDate?: string } }) {
  return (
    <div className="card bg-black/30 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Your 3-Month AI Plan</h2>
      <p>{plan?.plan}</p>
      <span className="text-xs text-gray-400">{plan?.startDate} - {plan?.endDate}</span>
    </div>
  );
}
