// web_app/components/survey/HealthStep.tsx

import React from 'react';
import { SurveySubmission } from '@/models/survey';
import { FormLabel, FormInput, FormField, FormSelect } from './FormElements';

// Define the props interface for type safety
interface HealthStepProps {
  data: Omit<SurveySubmission, '_id' | 'userId' | 'submittedAt'>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const HealthStep: React.FC<HealthStepProps> = ({ data, setData }) => {
  
  // Handles changes for any input in this step
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      health: {
        ...prevData.health,
        // Convert value to a number if the input type is number
        [name]: e.target.type === 'number' ? parseFloat(value) || 0 : value,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Health Habits</h2>
      
      <div className="space-y-4">
        <FormField>
          <FormLabel>On average, how many days per week do you engage in at least 30 minutes of physical activity?</FormLabel>
          <FormSelect 
            name="exerciseFrequency" 
            value={data.health.exerciseFrequency} 
            onChange={handleChange}
          >
            <option value={0}>0 days</option>
            <option value={1}>1 day</option>
            <option value={2}>2 days</option>
            <option value={3}>3 days</option>
            <option value={4}>4 days</option>
            <option value={5}>5 days</option>
            <option value={6}>6 days</option>
            <option value={7}>7 days</option>
          </FormSelect>
        </FormField>
        
        <FormField>
          <FormLabel>On a scale of 1 to 5, how would you rate the quality of your diet?</FormLabel>
          <FormSelect 
            name="dietQuality" 
            value={data.health.dietQuality} 
            onChange={handleChange}
          >
            <option value={1}>1 (Poor)</option>
            <option value={2}>2 (Below Average)</option>
            <option value={3}>3 (Average)</option>
            <option value={4}>4 (Good)</option>
            <option value={5}>5 (Excellent)</option>
          </FormSelect>
        </FormField>
        
        <FormField>
          <FormLabel>On average, how many hours of sleep do you get per night?</FormLabel>
          <FormInput 
            type="number" 
            name="sleepHoursPerNight" 
            value={data.health.sleepHoursPerNight} 
            onChange={handleChange} 
            placeholder="e.g., 7.5"
            min="0"
            max="16"
            step="0.5"
          />
        </FormField>
      </div>
    </div>
  );
};

export default HealthStep;