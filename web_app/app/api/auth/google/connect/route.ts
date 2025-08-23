// web_app/app/api/auth/google/connect/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { google } from 'googleapis';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;

// --- Start of Debugging ---
console.log("--- GOOGLE CONNECT ROUTE LOADED ---");
console.log("CLIENT_ID:", GOOGLE_CLIENT_ID ? `"${GOOGLE_CLIENT_ID}"` : "!!! UNDEFINED !!!");
console.log("CLIENT_SECRET:", GOOGLE_CLIENT_SECRET ? "SET" : "!!! UNDEFINED !!!");
console.log("REDIRECT_URI:", GOOGLE_REDIRECT_URI);
// --- End of Debugging ---

export async function GET(request: NextRequest) {
  // Check if keys are missing and return a clear error
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("CRITICAL: Google Client ID or Secret is missing in the environment.");
    return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });

  console.log("Generated Authorization URL:", authorizationUrl);

  return NextResponse.redirect(authorizationUrl);
}