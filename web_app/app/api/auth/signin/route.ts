

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection<User>('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET!, {
      expiresIn: '1d', 
    });

    const serializedCookie = serialize('sessionToken', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1, 
      path: '/',
    });

    
    const response = NextResponse.json(
      { message: 'Signed in successfully' },
      { status: 200 }
    );
    response.headers.set('Set-Cookie', serializedCookie);

    return response;

  } catch (error) {
    console.error("Signin failed:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
