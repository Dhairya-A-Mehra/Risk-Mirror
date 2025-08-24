// web_app/models/prediction.ts
import { ObjectId } from 'mongodb';

export interface Prediction {
  _id?: ObjectId;
  userId: ObjectId; // Indexed
  createdAt: Date;
  
  agent: 'Financial Agent' | 'Health Agent' | 'Lifestyle Agent';
  
  predictionDetails: {
    type: string; // e.g., 'stock_movement', 'risk_spike'
    subject: string;
    predictedValue: string;
    confidence: number;
  };

  actualOutcome?: {
    value: string;
    loggedAt: Date;
  };

  isCorrect?: boolean;
}