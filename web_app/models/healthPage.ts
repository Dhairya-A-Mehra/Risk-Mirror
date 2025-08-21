import { DynamicRiskDNA } from './user';
import { HealthInsurancePolicy } from './healthInsurance';
import { Insight } from './insight';
import { ExplainabilityLog } from './explainabilityLog';
import { Plan } from './plan'; 

export interface HealthPageData {
  wellnessScore: number;
  wealthScore: number;
  
  userCity?: string;

  insurancePolicies: HealthInsurancePolicy[];

  latestHealthInsights: Insight[];

  activeHealthPlan: Plan | null;

  latestHealthScoreExplanation: ExplainabilityLog | null;

  medicalExpenseForecast: number;
}
