import { ObjectId } from 'mongodb';

export interface HealthInsurancePolicy {
  _id?: ObjectId;
  userId: ObjectId; 
  
  providerName: string; 
  policyNumber: string;
  policyType: string; 
  
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
  
  coverageAnalysis?: string;
  
  isArchived: boolean;
}
