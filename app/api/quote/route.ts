import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for quote request
const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?1?\d{10,}$/, 'Invalid phone number'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  type: z.enum(['auto', 'home', 'life', 'term', 'whole', 'disability', 'supplemental']),
  _honeypot: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = quoteSchema.parse(body);
    
    // Check honeypot
    if (validatedData._honeypot) {
      // Silently reject spam submissions
      return NextResponse.json({ success: true });
    }

    // Remove honeypot field before sending to Zapier
    const { _honeypot, ...cleanData } = validatedData;

    // Forward to Zapier
    const zapierResponse = await fetch(process.env.ZAPIER_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanData),
    });

    if (!zapierResponse.ok) {
      throw new Error('Failed to forward to Zapier');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Quote request received successfully'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Quote submission error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
} 