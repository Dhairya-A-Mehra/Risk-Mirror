// web_app/models/dashboard.ts
import { User, DynamicRiskDNA } from './user';
import { Plan } from './plan';
import { ExplainabilityLog } from './explainabilityLog';
import { Insight } from './insight';
import { RiskHistory } from './riskHistory';

// Defines the structure for a single Google Calendar event
export interface CalendarEvent {
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

// This is the definitive data contract for the entire dashboard.
// It contains every piece of information the frontend needs from the backend.
export interface DashboardData {
  // The user object, containing non-sensitive profile and gamification info
  user: {
    fullName: string;
    email: string;
    profile: User['profile'];
    gamification: User['gamification'];
  };
  
  // The complete, real-time risk profile
  riskDNA: DynamicRiskDNA;

  // The user's currently active 3-Month Financial Plan
  activePlan: Plan | null;

  // A list of the latest personalized insights
  insights: {
    recommendations: Insight[];
    emotionalROI: Insight[];
  };

  // The most recent explanation for the user's risk score
  latestRiskExplanation: ExplainabilityLog | null;

  // A list of upcoming Google Calendar events
  googleCalendarEvents: CalendarEvent[];
  
  // Historical data for the "Risk Health Meter" chart
  riskHistory: Pick<RiskHistory, 'snapshotDate' | 'riskScores'>[];

  // Calculated accuracy scores for the AI agents
  agentAccuracy: {
    financial: { total: number; correct: number; accuracy: number };
    health: { total: number; correct: number; accuracy: number };
  };
}