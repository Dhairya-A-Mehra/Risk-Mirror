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

export async function verifyAuth(req?: NextRequest | string): Promise<DecodedToken | null> {
  let token: string | undefined;

  if (typeof req === 'string') {
    // If req is a token string
    token = req;
    console.log('[verifyAuth] Token provided directly:', token);
  } else if (req instanceof NextRequest) {
    // For API routes or middleware
    token = (await cookies()).get('sessionToken')?.value;
    console.log('[verifyAuth] Token from cookies():', token);
  }

  if (!token) {
    console.log('[verifyAuth] No session token found');
    return null;
  }

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.error('[verifyAuth] JWT verification failed: Token Expired');
    } else if (error.name === 'JsonWebTokenError') {
      console.error(`[verifyAuth] JWT verification failed: ${error.message}`);
    } else {
      console.error('[verifyAuth] JWT verification failed:', error);
    }
    return null;
  }

  if (!ObjectId.isValid(decoded.userId)) {
    console.log('[verifyAuth] Invalid ObjectId in token:', decoded.userId);
    return null;
  }
  return decoded;
}