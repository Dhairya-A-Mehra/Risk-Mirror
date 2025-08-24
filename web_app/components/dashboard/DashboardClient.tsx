'use client';

import { useState } from 'react';
import { DashboardData } from '@/models/dashboard';
import DynamicDNAGraph from './DynamicDNAGraph';
import { RiskThresholdWidget } from './RiskThresholdWidget';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DashboardClientProps {
  initialData: DashboardData;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const [data] = useState(initialData);

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Risk DNA Graph */}
      <DynamicDNAGraph riskDNA={data.riskDNA} />

      {/* Risk Threshold & Streak */}
      <RiskThresholdWidget user={data.user} />

      {/* Active Plan */}
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Active Financial Plan</CardTitle>
          <CardDescription className="text-gray-300">
            {data.activePlan ? 'Your current 3-month plan' : 'No active plan'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {data.activePlan ? (
            <div className="space-y-4">
              <h4 className="text-white font-semibold">{data.activePlan.planTitle}</h4>
              <ul className="space-y-2">
                {Array.isArray(data.activePlan.monthlyGoals) && data.activePlan.monthlyGoals.length > 0 ? (
                  data.activePlan.monthlyGoals.map((goal, index) => (
                    <li key={`goal-${index}`} className="text-sm text-gray-300">
                      Month {goal.month}: {goal.description} - Target: {goal.target} ({goal.status})
                    </li>
                  ))
                ) : (
                  <p className="text-gray-300">No goals available</p>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-gray-300">No active plan available</p>
          )}
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Insights</CardTitle>
          <CardDescription className="text-gray-300">Recommendations and Emotional ROI</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Recommendations</h4>
            {Array.isArray(data.insights.recommendations) && data.insights.recommendations.length > 0 ? (
              data.insights.recommendations.map((insight, index) => (
                <div key={`rec-${index}`} className="text-sm text-gray-300">
                  <strong>{insight.title}</strong>: {insight.description}
                </div>
              ))
            ) : (
              <p className="text-gray-300">No recommendations available</p>
            )}
            <h4 className="text-white font-semibold mt-4">Emotional ROI</h4>
            {Array.isArray(data.insights.emotionalROI) && data.insights.emotionalROI.length > 0 ? (
              data.insights.emotionalROI.map((insight, index) => (
                <div key={`roi-${index}`} className="text-sm text-gray-300">
                  <strong>{insight.title}</strong>: {insight.description}
                </div>
              ))
            ) : (
              <p className="text-gray-300">No emotional ROI insights available</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Google Calendar Events */}
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Upcoming Events</CardTitle>
          <CardDescription className="text-gray-300">Your Google Calendar</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Calendar mode="single" className="rounded-md border border-blue-400/30" />
          <div className="mt-4 space-y-2">
            {Array.isArray(data.googleCalendarEvents) && data.googleCalendarEvents.length > 0 ? (
              data.googleCalendarEvents.map((event, index) => (
                <div key={`event-${index}`} className="text-sm text-gray-300">
                  {event.summary} - {format(new Date(event.start.date || event.start.dateTime || new Date()), 'PPP')}
                </div>
              ))
            ) : (
              <p className="text-gray-300">No upcoming events</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Agent Accuracy */}
      <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Agent Accuracy</CardTitle>
          <CardDescription className="text-gray-300">Prediction performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white">Financial Agent</p>
              <p className="text-sm text-gray-300">
                Accuracy: {(data.agentAccuracy.financial.accuracy * 100).toFixed(2)}% ({data.agentAccuracy.financial.correct}/{data.agentAccuracy.financial.total})
              </p>
            </div>
            <div>
              <p className="text-sm text-white">Health Agent</p>
              <p className="text-sm text-gray-300">
                Accuracy: {(data.agentAccuracy.health.accuracy * 100).toFixed(2)}% ({data.agentAccuracy.health.correct}/{data.agentAccuracy.health.total})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}