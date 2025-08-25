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
    let tokens;
    try {
      const tokenResponse = await oauth2Client.getToken(code);
      tokens = tokenResponse.tokens;
      oauth2Client.setCredentials(tokens);
    } catch (tokenError) {
      console.error('Error exchanging code for tokens:', tokenError);
      return NextResponse.redirect('/onboarding/connect-calendar?error=token_exchange_failed');
    }

    // Get user info
    let userInfo;
    try {
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      userInfo = await oauth2.userinfo.get();
    } catch (userInfoError) {
      console.error('Error fetching user info:', userInfoError);
      return NextResponse.redirect('/onboarding/connect-calendar?error=userinfo_failed');
    }

    // Get user from session
    const token = request.cookies.get('sessionToken')?.value;
    const user = token ? await verifyAuth(token) : null;
    if (!user) {
      return NextResponse.redirect('/login?error=not_authenticated');
    }

    // Update user's Google Calendar connection in database
    try {
      const { db } = await connectToDatabase();
      // Fetch previous google integration data (if any)
      const prevUser = await db.collection('users').findOne({ _id: new ObjectId(user.userId) });
      const prevGoogle = prevUser?.integrations?.google || {};
      // Use old refreshToken if not returned (Google only returns it on first consent)
      const refreshToken = tokens.refresh_token || prevGoogle.refreshToken || '';
      // Store expiryDate if present
      const expiryDate = tokens.expiry_date ? new Date(tokens.expiry_date) : (prevGoogle.expiryDate ? new Date(prevGoogle.expiryDate) : null);
      await db.collection('users').updateOne(
        { _id: new ObjectId(user.userId) },
        {
          $set: {
            'integrations.google': {
              ...prevGoogle,
              linked: true,
              accessToken: tokens.access_token,
              refreshToken,
              expiryDate,
              email: userInfo.data.email,
              name: userInfo.data.name,
              googleId: userInfo.data.id,
              connectedAt: new Date()
            }
          }
        }
      );
    } catch (dbError) {
      console.error('Error updating user in DB:', dbError);
      return NextResponse.redirect('/onboarding/connect-calendar?error=db_update_failed');
    }

    // Redirect to survey page
    return NextResponse.redirect('/survey?calendar_connected=true');

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect('/onboarding/connect-calendar?error=callback_failed');
  }
}