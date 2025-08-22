import React from 'react';
import { CalendarEvent } from '@/models/dashboard';

const CalendarCard = ({ events }: { events: CalendarEvent[] }) => (
  <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
    <h3 className="font-bold text-white mb-4">Upcoming Events</h3>
    <ul className="space-y-3">
      {events.map((event, i) => (
        <li key={i} className="flex items-start text-sm">
          <div className="w-2 h-2 rounded-full bg-sky-400 mr-3 mt-1.5 shrink-0"></div>
          <div>
            <p className="font-semibold text-slate-200">{event.summary}</p>
            <p className="text-xs text-slate-400">{new Date(event.start.dateTime || event.start.date || Date.now()).toLocaleString()}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CalendarCard;