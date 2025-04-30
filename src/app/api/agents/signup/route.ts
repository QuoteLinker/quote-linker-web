import { NextResponse } from 'next/server';

interface AgentSignupData {
  firstName: string;
  lastName: string;
  email: string;
  agencyName: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const data: AgentSignupData = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'agencyName', 'password'];
    for (const field of requiredFields) {
      if (!data[field as keyof AgentSignupData]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Hash the password
    // 2. Check if the email is already registered
    // 3. Store the agent data in a database
    // 4. Create a session or JWT token
    // 5. Send a welcome email

    // For now, we'll just simulate a successful signup
    const agentId = Math.random().toString(36).substring(2, 15);

    return NextResponse.json({
      message: 'Agent signed up successfully',
      agentId,
    });
  } catch (error) {
    console.error('Error in agent signup:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 