// web_app/models/lifestylePage.ts

import { ExplainabilityLog } from './explainabilityLog';
import { Insight } from './insight';
import { CalendarEvent } from './dashboard';
import { Plan } from './plan';
import { Transaction } from './transaction';

// --- NEW Interfaces for Lifestyle Page ---

// For Notion-style routine management
export interface RoutineTask {
  id: string;
  text: string;
  completed: boolean;
  linkedEventId?: string; // Optional link to a Google Calendar event
}

export interface Routine {
  id: string;
  title: string; // e.g., "Morning Routine", "Weekly Review"
  tasks: RoutineTask[];
}

// For Relationship Health Dashboard
export interface RelationshipMilestone {
  personName: string;
  eventName: string; // "Birthday", "Anniversary"
  date: Date;
  daysRemaining: number;
}

// For AI-Driven Lifestyle Forecasting
export interface GoalSimulation {
  title: string; // e.g., "Buying a new car"
  impactOnScore: number; // e.g., -5 or +10
  feasibility: 'high' | 'medium' | 'low';
}

// --- Main Data Contract for the Lifestyle Page ---

export interface LifestylePageData {
  // The user's behavioral score from their Risk DNA
  lifestyleScore: number;

  // Explainability for the lifestyle score
  latestLifestyleScoreExplanation: ExplainabilityLog | null;

  // Personalized recommendations
  lifestyleRecommendations: Insight[];
  
  // Anomaly and fraud detection alerts
  spendingAnomalies: Pick<Transaction, 'description' | 'amount' | 'transactionDate' | 'fraudScore'>[];

  // Google Calendar Integration
  googleCalendarEvents: CalendarEvent[];

  // 3-Month Action Plan (Lifestyle focused)
  activeLifestylePlan: Plan | null;

  // Notion-style Routine Management
  routines: Routine[];

  // Relationship Health Dashboard
  relationshipMilestones: RelationshipMilestone[];

  // Long-Term Behavioral Tracking Insights
  behavioralInsights: Insight[];

  // AI-Driven Lifestyle Forecasting
  lifestyleForecast: {
    burnoutRiskPercentage: number;
    goalSimulations: GoalSimulation[];
  };
}