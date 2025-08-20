// web_app/app/api/profile/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/lib/auth';
import { User } from '@/models/user';
import { ObjectId } from 'mongodb';

// We are handling a PUT request to update existing data
export async function PUT(request: NextRequest) {
  // 1. Authenticate the user and get their ID from the JWT
  const decodedToken = verifyAuth(request);
  if (!decodedToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Parse the incoming data from the frontend form
    const { fullName, persona } = await request.json();

    // 3. Validate the incoming data
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ message: 'Full name must be at least 2 characters.' }, { status: 400 });
    }
    if (!persona || typeof persona !== 'string' || persona.trim().length === 0) {
      return NextResponse.json({ message: 'Persona is required.' }, { status: 400 });
    }

    const userId = new ObjectId(decodedToken.userId);
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>('users');

    // 4. Prepare the update operation using MongoDB's $set operator
    // This ensures we only update the specified fields and nothing else.
    const updateOperation = {
      $set: {
        fullName: fullName.trim(),
        'profile.persona': persona, // Use dot notation to update a field in a nested object
        updatedAt: new Date(),
      },
    };

    // 5. Execute the update against the database
    const result = await usersCollection.updateOne(
      { _id: userId }, // The filter to find the correct user
      updateOperation   // The update to apply
    );

    // 6. Check if the update was successful
    if (result.matchedCount === 0) {
      // This would happen if the user ID from the token doesn't exist in the DB
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (result.modifiedCount === 0 && result.matchedCount === 1) {
      // This means the user was found, but no changes were made (they submitted the same data)
      return NextResponse.json({ message: 'No changes detected' }, { status: 200 });
    }

    // 7. Send a success response
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}