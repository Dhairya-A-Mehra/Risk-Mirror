import React, { useState } from 'react';

export function DailyPulseCheck() {
  const [text, setText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // For demo, only text. Add image/voice upload as needed.
    const res = await fetch('/api/dashboard/emotional-pulse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: '', voiceUrl: '', text }),
    });
    const data = await res.json();
    setScore(data.score);
    setLoading(false);
  }

  return (
    <div className="card bg-black/30 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Daily Emotional Pulse Check</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea value={text} onChange={e => setText(e.target.value)} className="w-full p-2 rounded" placeholder="Type something..." />
        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded" disabled={loading}>Submit</button>
      </form>
      {score !== null && <p className="mt-2">Your emotional score: <span className="font-semibold">{score}</span></p>}
    </div>
  );
}
