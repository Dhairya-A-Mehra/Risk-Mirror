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
    <Card>
      <CardHeader>
        <CardTitle>Upcoming in Your Google Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, i) => (
              <li key={i} className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 mt-1 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{event.summary}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(event.start)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-slate-500">No upcoming events found or calendar not linked.</p>}
      </CardContent>
    </Card>
  );
}