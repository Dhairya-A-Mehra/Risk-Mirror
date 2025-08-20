import { ObjectId } from 'mongodb';

export interface Decision {
  step: number;
  decision: string;
}
export interface SimulationLog {
  _id?: ObjectId;
  userId: ObjectId;
  simulationName: string;
  completedAt: Date;
  decisions: Decision[];
  outcomeScore: number;
  riskIndexChange: number;
}