import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// This endpoint receives a user query, fetches user details, and calls the coordinator agent
export async function POST(request: NextRequest) {
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ reply: 'Unauthorized. Please log in.' }, { status: 401 });
  }
  const decoded = verifyJwt(token);
  if (!decoded) {
    return NextResponse.json({ reply: 'Unauthorized. Please log in.' }, { status: 401 });
  }
  const { db } = await connectToDatabase();
  // Fetch the user and all relevant data (including survey submissions)
  const dbUser = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
  if (!dbUser) {
    return NextResponse.json({ reply: 'User not found.' }, { status: 404 });
  }
  // Attach latest survey submission and all survey data if present
  let latestSurvey = null;
  if (Array.isArray(dbUser.surveySubmissions) && dbUser.surveySubmissions.length > 0) {
    latestSurvey = dbUser.surveySubmissions[dbUser.surveySubmissions.length - 1];
  }
  // Prepare a user payload with all relevant fields
  const userPayload = {
    ...dbUser,
    latestSurvey,
    // Optionally, you can add more computed fields here
  };

  // Get the user query from the request body
  const body = await request.json();
  const userQuery = body.message;

  // Call the central coordinator agent (Python backend)
  try {
    const coordinatorUrl = process.env.COORDINATOR_URL || 'http://localhost:8000/agent';
    const agentRes = await fetch(coordinatorUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: userPayload,
        message: userQuery,
      }),
    });
    if (!agentRes.ok) {
      throw new Error('Coordinator agent error');
    }
    const agentData = await agentRes.json();
    return NextResponse.json({ reply: agentData.reply || 'No response from agent.' });
  } catch (err) {
    return NextResponse.json({ reply: 'Sorry, the AI agent is currently unavailable.' }, { status: 500 });
  }
}
