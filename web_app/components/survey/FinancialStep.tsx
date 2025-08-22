import React from 'react';
import { FormLabel, FormInput, FormField } from './FormElements';

const FinancialStep = ({ data, setData }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, financial: { ...data.financial, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : parseFloat(e.target.value) || 0 }});
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Financial Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField><FormLabel>Monthly Income ($)</FormLabel><FormInput type="number" name="monthlyIncome" value={data.financial.monthlyIncome} onChange={handleChange} /></FormField>
                <FormField><FormLabel>Monthly Expenses ($)</FormLabel><FormInput type="number" name="monthlyExpenses" value={data.financial.monthlyExpenses} onChange={handleChange} /></FormField>
                <FormField><FormLabel>Total Savings ($)</FormLabel><FormInput type="number" name="totalSavings" value={data.financial.totalSavings} onChange={handleChange} /></FormField>
                <FormField><FormLabel>Total Debt ($)</FormLabel><FormInput type="number" name="totalDebt" value={data.financial.totalDebt} onChange={handleChange} /></FormField>
            </div>
            <FormField>
                <div className="flex items-center mt-2">
                    <input type="checkbox" name="hasInvestments" checked={data.financial.hasInvestments} onChange={handleChange} className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-sky-500 focus:ring-sky-500" />
                    <FormLabel><span className="ml-2">Do you have any investments?</span></FormLabel>
                </div>
            </FormField>
        </div>
    );
};

export default FinancialStep;