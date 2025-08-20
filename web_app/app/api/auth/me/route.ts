// web_app/app/api/auth/me/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { User } from '@/models/user';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  const decodedToken = verifyAuth(request);

  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = decodedToken;
    const { db } = await connectToDatabase();

    const user = await db.collection<User>('users').findOne(
      { _id: new ObjectId(userId) },
      // Projection: explicitly exclude the password hash from the response
      { projection: { passwordHash: 0 } } 
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}