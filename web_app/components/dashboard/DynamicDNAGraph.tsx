'use client';

import { DynamicRiskDNA } from '@/models/user';

interface DynamicDNAGraphProps {
  riskDNA: DynamicRiskDNA;
}

function getIcon(riskType: string) {
  switch (riskType.toLowerCase()) {
    case 'financial':
      return <span className="text-yellow-400">💰</span>;
    case 'health':
      return <span className="text-red-400">❤️</span>;
    case 'behavioral':
      return <span className="text-blue-400">🧠</span>;
    default:
      return <span>🔗</span>;
  }
}

export default function DynamicDNAGraph({ riskDNA }: DynamicDNAGraphProps) {
  const interdependencies = Array.isArray(riskDNA?.interdependencies) ? riskDNA.interdependencies : [];
  const keyBehavioralSignals = Array.isArray(riskDNA?.keyBehavioralSignals) ? riskDNA.keyBehavioralSignals : [];
  const overallScore = typeof riskDNA?.overallScore === 'number' && !isNaN(riskDNA.overallScore) ? riskDNA.overallScore : 0;
  const financialScore = typeof riskDNA?.financialScore === 'number' && !isNaN(riskDNA.financialScore) ? riskDNA.financialScore : 0;
  const healthScore = typeof riskDNA?.healthScore === 'number' && !isNaN(riskDNA.healthScore) ? riskDNA.healthScore : 0;
  const behavioralScore = typeof riskDNA?.behavioralScore === 'number' && !isNaN(riskDNA.behavioralScore) ? riskDNA.behavioralScore : 0;

  return (
    <div className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Risk DNA Graph</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-white">Overall Score: {typeof overallScore === 'number' ? overallScore.toFixed(2) : '0.00'}</p>
          <p className="text-sm text-white">Financial Score: {typeof financialScore === 'number' ? financialScore.toFixed(2) : '0.00'}</p>
          <p className="text-sm text-white">Health Score: {typeof healthScore === 'number' ? healthScore.toFixed(2) : '0.00'}</p>
          <p className="text-sm text-white">Behavioral Score: {typeof behavioralScore === 'number' ? behavioralScore.toFixed(2) : '0.00'}</p>
        </div>
        <h4 className="font-semibold mb-3 text-white">Cross-Risk Links & Signals</h4>
        <div className="space-y-3">
          {Array.isArray(interdependencies) && interdependencies.length > 0 ? (
            interdependencies.map((dep, i) => (
              <div key={`dep-${i}`} className="flex items-center text-sm">
                {getIcon(dep.sourceRisk)}
                <div className="flex-1 border-t border-dashed border-blue-400 mx-2"></div>
                {getIcon(dep.targetRisk)}
                <span className="ml-2 text-gray-300">{dep.reason} (Impact: {dep.impact.toFixed(2)})</span>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No interdependencies available</p>
          )}
        </div>
        <h4 className="font-semibold mb-3 text-white">Behavioral Signals</h4>
        <div className="space-y-2">
          {Array.isArray(keyBehavioralSignals) && keyBehavioralSignals.length > 0 ? (
            keyBehavioralSignals.map((signal, i) => (
              <p key={`signal-${i}`} className="text-sm text-gray-300">{signal}</p>
            ))
          ) : (
            <p className="text-gray-300">No behavioral signals available</p>
          )}
        </div>
      </div>
    </div>
  );
}