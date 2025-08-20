import { ObjectId } from 'mongodb';

export interface Goal {
  goalId: ObjectId;
  description: string;
  targetAmount: number;
  currentAmount: number;
  status: 'on-track' | 'at-risk' | 'completed';
}
export interface WeeklyTask {
  week: number;
  task: string;
  completed: boolean;
}
export interface Plan {
  _id?: ObjectId;
  userId: ObjectId;
  planType: string;
  status: 'in-progress' | 'completed' | 'archived';
  startDate: Date;
  endDate: Date;
  goals: Goal[];
  weeklyTasks: WeeklyTask[];
}