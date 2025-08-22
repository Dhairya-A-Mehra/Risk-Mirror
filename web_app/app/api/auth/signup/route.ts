

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/user';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: User = {
      _id: new ObjectId(),
      fullName,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      
      profile: { avatar: "default_avatar.png", persona: "Cautious Starter" },
      gamification: { badges: [], leaderboardScore: 0, streak: { current: 0, longest: 0 } },
      dynamicRiskDNA: { lastCalculated: new Date(), overallScore: 50, financialScore: 50, healthScore: 50, behavioralScore: 50 },
      integrations: { googleCalendarLinked: false, fitbitLinked: false, axioLinked: false }
    };

    const result = await db.collection<User>('users').insertOne(newUser);
    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Signup failed:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
