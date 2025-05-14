import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { trackContactSubmission } from '@/utils/gtm';

// Create a new ratelimiter that allows 3 requests per hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
});

export async function POST(request: Request) {
  try {
    // Get the IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // TODO: Add your contact form processing logic here
    // This could include:
    // 1. Sending an email notification
    // 2. Creating a support ticket
    // 3. Storing in a database
    // 4. etc.
    
    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      rateLimit: {
        limit,
        reset,
        remaining,
      },
    });
    
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 