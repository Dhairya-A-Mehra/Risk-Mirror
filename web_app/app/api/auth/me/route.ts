
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ user: null, message: 'Unauthorized' }, { status: 401 });
  }
  const decoded = verifyJwt(token);
  if (!decoded) {
    return NextResponse.json({ user: null, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { db } = await connectToDatabase();
    // Return all fields needed for Navbar, Profile, etc.
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.userId) },
      {
        projection: {
          fullName: 1,
          email: 1,
          profile: 1,
          gamification: 1,
          riskThreshold: 1,
          // add more fields as needed for your app
        },
      }
    );
    if (!user) {
      return NextResponse.json({ user: null, message: 'User not found' }, { status: 404 });
    }
    // Always return the same shape for user
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null, message: 'Internal Server Error' }, { status: 500 });
  }
}