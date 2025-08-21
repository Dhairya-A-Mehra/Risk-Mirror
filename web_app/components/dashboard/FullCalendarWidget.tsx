// web_app/components/dashboard/FullCalendarWidget.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent } from "@/models/dashboard";
import { Calendar } from "lucide-react";

export function FullCalendarWidget({ events }: { events: CalendarEvent[] }) {
  const formatDate = (dateInfo: { dateTime?: string; date?: string; }) => {
    if (!dateInfo) return "Date not specified";
    const date = new Date(dateInfo.dateTime || dateInfo.date || '');
    if (dateInfo.date) { // All-day event
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">📅</div>
        <h3 className="text-xl font-bold mb-3 text-white">Upcoming in Your Google Calendar</h3>
        <p className="text-gray-200 flex-grow leading-relaxed text-base mb-4">Your linked events and reminders.</p>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, i) => (
              <li key={i} className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 mt-1 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white text-base">{event.summary}</p>
                  <p className="text-sm text-gray-300">{formatDate(event.start)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-300">No upcoming events found or calendar not linked.</p>}
      </CardContent>
    </Card>
  );
}