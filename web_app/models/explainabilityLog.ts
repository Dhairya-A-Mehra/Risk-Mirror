import { ObjectId } from 'mongodb';

export interface FeatureImportance {
  feature: string;
  value: number; 
}

export interface ExplainabilityLog {
  _id?: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  decisionType: string;
  decisionSummary: string;
  featureImportances: FeatureImportance[];
}
