import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export async function verifyAuth(req?: NextRequest): Promise<DecodedToken | null> {
  let token: string | undefined;

  if (req) {
    // For API routes or middleware
    token = req.cookies.get('sessionToken')?.value;
    console.log('[verifyAuth] Token from req.cookies:', token);
  } else {
    // For server components
    token = (await cookies()).get('sessionToken')?.value;
    console.log('[verifyAuth] Token from cookies():', token);
  }

  if (!token) {
    console.log('[verifyAuth] No session token found');
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    console.log('[verifyAuth] Decoded token:', decoded);
    if (!ObjectId.isValid(decoded.userId)) {
      console.log('[verifyAuth] Invalid ObjectId in token:', decoded.userId);
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('[verifyAuth] JWT verification failed:', error);
    return null;
  }
}