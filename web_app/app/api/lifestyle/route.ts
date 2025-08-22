// web_app/app/api/lifestyle/route.ts

import { NextResponse } from 'next/server';
import { LifestylePageData } from '@/models/lifestylePage';

// This is a mock function to simulate fetching data from a database.
// In a real application, you would replace this with actual database queries.
const getLifestyleData = async (): Promise<LifestylePageData> => {
  const today = new Date();
  
  return {
    lifestyleScore: 78,

    latestLifestyleScoreExplanation: {
      userId: 'mock-user-id' as unknown as import('mongodb').ObjectId, // Replace with actual ObjectId in real usage
      createdAt: today,
      decisionType: 'Lifestyle Score Calculation',
      decisionSummary: 'Score increased due to consistent routine adherence and reduced anomalous spending this week.',
      featureImportances: [
        { feature: 'Routine Adherence', value: 0.45 },
        { feature: 'Anomalous Spending', value: -0.3 },
        { feature: 'Sleep Patterns', value: 0.25 },
      ],
    },

    lifestyleRecommendations: [
      { 
        type: 'recommendation', 
        title: 'Optimize Your Commute', 
        description: 'Your calendar shows heavy traffic during your commute. Try leaving 15 minutes earlier.',
        userId: 'mock-user-id' as unknown as import('mongodb').ObjectId,
        createdAt: today,
        isArchived: false
      },
      { 
        type: 'recommendation', 
        title: 'Plan Social Outings', 
        description: 'No social events are scheduled this week. Consider planning an activity to maintain social health.',
        userId: 'mock-user-id' as unknown as import('mongodb').ObjectId,
        createdAt: today,
        isArchived: false
      },
    ],

    spendingAnomalies: [
      { description: 'Unusually large purchase at "Luxury Goods Inc."', amount: 1250, transactionDate: new Date(today.setDate(today.getDate() - 2)), fraudScore: 0.85 },
    ],
    
    googleCalendarEvents: [
      { summary: 'Project Deadline', start: { dateTime: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString() }, end: { dateTime: new Date(today.getTime() + 3 * 60 * 60 * 1000).toISOString() } },
      { summary: 'Dentist Appointment', start: { dateTime: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString() }, end: { dateTime: new Date(today.getTime() + 25 * 60 * 60 * 1000).toISOString() } },
    ],

    activeLifestylePlan: {
      userId: 'mock-user-id' as unknown as import('mongodb').ObjectId, // Replace with actual ObjectId in real usage
      planTitle: 'Q3 Wellness Plan',
      category: 'lifestyle',
      status: 'active',
      startDate: new Date(),
      endDate: new Date(today.setMonth(today.getMonth() + 3)),
      monthlyGoals: [
        { month: 1, description: 'Establish consistent morning routine', target: 'Complete 5/7 days', status: 'on-track' },
        { month: 2, description: 'Read 2 books', target: 'Finish by end of month', status: 'on-track' },
        { month: 3, description: 'Plan a weekend trip', target: 'Book by the 15th', status: 'on-track' },
      ],
    },

    routines: [
      { id: 'morning', title: 'Morning Routine', tasks: [{ id: 'm1', text: 'Meditate for 10 minutes', completed: true }, { id: 'm2', text: 'Plan top 3 priorities for the day', completed: false }] },
      { id: 'evening', title: 'Evening Wind-down', tasks: [{ id: 'e1', text: 'No screens 30 mins before bed', completed: false }, { id: 'e2', text: 'Read for 15 minutes', completed: false }] },
    ],
    
    relationshipMilestones: [
      { personName: 'Alex', eventName: 'Birthday', date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), daysRemaining: 10 },
      { personName: 'Sarah', eventName: 'Anniversary', date: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000), daysRemaining: 25 },
    ],

    behavioralInsights: [
        { 
          type: 'recommendation', 
          title: 'Late-Night Spending Pattern', 
          description: 'We noticed a pattern of impulsive spending on food delivery services after 9 PM on weekdays.',
          userId: 'mock-user-id' as unknown as import('mongodb').ObjectId,
          createdAt: today,
          isArchived: false
        }
    ],

    lifestyleForecast: {
      burnoutRiskPercentage: 25,
      goalSimulations: [
        { title: 'Taking a week-long vacation', impactOnScore: 12, feasibility: 'high' },
        { title: 'Buying a new car', impactOnScore: -8, feasibility: 'medium' },
      ],
    },
  };
};


export async function GET() {
  try {
    const data = await getLifestyleData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch lifestyle data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}