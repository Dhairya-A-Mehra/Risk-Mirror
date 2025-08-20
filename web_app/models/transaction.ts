// web_app/models/transaction.ts
import { ObjectId } from 'mongodb';

export interface Transaction {
  _id?: ObjectId;
  userId: ObjectId;
  amount: number;
  currency: string;
  description: string;
  category: string;
  vendor: string;
  transactionDate: Date;
  source: string;
  // Feature 10: Fraud Detection
  fraudScore?: number; // A score from 0.0 to 1.0, calculated by a Kafka consumer
}