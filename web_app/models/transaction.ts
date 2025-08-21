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
  fraudScore?: number; 
}
