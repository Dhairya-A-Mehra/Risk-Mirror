import { User, DynamicRiskDNA } from './user';
import { Plan } from './plan';
import { ExplainabilityLog } from './explainabilityLog';
import { Insight } from './insight';
import { RiskHistory } from './riskHistory';

export interface CalendarEvent {
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export interface DashboardData {
  user: {
    fullName: string;
    email: string;
    profile: User['profile'];
    gamification: User['gamification'];
  };
  
  riskDNA: DynamicRiskDNA;

  activePlan: Plan | null;

  insights: {
    recommendations: Insight[];
    emotionalROI: Insight[];
  };

  latestRiskExplanation: ExplainabilityLog | null;

  googleCalendarEvents: CalendarEvent[];
  
  riskHistory: Pick<RiskHistory, 'snapshotDate' | 'riskScores'>[];

  agentAccuracy: {
    financial: { total: number; correct: number; accuracy: number };
    health: { total: number; correct: number; accuracy: number };
  };
}
