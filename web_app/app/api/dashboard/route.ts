

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { google } from 'googleapis';

import { User } from '@/models/user';
import { Plan } from '@/models/plan';
import { ExplainabilityLog } from '@/models/explainabilityLog';
import { Insight } from '@/models/insight';
import { DashboardData } from '@/models/dashboard';

export async function GET(request: NextRequest) {
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = new ObjectId(decodedToken.userId);

  try {
    const { db } = await connectToDatabase();

    const userPromise = db.collection<User>('users').findOne({ _id: userId }, { projection: { passwordHash: 0 } });
    const activePlanPromise = db.collection<Plan>('plans').findOne({ userId, status: 'active' });
    const insightsPromise = db.collection<Insight>('insights').find({ userId, isArchived: false }).sort({ createdAt: -1 }).limit(5).toArray();
    const latestRiskExplanationPromise = db.collection<ExplainabilityLog>('explainability_logs').findOne({ userId, decisionType: 'Risk Score Calculation' }, { sort: { createdAt: -1 } });
    
    const [user, activePlan, insights, latestRiskExplanation] = await Promise.all([
      userPromise, activePlanPromise, insightsPromise, latestRiskExplanationPromise
    ]);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    let googleCalendarEvents: any[] = [];
    if (user.integrations?.google?.linked && user.integrations.google.accessToken) {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: user.integrations.google.accessToken });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        try {
            const res = await calendar.events.list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                maxResults: 5,
                singleEvents: true,
                orderBy: 'startTime',
            });
            googleCalendarEvents = res.data.items || [];
        } catch (calendarError) {
            console.error("Failed to fetch Google Calendar events:", calendarError);
        }
    }

    const dashboardData: DashboardData = {
      user: {
        fullName: user.fullName,
        email: user.email,
        profile: user.profile,
      },
      riskDNA: user.dynamicRiskDNA,
      activePlan,
      insights: {
        recommendations: insights.filter(i => i.type === 'recommendation'),
        emotionalROI: insights.filter(i => i.type === 'emotional_roi'),
      },
      latestRiskExplanation,
      googleCalendarEvents: googleCalendarEvents.map(e => ({
        summary: e.summary || 'No Title',
        start: e.start || { date: new Date().toISOString() },
        end: e.end || { date: new Date().toISOString() }
      })),
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
