import { ObjectId } from 'mongodb';
import { DynamicRiskDNA } from './user'; 

export interface RiskHistory {
  _id?: ObjectId;
  userId: ObjectId;
  snapshotDate: Date;
  riskScores: DynamicRiskDNA;
}
