import React from 'react';
import { FormLabel, FormField, FormSelect } from './FormElements';

const PsychometricStep = ({ data, setData }: any) => {
    const handleAnswerChange = (questionId: string, value: number) => {
        const otherAnswers = data.psychometricAnswers.filter((a: any) => a.questionId !== questionId);
        setData({ ...data, psychometricAnswers: [...otherAnswers, { questionId, answerValue: value }] });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Understanding You</h2>
            <FormField>
                <FormLabel>When faced with a risky but potentially rewarding investment, you are more likely to:</FormLabel>
                <FormSelect 
                    id="risk-propensity"
                    onChange={e => handleAnswerChange('risk-propensity', parseInt(e.target.value))}
                >
                    <option value={1}>Invest heavily</option>
                    <option value={2}>Invest a small amount</option>
                    <option value={3}>Wait and see</option>
                    <option value={4}>Avoid it</option>
                </FormSelect>
            </FormField>
            {/* Add more psychometric questions here */}
        </div>
    );
};

export default PsychometricStep;