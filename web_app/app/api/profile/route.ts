

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyJwt } from '@/lib/jwt';
import { User } from '@/models/user';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
  // Read JWT from sessionToken cookie (same as /api/auth/me)
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { fullName, persona } = await request.json();

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ message: 'Full name must be at least 2 characters.' }, { status: 400 });
    }
    if (!persona || typeof persona !== 'string' || persona.trim().length === 0) {
      return NextResponse.json({ message: 'Persona is required.' }, { status: 400 });
    }

    const userId = new ObjectId(decodedToken.userId);
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>('users');

    const updateOperation = {
      $set: {
        fullName: fullName.trim(),
        'profile.persona': persona, 
        updatedAt: new Date(),
      },
    };

    const result = await usersCollection.updateOne(
      { _id: userId }, 
      updateOperation  
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (result.modifiedCount === 0 && result.matchedCount === 1) {
      return NextResponse.json({ message: 'No changes detected' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
