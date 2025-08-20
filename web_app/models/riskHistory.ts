import { ObjectId } from 'mongodb';
import { DynamicRiskDNA } from './user'; // Reuse the interface

export interface RiskHistory {
  _id?: ObjectId;
  userId: ObjectId;
  snapshotDate: Date;
  riskScores: DynamicRiskDNA;
}