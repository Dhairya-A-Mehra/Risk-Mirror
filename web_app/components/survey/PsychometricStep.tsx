import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface PsychometricStepProps {
    data: any;
    setData: (data: any) => void;
}

const PsychometricStep: React.FC<PsychometricStepProps> = ({ data, setData }) => {
    const updatePsychometricData = (field: string, value: any) => {
        setData({
            ...data,
            psychometric: {
                ...data.psychometric,
                [field]: value
            }
        });
    };

    const riskToleranceLevels = [
        'Very Conservative - I prefer guaranteed returns with minimal risk',
        'Conservative - I prefer low-risk investments with steady returns',
        'Moderate - I can handle some risk for better returns',
        'Aggressive - I am comfortable with higher risk for higher returns',
        'Very Aggressive - I seek maximum returns and can handle significant risk'
    ];

    const decisionMakingStyles = [
        'Analytical - I carefully analyze all options before deciding',
        'Intuitive - I trust my gut feeling and instincts',
        'Consultative - I seek advice from others before deciding',
        'Impulsive - I make quick decisions based on immediate feelings',
        'Cautious - I take time to consider all possibilities'
    ];

    const stressResponses = [
        'I become more focused and productive',
        'I tend to withdraw and need time alone',
        'I seek support from friends and family',
        'I become irritable and short-tempered',
        'I try to solve the problem immediately',
        'I avoid the situation temporarily'
    ];

    const financialGoals = [
        'Building an emergency fund',
        'Saving for retirement',
        'Buying a home',
        'Paying off debt',
        'Investing for growth',
        'Starting a business',
        'Travel and experiences',
        'Education and skills',
        'Supporting family',
        'Charitable giving'
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Psychological Assessment</h2>
                <p className="text-gray-300">Help us understand your personality and decision-making style</p>
            </div>

            {/* Investment Psychology */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Investment Psychology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="riskTolerance" className="text-white">Risk Tolerance Level</Label>
                        <Select
                            value={data.psychometric?.riskTolerance || ''}
                            onValueChange={(value) => updatePsychometricData('riskTolerance', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select your risk tolerance" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                {riskToleranceLevels.map((level) => (
                                    <SelectItem key={level} value={level} className="text-white">
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="investmentExperience" className="text-white">Investment Experience</Label>
                        <Select
                            value={data.psychometric?.investmentExperience || ''}
                            onValueChange={(value) => updatePsychometricData('investmentExperience', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="none" className="text-white">No experience - Complete beginner</SelectItem>
                                <SelectItem value="beginner" className="text-white">Beginner - Some basic knowledge</SelectItem>
                                <SelectItem value="intermediate" className="text-white">Intermediate - Regular investor</SelectItem>
                                <SelectItem value="advanced" className="text-white">Advanced - Experienced investor</SelectItem>
                                <SelectItem value="expert" className="text-white">Expert - Professional level</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="investmentGoals" className="text-white">Primary Investment Goals</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {financialGoals.map((goal) => (
                                <div key={goal} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={goal}
                                        checked={data.psychometric?.investmentGoals?.includes(goal) || false}
                                        onCheckedChange={(checked) => {
                                            const currentGoals = data.psychometric?.investmentGoals || [];
                                            const newGoals = checked
                                                ? [...currentGoals, goal]
                                                : currentGoals.filter((g: string) => g !== goal);
                                            updatePsychometricData('investmentGoals', newGoals);
                                        }}
                                    />
                                    <Label htmlFor={goal} className="text-white text-sm">{goal}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Decision Making */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Decision Making Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="decisionStyle" className="text-white">How do you typically make important decisions?</Label>
                        <Select
                            value={data.psychometric?.decisionStyle || ''}
                            onValueChange={(value) => updatePsychometricData('decisionStyle', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select your decision style" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                {decisionMakingStyles.map((style) => (
                                    <SelectItem key={style} value={style} className="text-white">
                                        {style}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="stressResponse" className="text-white">How do you typically respond to stress?</Label>
                        <Select
                            value={data.psychometric?.stressResponse || ''}
                            onValueChange={(value) => updatePsychometricData('stressResponse', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select your stress response" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                {stressResponses.map((response) => (
                                    <SelectItem key={response} value={response} className="text-white">
                                        {response}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="decisionTime" className="text-white">How long do you typically take to make important decisions?</Label>
                        <Select
                            value={data.psychometric?.decisionTime || ''}
                            onValueChange={(value) => updatePsychometricData('decisionTime', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select decision time" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="immediate" className="text-white">Immediately - I decide quickly</SelectItem>
                                <SelectItem value="hours" className="text-white">Hours - I think about it briefly</SelectItem>
                                <SelectItem value="days" className="text-white">Days - I need time to consider</SelectItem>
                                <SelectItem value="weeks" className="text-white">Weeks - I research thoroughly</SelectItem>
                                <SelectItem value="months" className="text-white">Months - I take my time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Personality Traits */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Personality Traits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="optimism" className="text-white">How optimistic are you about the future?</Label>
                        <Select
                            value={data.psychometric?.optimism || ''}
                            onValueChange={(value) => updatePsychometricData('optimism', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select optimism level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_pessimistic" className="text-white">Very Pessimistic</SelectItem>
                                <SelectItem value="pessimistic" className="text-white">Pessimistic</SelectItem>
                                <SelectItem value="neutral" className="text-white">Neutral</SelectItem>
                                <SelectItem value="optimistic" className="text-white">Optimistic</SelectItem>
                                <SelectItem value="very_optimistic" className="text-white">Very Optimistic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="patience" className="text-white">How patient are you with long-term goals?</Label>
                        <Select
                            value={data.psychometric?.patience || ''}
                            onValueChange={(value) => updatePsychometricData('patience', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select patience level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_impatient" className="text-white">Very Impatient - I want results now</SelectItem>
                                <SelectItem value="impatient" className="text-white">Impatient - I prefer quick results</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate - I can wait for good results</SelectItem>
                                <SelectItem value="patient" className="text-white">Patient - I'm willing to wait</SelectItem>
                                <SelectItem value="very_patient" className="text-white">Very Patient - I think long-term</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="selfControl" className="text-white">How would you rate your self-control?</Label>
                        <Select
                            value={data.psychometric?.selfControl || ''}
                            onValueChange={(value) => updatePsychometricData('selfControl', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select self-control level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_low" className="text-white">Very Low - I often act impulsively</SelectItem>
                                <SelectItem value="low" className="text-white">Low - I sometimes struggle with control</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate - I have decent control</SelectItem>
                                <SelectItem value="high" className="text-white">High - I usually control my impulses</SelectItem>
                                <SelectItem value="very_high" className="text-white">Very High - I have excellent self-control</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Financial Behavior */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Financial Behavior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="spendingHabits" className="text-white">How would you describe your spending habits?</Label>
                        <Select
                            value={data.psychometric?.spendingHabits || ''}
                            onValueChange={(value) => updatePsychometricData('spendingHabits', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select spending habits" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_frugal" className="text-white">Very Frugal - I spend very little</SelectItem>
                                <SelectItem value="frugal" className="text-white">Frugal - I'm careful with money</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate - I balance spending and saving</SelectItem>
                                <SelectItem value="spendthrift" className="text-white">Spendthrift - I enjoy spending money</SelectItem>
                                <SelectItem value="very_spendthrift" className="text-white">Very Spendthrift - I spend freely</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="savingBehavior" className="text-white">How do you approach saving money?</Label>
                        <Select
                            value={data.psychometric?.savingBehavior || ''}
                            onValueChange={(value) => updatePsychometricData('savingBehavior', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select saving behavior" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="automatic" className="text-white">Automatic - I save before spending</SelectItem>
                                <SelectItem value="planned" className="text-white">Planned - I set aside money regularly</SelectItem>
                                <SelectItem value="occasional" className="text-white">Occasional - I save when I can</SelectItem>
                                <SelectItem value="rarely" className="text-white">Rarely - I save infrequently</SelectItem>
                                <SelectItem value="never" className="text-white">Never - I don't save at all</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="financialAnxiety" className="text-white">How anxious do you feel about financial matters?</Label>
                        <Select
                            value={data.psychometric?.financialAnxiety || ''}
                            onValueChange={(value) => updatePsychometricData('financialAnxiety', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select anxiety level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_low" className="text-white">Very Low - I'm very confident</SelectItem>
                                <SelectItem value="low" className="text-white">Low - I'm generally confident</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate - I have some concerns</SelectItem>
                                <SelectItem value="high" className="text-white">High - I worry about money</SelectItem>
                                <SelectItem value="very_high" className="text-white">Very High - I'm very anxious</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Life Values */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Life Values & Priorities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="lifeValues" className="text-white">What are your top life priorities? (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                                'Family & Relationships',
                                'Career & Success',
                                'Health & Wellness',
                                'Financial Security',
                                'Personal Growth',
                                'Community & Service',
                                'Adventure & Travel',
                                'Creativity & Arts',
                                'Education & Learning',
                                'Spirituality & Faith'
                            ].map((value) => (
                                <div key={value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={value}
                                        checked={data.psychometric?.lifeValues?.includes(value) || false}
                                        onCheckedChange={(checked) => {
                                            const currentValues = data.psychometric?.lifeValues || [];
                                            const newValues = checked
                                                ? [...currentValues, value]
                                                : currentValues.filter((v: string) => v !== value);
                                            updatePsychometricData('lifeValues', newValues);
                                        }}
                                    />
                                    <Label htmlFor={value} className="text-white text-sm">{value}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="lifePhilosophy" className="text-white">What's your life philosophy or motto?</Label>
                        <Textarea
                            id="lifePhilosophy"
                            placeholder="e.g., 'Live in the moment', 'Plan for the future', 'Help others', etc."
                            value={data.psychometric?.lifePhilosophy || ''}
                            onChange={(e) => updatePsychometricData('lifePhilosophy', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Risk Perception */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Risk Perception</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="riskAwareness" className="text-white">How aware are you of risks in your life?</Label>
                        <Select
                            value={data.psychometric?.riskAwareness || ''}
                            onValueChange={(value) => updatePsychometricData('riskAwareness', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select risk awareness" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="very_low" className="text-white">Very Low - I rarely think about risks</SelectItem>
                                <SelectItem value="low" className="text-white">Low - I occasionally consider risks</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate - I'm somewhat aware</SelectItem>
                                <SelectItem value="high" className="text-white">High - I'm very aware of risks</SelectItem>
                                <SelectItem value="very_high" className="text-white">Very High - I constantly assess risks</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="riskManagement" className="text-white">How do you typically manage risks?</Label>
                        <Select
                            value={data.psychometric?.riskManagement || ''}
                            onValueChange={(value) => updatePsychometricData('riskManagement', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select risk management style" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="avoid" className="text-white">Avoid - I try to avoid risks entirely</SelectItem>
                                <SelectItem value="minimize" className="text-white">Minimize - I reduce risks when possible</SelectItem>
                                <SelectItem value="accept" className="text-white">Accept - I accept some risks as normal</SelectItem>
                                <SelectItem value="embrace" className="text-white">Embrace - I see risks as opportunities</SelectItem>
                                <SelectItem value="seek" className="text-white">Seek - I actively seek calculated risks</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PsychometricStep;