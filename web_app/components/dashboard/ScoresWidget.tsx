import React from 'react';

export function ScoresWidget({ scores }: { scores: Array<{ date: string, score: number }> }) {
  return (
    <div className="card bg-black/30 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Your Survey Scores</h2>
      <ul>
        {scores.map(s => (
          <li key={s.date} className="mb-1">{new Date(s.date).toLocaleDateString()}: <span className="font-semibold">{s.score}</span></li>
        ))}
      </ul>
    </div>
  );
}
