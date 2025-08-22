// web_app/components/survey/LifestyleStep.tsx

import React from 'react';
import { SurveySubmission } from '@/models/survey';
import { FormLabel, FormField, FormSelect } from './FormElements';

// Define the props interface
interface LifestyleStepProps {
  data: Omit<SurveySubmission, '_id' | 'userId' | 'submittedAt'>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const LifestyleStep: React.FC<LifestyleStepProps> = ({ data, setData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      lifestyle: {
        ...prevData.lifestyle,
        // The value from a select might need to be parsed if it's a number
        [name]: name === 'workLifeBalance' ? parseInt(value) : value,
      },
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Lifestyle</h2>
      
      <div className="space-y-4">
        <FormField>
          <FormLabel>On a scale of 1 to 5, how would you rate your current work-life balance?</FormLabel>
          <FormSelect 
            name="workLifeBalance" 
            value={data.lifestyle.workLifeBalance} 
            onChange={handleChange}
          >
            <option value={1}>1 (Heavily work-focused)</option>
            <option value={2}>2 (Leaning towards work)</option>
            <option value={3}>3 (Balanced)</option>
            <option value={4}>4 (Leaning towards life)</option>
            <option value={5}>5 (Heavily life-focused)</option>
          </FormSelect>
        </FormField>

        <FormField>
          <FormLabel>How often do you typically engage in social activities with friends or family?</FormLabel>
          <FormSelect 
            name="socialFrequency" 
            value={data.lifestyle.socialFrequency} 
            onChange={handleChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">A few times a week</option>
            <option value="monthly">A few times a month</option>
            <option value="rarely">Rarely</option>
          </FormSelect>
        </FormField>
      </div>
    </div>
  );
};

export default LifestyleStep;