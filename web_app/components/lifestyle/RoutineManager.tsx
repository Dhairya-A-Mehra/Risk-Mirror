import React, { useState } from 'react';
import { Routine, RoutineTask } from '@/models/lifestylePage';
import { Check, Square } from 'lucide-react';
import { motion } from 'framer-motion';

const RoutineManager = ({ routines: initialRoutines }: { routines: Routine[] }) => {
  const [routines, setRoutines] = useState(initialRoutines);

  const toggleTask = (routineId: string, taskId: string) => {
    setRoutines(routines.map(r => 
      r.id === routineId ? { ...r, tasks: r.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) } : r
    ));
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
      <h3 className="font-bold text-white text-lg mb-4">Daily Routine Planner</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routines.map(routine => (
          <div key={routine.id}>
            <h4 className="font-semibold text-sky-400 mb-2">{routine.title}</h4>
            <ul className="space-y-2">
              {routine.tasks.map(task => (
                <li key={task.id} onClick={() => toggleTask(routine.id, task.id)} className="flex items-center cursor-pointer group">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    {task.completed ? <Check className="h-5 w-5 text-green-400" /> : <Square className="h-5 w-5 text-slate-500 group-hover:text-sky-400" />}
                  </motion.div>
                  <span className={`ml-3 text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>{task.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineManager;