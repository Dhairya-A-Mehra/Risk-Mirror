import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GameStep = ({ data, setData }: any) => {
  const [choiceMade, setChoiceMade] = useState(false);

  const handleChoice = (decisionScore: number, riskScore: number) => {
    setData({ ...data, simulationResult: { decisionQualityScore: decisionScore, riskAversionScore: riskScore } });
    setChoiceMade(true);
  };

  const choices = [
    { text: 'Invest it all in a high-risk, high-reward tech stock.', scores: { d: 30, r: 10 } },
    { text: 'Put 50% in a safe index fund and 50% in your savings account.', scores: { d: 80, r: 60 } },
    { text: 'Put it all directly into your emergency savings fund.', scores: { d: 70, r: 90 } },
    { text: 'Spend it on a luxury vacation you\'ve been wanting.', scores: { d: 20, r: 20 } },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-2 text-white">Final Step: Simulation</h2>
      <p className="text-center text-slate-400 mb-6">Let's see how you make decisions under pressure.</p>
      
      {!choiceMade ? (
        <>
          <p className="bg-slate-900/50 p-4 rounded-lg text-center font-semibold mb-4">You receive an unexpected $5,000 bonus. What do you do?</p>
          <div className="space-y-3">
            {choices.map((choice, i) => (
              <motion.button 
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(choice.scores.d, choice.scores.r)}
                className="w-full text-left p-3 bg-slate-700 hover:bg-sky-500/20 rounded-lg transition-colors border border-slate-600"
              >
                {choice.text}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center p-8 bg-green-500/10 rounded-lg">
          <h3 className="text-xl font-bold text-green-400">Thank You!</h3>
          <p className="text-slate-300 mt-2">Your response has been recorded. Click "Submit" to calculate your initial risk profile and proceed to the dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default GameStep;