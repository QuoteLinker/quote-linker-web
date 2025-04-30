import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a rate limiter instance
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

// Validation schema for the form data
const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  insuranceType: z.string().min(1, 'Insurance type is required'),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Get the client's IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Check honeypot field
    if (body.honeypot) {
      return NextResponse.json({ error: 'Form submission rejected.' }, { status: 400 });
    }

    // Validate form data
    const validatedData = FormSchema.parse(body);

    // Prepare data for Zapier
    const zapierData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      zipCode: validatedData.zipCode,
      insuranceType: validatedData.insuranceType,
      submittedAt: new Date().toISOString(),
    };

    // Send data to Zapier webhook
    const zapierUrl =
      process.env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/123456/abcdef/';
    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierData),
    });

    if (!zapierResponse.ok) {
      throw new Error('Failed to submit to Zapier');
    }

    // Log successful submission
    console.log('Form submitted successfully:', {
      ...zapierData,
      zapierStatus: zapierResponse.status,
    });

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Form submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}
