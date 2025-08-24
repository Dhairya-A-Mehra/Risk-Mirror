'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarEvent } from "@/models/dashboard";
import { Calendar as CalendarIcon, Bell, Plus, Edit, Trash } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, isSameDay } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

export function FullCalendarWidget({ events }: { events: CalendarEvent[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [newEventSummary, setNewEventSummary] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const router = useRouter();

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

  const formatDate = (dateInfo: { dateTime?: string; date?: string }) => {
    const dateStr = dateInfo.dateTime || dateInfo.date;
    if (!dateStr) return "Date not specified";
    const eventDate = new Date(dateStr);
    if (isNaN(eventDate.getTime())) return "Invalid date";
    if (dateInfo.date) return "All-day";
    if (isToday(eventDate)) {
      return eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return eventDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleAddEvent = async () => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: newEventSummary,
          start: { dateTime: new Date(newEventStart).toISOString() },
          end: { dateTime: new Date(new Date(newEventStart).getTime() + 3600000).toISOString() }, // 1 hour later
        }),
      });
      if (response.ok) {
        setNewEventSummary('');
        setNewEventStart('');
        router.refresh();
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Failed to add event.');
    }
  };

  const handleEditEvent = async () => {
    if (!editEvent) return;
    try {
      const response = await fetch(`/api/calendar/${editEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: editEvent.summary,
          start: editEvent.start,
          end: editEvent.end,
        }),
      });
      if (response.ok) {
        setEditEvent(null);
        router.refresh();
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Failed to update event:', error);
      alert('Failed to update event.');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/calendar/${eventId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event.');
    }
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl transition-all duration-300 h-full">
      <CardContent className="p-6 text-left h-full flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Calendar</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new calendar event.</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Input placeholder="Event Summary" value={newEventSummary} onChange={(e) => setNewEventSummary(e.target.value)} />
                <Input type="datetime-local" value={newEventStart} onChange={(e) => setNewEventStart(e.target.value)} />
                <Button onClick={handleAddEvent}>Add Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {todaysEvents.length > 0 && (
          <div className="mb-6 text-left">
            <h4 className="flex items-center text-sm font-semibold text-blue-300 mb-2">
              <Bell className="h-4 w-4 mr-2" />
              You have {todaysEvents.length} event(s) today:
            </h4>
            <ul className="space-y-1">
              {todaysEvents.map((event, i) => (
                <li key={`today-${i}`} className="text-xs text-white truncate flex justify-between items-center">
                  <span>- {event.summary} @ {formatDate(event.start)}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditEvent(event)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id || '')}><Trash className="h-4 w-4" /></Button>
                  </div>
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
                <div className="flex-1">
                  <p className="font-semibold text-white text-base">{event.summary}</p>
                  <p className="text-sm text-gray-300">{formatDate(event.start)}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditEvent(event)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id || '')}><Trash className="h-4 w-4" /></Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No events scheduled for this day.</p>
        )}

        {editEvent && (
          <Dialog open={!!editEvent} onOpenChange={() => setEditEvent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>Update your calendar event.</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Input
                  placeholder="Event Summary"
                  value={editEvent.summary}
                  onChange={(e) => setEditEvent({ ...editEvent, summary: e.target.value })}
                />
                <Input
                  type="datetime-local"
                  value={editEvent.start.dateTime?.slice(0, 16) || new Date(editEvent.start.date || '').toISOString().slice(0, 16)}
                  onChange={(e) => setEditEvent({ ...editEvent, start: { dateTime: new Date(e.target.value).toISOString() } })}
                />
                <Button onClick={handleEditEvent}>Update Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

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