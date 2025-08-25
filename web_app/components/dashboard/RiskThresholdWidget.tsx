'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User } from '@/models/user';

export function RiskThresholdWidget({ user }: { user: any }) {
  const [threshold, setThreshold] = useState(user?.riskThreshold ?? 50);
  const router = useRouter();

  const handleUpdateThreshold = async () => {
    try {
      const response = await fetch('/api/user/threshold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskThreshold: threshold }),
      });
      if (response.ok) {
        alert('Threshold updated successfully!');
        router.refresh();
      } else {
        alert('Failed to update threshold.');
      }
    } catch (error) {
      console.error('Failed to update threshold:', error);
      alert('Failed to update threshold.');
    }
  };

  const streak = user?.gamification?.streak ?? { current: 0, longest: 0 };
  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">Risk Threshold & Streak</CardTitle>
        <CardDescription className="text-gray-300">Set your minimum risk score and track your streak.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-sm text-white">Current Streak: {streak.current} days</p>
          <p className="text-sm text-white">Longest Streak: {streak.longest} days</p>
        </div>
        <div className="space-y-4">
          <Input
            type="number"
            min="0"
            max="100"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            placeholder="Set minimum risk score (0-100)"
            className="text-white placeholder:text-gray-300 bg-gray-900 border-blue-400/30 focus:ring-cyan-400"
          />
          <Button
            onClick={handleUpdateThreshold}
            variant="outline"
            className="border-cyan-400 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold hover:bg-cyan-700/80 hover:text-white transition"
          >
            Update Threshold
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}