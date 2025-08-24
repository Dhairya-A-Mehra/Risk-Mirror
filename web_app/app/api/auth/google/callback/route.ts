// web_app/app/api/auth/google/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect('/onboarding/connect-calendar?error=oauth_denied');
    }

    if (!code) {
      return NextResponse.redirect('/onboarding/connect-calendar?error=no_code');
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Get user from session
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.redirect('/login?error=not_authenticated');
    }

    // Update user's Google Calendar connection in database
    const { db } = await connectToDatabase();
    await db.collection('users').updateOne(
      { _id: new ObjectId(user.userId) },
      {
        $set: {
          'integrations.google': {
            linked: true,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            email: userInfo.data.email,
            name: userInfo.data.name,
            connectedAt: new Date()
          }
        }
      }
    );

    // Redirect to survey page
    return NextResponse.redirect('/survey?calendar_connected=true');

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect('/onboarding/connect-calendar?error=callback_failed');
  }
}