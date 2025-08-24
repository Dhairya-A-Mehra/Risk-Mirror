import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Heart, Users, Shield, Zap } from 'lucide-react';

interface GoalStepProps {
    data: any;
    setData: (data: any) => void;
}

const goals = [
    {
        id: 'financial_stability',
        title: 'Financial Stability',
        description: 'Build a strong financial foundation and reduce debt',
        icon: <TrendingUp className="h-8 w-8" />,
        color: 'text-green-500'
    },
    {
        id: 'health_wellness',
        title: 'Health & Wellness',
        description: 'Improve physical and mental well-being',
        icon: <Heart className="h-8 w-8" />,
        color: 'text-red-500'
    },
    {
        id: 'lifestyle_balance',
        title: 'Lifestyle Balance',
        description: 'Achieve better work-life balance and relationships',
        icon: <Users className="h-8 w-8" />,
        color: 'text-blue-500'
    },
    {
        id: 'risk_management',
        title: 'Risk Management',
        description: 'Understand and manage life risks proactively',
        icon: <Shield className="h-8 w-8" />,
        color: 'text-purple-500'
    },
    {
        id: 'personal_growth',
        title: 'Personal Growth',
        description: 'Develop new skills and achieve personal goals',
        icon: <Zap className="h-8 w-8" />,
        color: 'text-yellow-500'
    }
];

const GoalStep: React.FC<GoalStepProps> = ({ data, setData }) => {
    const handleGoalSelect = (goalId: string) => {
        setData({
            ...data,
            primaryGoal: goalId
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">What's Your Primary Goal?</h2>
                <p className="text-gray-300">This helps us personalize your experience and recommendations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                    <Card
                        key={goal.id}
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${data.primaryGoal === goal.id
                            ? 'border-2 border-cyan-400 bg-cyan-900/20'
                            : 'border border-gray-600 bg-gray-800/50 hover:border-gray-500'
                            }`}
                        onClick={() => handleGoalSelect(goal.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center space-x-3">
                                <div className={`${goal.color}`}>
                                    {goal.icon}
                                </div>
                                <CardTitle className="text-lg text-white">{goal.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 text-sm">{goal.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {data.primaryGoal && (
                <div className="text-center mt-6">
                    <p className="text-cyan-400 font-semibold">
                        Selected: {goals.find(g => g.id === data.primaryGoal)?.title}
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoalStep;
