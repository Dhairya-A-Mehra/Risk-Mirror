// web_app/models/healthPage.ts
import { DynamicRiskDNA } from './user';
import { HealthInsurancePolicy } from './healthInsurance';
import { Insight } from './insight';
import { ExplainabilityLog } from './explainabilityLog';
import { Plan } from './plan'; // Assuming a health plan has a similar structure

// This is the full data payload for the Health page
export interface HealthPageData {
  wellnessScore: number;
  wealthScore: number;
  
  // For "Nearby Hospitals" feature
  userCity?: string;

  // For "Health Insurance Module"
  insurancePolicies: HealthInsurancePolicy[];

  // For personalized recommendations
  latestHealthInsights: Insight[];

  // For "3-Month Action Plan" (health-focused)
  activeHealthPlan: Plan | null;

  // For SHAP/LIME explainability of the health score
  latestHealthScoreExplanation: ExplainabilityLog | null;

  // For "Medical Expense Forecasting"
  medicalExpenseForecast: number;
}