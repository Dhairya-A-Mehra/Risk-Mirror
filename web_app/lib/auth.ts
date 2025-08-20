// web_app/lib/auth.ts

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyAuth(req: NextRequest): DecodedToken | null {
  const token = req.cookies.get('sessionToken')?.value;

  if (!token) {
    return null; // No token found
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    // Token is invalid or expired
    console.error("JWT verification failed:", error);
    return null;
  }
}