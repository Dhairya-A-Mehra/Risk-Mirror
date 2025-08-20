// web_app/models/plan.ts
import { ObjectId } from 'mongodb';

export interface MonthlyGoal {
  month: 1 | 2 | 3;
  description: string;
  target: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

export interface Plan {
  _id?: ObjectId;
  userId: ObjectId;
  planTitle: string;
  status: 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  monthlyGoals: MonthlyGoal[];
}