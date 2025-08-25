import React from 'react';

export function ThresholdWidget({ threshold, streak }: { threshold: number, streak: number }) {
  return (
    <div className="card bg-black/30 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Threshold & Streak</h2>
      <p>Bare minimum score: <span className="font-semibold">{threshold}</span></p>
      <p>Streak: <span className="font-semibold">{streak} days</span></p>
    </div>
  );
}
