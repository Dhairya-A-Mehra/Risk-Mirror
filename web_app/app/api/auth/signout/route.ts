

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
 
  const serializedCookie = serialize('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, 
    path: '/',
  });

  const response = NextResponse.json(
    { message: 'Signed out successfully' },
    { status: 200 }
  );
  response.headers.set('Set-Cookie', serializedCookie);

  return response;
}
