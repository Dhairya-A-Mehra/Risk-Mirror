// web_app/models/financialInstrument.ts
import { ObjectId } from 'mongodb';

interface Prediction {
  predictedDirection: 'up' | 'down' | 'stable';
  confidence: number;
  timestamp: Date;
  historicalAccuracy: number; // Accuracy of this type of prediction over time
}

export interface FinancialInstrument {
  _id?: ObjectId;
  userId: ObjectId; // Indexed
  type: 'stock' | 'crypto' | 'mutual_fund';
  symbol: string; // e.g., "AAPL", "BTC-USD"
  quantity: number;
  averageCost: number;
  currentValue: number;
  lastUpdated: Date;
  
  // Feature 3: Real-Time Stock Predictions
  latestPrediction?: Prediction;
  
  // Feature 8 & 11: External Sentiment
  relatedSentimentSignals?: {
    source: 'twitter' | 'news';
    sentiment: 'positive' | 'negative' | 'neutral';
    summary: string;
    timestamp: Date;
  }[];
}