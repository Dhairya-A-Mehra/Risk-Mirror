// web_app/components/dashboard/FullCalendarWidget.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarEvent } from "@/models/dashboard";
import { Calendar as CalendarIcon } from "lucide-react"; 
import { Calendar } from "@/components/ui/calendar"; 
import { format } from 'date-fns';

export function FullCalendarWidget({ events }: { events: CalendarEvent[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const eventDates = events.map(event => new Date(event.start.dateTime || event.start.date || ''));

  const formatDate = (dateInfo: { dateTime?: string; date?: string; }) => {
    if (!dateInfo) return "Date not specified";
    const date = new Date(dateInfo.dateTime || dateInfo.date || '');
    if (dateInfo.date) {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        
        {/* --- TOP SECTION: Your Styled Event List --- */}
        <div className="flex-grow flex flex-col items-center text-center">
            {/* --- FIX: The icon is now perfectly centered --- */}
            <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              📅
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Upcoming in Your Google Calendar</h3>
            <p className="text-gray-200 leading-relaxed text-base mb-4">
              Your linked events and reminders.
            </p>
            {events.length > 0 ? (
              <ul className="space-y-4 text-left w-full">
                {events.map((event, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CalendarIcon className="h-5 w-5 mt-1 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white text-base">{event.summary}</p>
                      <p className="text-sm text-gray-300">{formatDate(event.start)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-300">No upcoming events found or calendar not linked.</p>
            )}
        </div>

        {/* --- DIVIDER (Optional but nice) --- */}
        <div className="border-t border-blue-400/20 my-6"></div>

        {/* --- BOTTOM SECTION: The Interactive Calendar, Centered --- */}
        <div className="flex-shrink-0 flex justify-center">
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border !bg-white !text-black"  // ⬅ force solid colors
  modifiers={{ events: eventDates }}
  modifiersStyles={{
    events: {
      backgroundColor: '#2563eb', // e.g. Tailwind blue-600
      color: '#ffffff',
    },
  }}
/>

        </div>

      </CardContent>
    </Card>
  );
}