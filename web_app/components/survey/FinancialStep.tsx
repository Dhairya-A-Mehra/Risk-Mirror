import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface FinancialStepProps {
    data: any;
    setData: (data: any) => void;
}

const FinancialStep: React.FC<FinancialStepProps> = ({ data, setData }) => {
    const updateFinancialData = (field: string, value: any) => {
        setData({
            ...data,
            financial: {
                ...data.financial,
                [field]: value
            }
        });
    };

    const investmentTypes = [
        'Stocks',
        'Bonds',
        'Mutual Funds',
        'ETFs',
        'Real Estate',
        'Cryptocurrency',
        'Gold/Silver',
        'Fixed Deposits',
        'PPF/EPF',
        'Insurance Policies'
    ];

    const debtTypes = [
        'Credit Card',
        'Personal Loan',
        'Home Loan',
        'Car Loan',
        'Student Loan',
        'Business Loan',
        'Medical Bills',
        'Tax Debt',
        'Other'
    ];

    const jobTypes = [
        'Full-time Employee',
        'Part-time Employee',
        'Freelancer',
        'Entrepreneur',
        'Business Owner',
        'Student',
        'Retired',
        'Unemployed',
        'Other'
    ];

    const banks = [
        'HDFC Bank',
        'ICICI Bank',
        'State Bank of India',
        'Axis Bank',
        'Kotak Mahindra Bank',
        'Punjab National Bank',
        'Bank of Baroda',
        'Canara Bank',
        'Union Bank of India',
        'Other'
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Financial Information</h2>
                <p className="text-gray-300">Help us understand your financial situation</p>
            </div>

            {/* Income & Expenses */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Income & Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="monthlyIncome" className="text-white">Monthly Income (₹)</Label>
                            <Input
                                id="monthlyIncome"
                                type="number"
                                placeholder="50000"
                                value={data.financial?.monthlyIncome || ''}
                                onChange={(e) => updateFinancialData('monthlyIncome', parseFloat(e.target.value) || 0)}
                                className="bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="monthlyExpenses" className="text-white">Monthly Expenses (₹)</Label>
                            <Input
                                id="monthlyExpenses"
                                type="number"
                                placeholder="30000"
                                value={data.financial?.monthlyExpenses || ''}
                                onChange={(e) => updateFinancialData('monthlyExpenses', parseFloat(e.target.value) || 0)}
                                className="bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="totalSavings" className="text-white">Total Savings (₹)</Label>
                            <Input
                                id="totalSavings"
                                type="number"
                                placeholder="100000"
                                value={data.financial?.totalSavings || ''}
                                onChange={(e) => updateFinancialData('totalSavings', parseFloat(e.target.value) || 0)}
                                className="bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="emergencyFund" className="text-white">Emergency Fund (₹)</Label>
                            <Input
                                id="emergencyFund"
                                type="number"
                                placeholder="50000"
                                value={data.financial?.emergencyFund || ''}
                                onChange={(e) => updateFinancialData('emergencyFund', parseFloat(e.target.value) || 0)}
                                className="bg-gray-700 border-gray-600 text-white"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Job & Banking */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Employment & Banking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="jobType" className="text-white">Job Type</Label>
                            <Select
                                value={data.financial?.jobType || ''}
                                onValueChange={(value) => updateFinancialData('jobType', value)}
                            >
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                    {jobTypes.map((type) => (
                                        <SelectItem key={type} value={type} className="text-white">
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="primaryBank" className="text-white">Primary Bank</Label>
                            <Select
                                value={data.financial?.primaryBank || ''}
                                onValueChange={(value) => updateFinancialData('primaryBank', value)}
                            >
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                    <SelectValue placeholder="Select bank" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                    {banks.map((bank) => (
                                        <SelectItem key={bank} value={bank} className="text-white">
                                            {bank}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="companyName" className="text-white">Company Name</Label>
                        <Input
                            id="companyName"
                            placeholder="Your company name"
                            value={data.financial?.companyName || ''}
                            onChange={(e) => updateFinancialData('companyName', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Investments */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Investments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hasInvestments"
                            checked={data.financial?.hasInvestments || false}
                            onCheckedChange={(checked) => updateFinancialData('hasInvestments', checked)}
                        />
                        <Label htmlFor="hasInvestments" className="text-white">Do you have investments?</Label>
                    </div>

                    {data.financial?.hasInvestments && (
                        <>
                            <div>
                                <Label className="text-white">Investment Types (Select all that apply)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                    {investmentTypes.map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={type}
                                                checked={data.financial?.investmentTypes?.includes(type) || false}
                                                onCheckedChange={(checked) => {
                                                    const currentTypes = data.financial?.investmentTypes || [];
                                                    const newTypes = checked
                                                        ? [...currentTypes, type]
                                                        : currentTypes.filter((t: string) => t !== type);
                                                    updateFinancialData('investmentTypes', newTypes);
                                                }}
                                            />
                                            <Label htmlFor={type} className="text-white text-sm">{type}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="stockInvestments" className="text-white">Stocks You Own (if any)</Label>
                                <Textarea
                                    id="stockInvestments"
                                    placeholder="e.g., TCS, Infosys, Reliance, HDFC Bank..."
                                    value={data.financial?.stockInvestments || ''}
                                    onChange={(e) => updateFinancialData('stockInvestments', e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="totalInvestmentValue" className="text-white">Total Investment Value (₹)</Label>
                                <Input
                                    id="totalInvestmentValue"
                                    type="number"
                                    placeholder="500000"
                                    value={data.financial?.totalInvestmentValue || ''}
                                    onChange={(e) => updateFinancialData('totalInvestmentValue', parseFloat(e.target.value) || 0)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Debts */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Debts & Loans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="hasDebt"
                            checked={data.financial?.hasDebt || false}
                            onCheckedChange={(checked) => updateFinancialData('hasDebt', checked)}
                        />
                        <Label htmlFor="hasDebt" className="text-white">Do you have any debts or loans?</Label>
                    </div>

                    {data.financial?.hasDebt && (
                        <>
                            <div>
                                <Label className="text-white">Types of Debt (Select all that apply)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                    {debtTypes.map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={type}
                                                checked={data.financial?.debtTypes?.includes(type) || false}
                                                onCheckedChange={(checked) => {
                                                    const currentTypes = data.financial?.debtTypes || [];
                                                    const newTypes = checked
                                                        ? [...currentTypes, type]
                                                        : currentTypes.filter((t: string) => t !== type);
                                                    updateFinancialData('debtTypes', newTypes);
                                                }}
                                            />
                                            <Label htmlFor={type} className="text-white text-sm">{type}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="totalDebt" className="text-white">Total Debt Amount (₹)</Label>
                                <Input
                                    id="totalDebt"
                                    type="number"
                                    placeholder="200000"
                                    value={data.financial?.totalDebt || ''}
                                    onChange={(e) => updateFinancialData('totalDebt', parseFloat(e.target.value) || 0)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>

                            <div>
                                <Label htmlFor="monthlyEMI" className="text-white">Monthly EMI Payments (₹)</Label>
                                <Input
                                    id="monthlyEMI"
                                    type="number"
                                    placeholder="15000"
                                    value={data.financial?.monthlyEMI || ''}
                                    onChange={(e) => updateFinancialData('monthlyEMI', parseFloat(e.target.value) || 0)}
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Financial Goals */}
            <Card className="bg-gray-800/50 border-gray-600">
                <CardHeader>
                    <CardTitle className="text-white">Financial Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="shortTermGoal" className="text-white">Short-term Goal (next 1 year)</Label>
                        <Textarea
                            id="shortTermGoal"
                            placeholder="e.g., Save ₹50,000 for emergency fund"
                            value={data.financial?.shortTermGoal || ''}
                            onChange={(e) => updateFinancialData('shortTermGoal', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            rows={2}
                        />
                    </div>

                    <div>
                        <Label htmlFor="longTermGoal" className="text-white">Long-term Goal (next 5-10 years)</Label>
                        <Textarea
                            id="longTermGoal"
                            placeholder="e.g., Buy a house, retire early"
                            value={data.financial?.longTermGoal || ''}
                            onChange={(e) => updateFinancialData('longTermGoal', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            rows={2}
                        />
                    </div>

                    <div>
                        <Label htmlFor="riskTolerance" className="text-white">Risk Tolerance</Label>
                        <Select
                            value={data.financial?.riskTolerance || ''}
                            onValueChange={(value) => updateFinancialData('riskTolerance', value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select risk tolerance" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                                <SelectItem value="conservative" className="text-white">Conservative (Low risk, low return)</SelectItem>
                                <SelectItem value="moderate" className="text-white">Moderate (Balanced risk and return)</SelectItem>
                                <SelectItem value="aggressive" className="text-white">Aggressive (High risk, high return)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FinancialStep;