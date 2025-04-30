import { NextResponse } from 'next/server';

interface AgentLoginData {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: AgentLoginData = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if the user exists in the database
    // 2. Verify the password using bcrypt or similar
    // 3. Generate a JWT token or session
    // 4. Return the token/session to the client

    // For demo purposes, we'll simulate a successful login
    // with a mock agent ID and token
    const mockAgentId = Math.random().toString(36).substring(7);
    const mockToken = Math.random().toString(36).substring(7);

    return NextResponse.json({
      message: 'Login successful',
      agentId: mockAgentId,
      token: mockToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 