import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { DashboardData } from "@/models/dashboard";

export function CalendarWidget({ events }: { events: DashboardData['googleCalendarEvents'] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
        <Calendar className="h-4 w-4 text-slate-500" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              <span>{event.summary}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}