// web_app/app/api/calendar/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user || !user.integrations?.google?.linked || !user.integrations.google.accessToken) {
      return NextResponse.json({ message: 'Google Calendar not linked' }, { status: 400 });
    }

    const { summary, start, end } = await request.json();
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: user.integrations.google.accessToken,
      refresh_token: user.integrations.google.refreshToken,
      expiry_date: user.integrations.google.expiryDate?.getTime(),
    });

    oauth2Client.on('tokens', async (tokens) => {
      if (tokens.access_token) {
        await db.collection('users').updateOne({ _id: userId }, {
          $set: {
            'integrations.google.accessToken': tokens.access_token,
            'integrations.google.expiryDate': new Date(tokens.expiry_date!),
            ...(tokens.refresh_token ? { 'integrations.google.refreshToken': tokens.refresh_token } : {}),
          }
        });
      }
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary,
        start,
        end,
      },
    });

    return NextResponse.json({ id: event.data.id, summary, start, end }, { status: 200 });
  } catch (error) {
    console.error('Failed to add calendar event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);
  const eventId = request.nextUrl.pathname.split('/').pop();

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user || !user.integrations?.google?.linked || !user.integrations.google.accessToken) {
      return NextResponse.json({ message: 'Google Calendar not linked' }, { status: 400 });
    }

    const { summary, start, end } = await request.json();
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: user.integrations.google.accessToken,
      refresh_token: user.integrations.google.refreshToken,
      expiry_date: user.integrations.google.expiryDate?.getTime(),
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: {
        summary,
        start,
        end,
      },
    });

    return NextResponse.json({ message: 'Event updated' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update calendar event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);
  const eventId = request.nextUrl.pathname.split('/').pop();

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user || !user.integrations?.google?.linked || !user.integrations.google.accessToken) {
      return NextResponse.json({ message: 'Google Calendar not linked' }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: user.integrations.google.accessToken,
      refresh_token: user.integrations.google.refreshToken,
      expiry_date: user.integrations.google.expiryDate?.getTime(),
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });

    return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete calendar event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}