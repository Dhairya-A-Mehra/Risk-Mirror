// web_app/components/dashboard/FullCalendarWidget.tsx
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarEvent } from "@/models/dashboard";
import { Calendar as CalendarIcon, Bell } from "lucide-react"; 
import { Calendar } from "@/components/ui/calendar"; 
import { format, isToday, isSameDay } from 'date-fns';

export function FullCalendarWidget({ events }: { events: CalendarEvent[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const eventDates = useMemo(() =>
    events.map(event => new Date(event.start.dateTime || event.start.date || '')),
    [events]
  );

  const selectedDayEvents = useMemo(() => 
    events.filter(event => {
      if (!date) return false;
      const eventDate = new Date(event.start.dateTime || event.start.date || '');
      return isSameDay(eventDate, date);
    }),
    [events, date]
  );
  
  const todaysEvents = useMemo(() =>
    events.filter(event => {
        const eventDate = new Date(event.start.dateTime || event.start.date || '');
        return isToday(eventDate);
    }),
    [events]
  );
  
  const formatDate = (dateInfo: { dateTime?: string; date?: string; }) => {
    if (!dateInfo) return "Date not specified";
    
    // --- THE FIX IS HERE ---
    // We must use 'dateInfo.date' instead of 'date.start.date'
    const eventDate = new Date(dateInfo.dateTime || dateInfo.date || '');
    // ----------------------

    if (dateInfo.date) {
        return "All-day";
    }
    if (isToday(eventDate)) {
        return eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return eventDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        
        <div className="flex-grow flex flex-col items-center text-center">
            <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              📅
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Your Google Calendar</h3>
            <p className="text-gray-200 leading-relaxed text-base mb-4">
              {date ? `Events for ${format(date, 'PPP')}` : 'Select a date to see events'}
            </p>
            
            {todaysEvents.length > 0 && (
                <div className="w-full mb-4 p-3 bg-blue-900/50 border border-blue-700 rounded-lg text-left">
                    <h4 className="flex items-center text-sm font-semibold text-blue-300 mb-2">
                        <Bell className="h-4 w-4 mr-2" />
                        You have {todaysEvents.length} event(s) today:
                    </h4>
                    <ul className="space-y-1">
                        {todaysEvents.map((event, i) => (
                            <li key={`today-${i}`} className="text-xs text-white truncate">
                               - {event.summary} @ {formatDate(event.start)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {selectedDayEvents.length > 0 ? (
              <ul className="space-y-4 text-left w-full">
                {selectedDayEvents.map((event, i) => (
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
              <p className="text-sm text-gray-400">No events scheduled for this day.</p>
            )}
        </div>

        <div className="border-t border-blue-400/20 my-6"></div>

        <div className="flex-shrink-0 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border !bg-white !text-black"
            modifiers={{ events: eventDates }}
            modifiersStyles={{
              events: {
                backgroundColor: '#2563eb',
                color: '#ffffff',
              },
            }}
          />
        </div>

      </CardContent>
    </Card>
  );
}