import { ObjectId } from 'mongodb';

interface Prediction {
  predictedDirection: 'up' | 'down' | 'stable';
  confidence: number;
  timestamp: Date;
  historicalAccuracy: number; 
}

export interface FinancialInstrument {
  _id?: ObjectId;
  userId: ObjectId; 
  type: 'stock' | 'crypto' | 'mutual_fund';
  symbol: string; 
  quantity: number;
  averageCost: number;
  currentValue: number;
  lastUpdated: Date;
  
  latestPrediction?: Prediction;
  
  relatedSentimentSignals?: {
    source: 'twitter' | 'news';
    sentiment: 'positive' | 'negative' | 'neutral';
    summary: string;
    timestamp: Date;
  }[];
}
