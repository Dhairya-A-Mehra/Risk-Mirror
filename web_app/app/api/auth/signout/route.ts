// web_app/app/api/auth/signout/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  // To sign out, we send back a cookie with the same name but an expired date
  const serializedCookie = serialize('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  });

  const response = NextResponse.json(
    { message: 'Signed out successfully' },
    { status: 200 }
  );
  response.headers.set('Set-Cookie', serializedCookie);

  return response;
}