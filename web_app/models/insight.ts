import { ObjectId } from 'mongodb';

export interface Insight {
  _id?: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  type: 'recommendation' | 'emotional_roi';
  title: string;
  description: string;
  isArchived: boolean;
}
