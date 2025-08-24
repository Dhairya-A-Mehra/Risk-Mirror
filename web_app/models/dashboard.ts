import { User } from './user';
import { Plan } from './plan';
import { ExplainabilityLog } from './explainabilityLog';
import { Insight } from './insight';
import { RiskHistory } from './riskHistory';
import { Prediction } from './prediction';

export interface CalendarEvent {
  id?: string;
  summary: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
}

export interface AgentAccuracy {
  financial: { total: number; correct: number; accuracy: number };
  health: { total: number; correct: number; accuracy: number };
}

export interface DashboardData {
  user: Pick<User, 'fullName' | 'email' | 'profile' | 'gamification' | 'riskThreshold'>;
  riskDNA: User['dynamicRiskDNA'];
  activePlan: Plan | null;
  insights: {
    recommendations: Insight[];
    emotionalROI: Insight[];
  };
  latestRiskExplanation: ExplainabilityLog | null;
  googleCalendarEvents: CalendarEvent[];
  riskHistory: RiskHistory[];
  agentAccuracy: AgentAccuracy;
}