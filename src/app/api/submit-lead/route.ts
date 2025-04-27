import { NextResponse } from 'next/server';
import { z } from 'zod';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  productType: z.enum(['auto', 'home', 'life', 'health']),
  subType: z.string().optional(),
  age: z.string().optional(),
  termLength: z.string().optional(),
  coverageAmount: z.string().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  coverageType: z.string().optional(),
  preExistingConditions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = formSchema.parse(body);
    
    // Get Zapier webhook URL from environment variable
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (!zapierWebhookUrl) {
      console.error('Zapier webhook URL not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Send data to Zapier
    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...validatedData,
        source: 'quotelinker.com',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit lead to Zapier');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 