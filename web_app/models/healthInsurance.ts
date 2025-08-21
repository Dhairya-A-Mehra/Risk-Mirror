// web_app/models/healthInsurance.ts
import { ObjectId } from 'mongodb';

export interface HealthInsurancePolicy {
  _id?: ObjectId;
  userId: ObjectId; // Indexed
  
  providerName: string; // e.g., "Aetna", "Blue Cross"
  policyNumber: string;
  policyType: string; // e.g., "PPO", "HMO"
  
  coverageDetails: {
    annualDeductible: number;
    outOfPocketMax: number;
    primaryCareCopay: number;
  };

  premium: {
    amount: number;
    frequency: 'monthly' | 'annually';
    nextDueDate: Date;
  };
  
  // AI-generated summary of what's covered
  coverageAnalysis?: string;
  
  isArchived: boolean;
}