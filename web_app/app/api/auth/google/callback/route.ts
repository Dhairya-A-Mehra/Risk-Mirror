// web_app/app/api/auth/google/callback/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { google } from 'googleapis';
import { connectToDatabase } from '@/lib/mongodb';
import { User, DynamicRiskDNA } from '@/models/user';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// --- CONFIGURATION ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;
const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'sessionToken';

// Default RiskDNA for brand new users
const defaultRiskDNA: DynamicRiskDNA = {
  lastCalculated: new Date(),
  overallScore: 50,
  financialScore: 50,
  healthScore: 50,
  behavioralScore: 50,
  financialCalmIndex: 50,
  interdependencies: [],
  keyBehavioralSignals: ['Account created.'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url));
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  try {
    // 1. Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // 2. Use tokens to get the user's profile information from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    if (!userInfo.email || !userInfo.name) {
      throw new Error("Google profile information is missing.");
    }
    
    const { db } = await connectToDatabase();
    
    // 3. Find an existing user or create a new one (UPSERT)
    const result = await db.collection<User>('users').findOneAndUpdate(
      { email: userInfo.email }, // Filter: Find user by email
      {
        $set: { // Update these fields if user is found OR for a new user
          fullName: userInfo.name,
          'profile.avatar': userInfo.picture || '',
          'integrations.google': {
            linked: true,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
          },
          updatedAt: new Date(),
        },
        $setOnInsert: { // Only set these fields when a NEW user is created
          email: userInfo.email,
          createdAt: new Date(),
          dynamicRiskDNA: defaultRiskDNA, // Assign default scores
          gamification: { badges: [], leaderboardScore: 0, streak: { current: 0, longest: 0 } },
          profile: { persona: 'New User', avatar: userInfo.picture || '' },
        }
      },
      { 
        upsert: true, // This is the magic: create the document if it doesn't exist
        returnDocument: 'after' // Return the new or updated document
      }
    );

    const user = result as User;

    if (!user || !user._id) {
      throw new Error("Failed to find or create user document in the database or missing user ID.");
    }
    
    // 4. Create a session token (JWT) for YOUR application
    const sessionToken = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // 5. Set the session token in a secure, HttpOnly cookie
    const cookie = serialize(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // 6. Redirect the user
    // If the 'createdAt' and 'updatedAt' times are very close, they are a new user.
    const isNewUser = (user.updatedAt.getTime() - user.createdAt.getTime()) < 1000;
    const redirectUrl = isNewUser ? '/survey' : '/dashboard';

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.headers.set('Set-Cookie', cookie);

    return response;

  } catch (error) {
    console.error("Google OAuth callback error:", error);
    // Redirect to login page with a generic error
    return NextResponse.redirect(new URL('/login?error=authentication_failed', request.url));
  }
}