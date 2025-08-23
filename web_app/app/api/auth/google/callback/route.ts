// web_app/app/api/auth/google/callback/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { google } from 'googleapis';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/user';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.redirect(new URL('/dashboard?error=google_auth_failed', request.url));
  }

  try {
    const decodedState = jwt.verify(state, JWT_SECRET) as { userId: string };
    const userId = new ObjectId(decodedState.userId);

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    const { access_token, refresh_token, expiry_date } = tokens;

    const { db } = await connectToDatabase();
    await db.collection<User>('users').updateOne(
      { _id: userId },
      {
        $set: {
          'integrations.google.linked': true,
          'integrations.google.accessToken': access_token,
          ...(refresh_token && { 'integrations.google.refreshToken': refresh_token }),
          'integrations.google.expiryDate': expiry_date ? new Date(expiry_date) : undefined,
        },
      }
    );
    
    // --- THE CRITICAL CHANGE ---
    // Redirect the user to the survey page as the next step in onboarding.
    return NextResponse.redirect(new URL('/survey', request.url));

  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(new URL('/dashboard?error=invalid_state', request.url));
  }
}