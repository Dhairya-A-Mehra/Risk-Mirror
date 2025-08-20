// web_app/models/explainabilityLog.ts
import { ObjectId } from 'mongodb';

export interface FeatureImportance {
  feature: string;
  value: number; // SHAP value or LIME weight
}

export interface ExplainabilityLog {
  _id?: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  decisionType: string;
  decisionSummary: string;
  featureImportances: FeatureImportance[];
}