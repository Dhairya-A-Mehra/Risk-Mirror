

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
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

      const newUser = {
        _id: new ObjectId(),
        email,
        fullName,
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection('users').insertOne(newUser);
      return NextResponse.json({ success: true, user: { email, fullName } });
  } catch (error) {
      return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
