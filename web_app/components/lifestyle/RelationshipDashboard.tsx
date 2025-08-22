import React from 'react';
import { RelationshipMilestone } from '@/models/lifestylePage';
import { Gift } from 'lucide-react';

const RelationshipDashboard = ({ milestones }: { milestones: RelationshipMilestone[] }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="font-bold text-white mb-4">Relationship Health</h3>
        <ul className="space-y-3">
          {milestones.map((item, i) => (
            <li key={i} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                  <Gift className="h-4 w-4 mr-3 text-pink-400" />
                  <span>{item.personName}'s {item.eventName}</span>
              </div>
              <span className="font-semibold text-slate-300 bg-slate-700/50 px-2 py-1 rounded">{item.daysRemaining} days</span>
            </li>
          ))}
        </ul>
    </div>
);

export default RelationshipDashboard;