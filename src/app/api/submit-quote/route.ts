import { NextResponse } from 'next/server';
import { InsuranceType } from '@/utils/insuranceCopy';
import { z } from 'zod';
import { headers } from 'next/headers';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits'),
  insuranceType: z.string(),
  subType: z.string().optional(),
  age: z.string().optional(),
  tobaccoUse: z.string().optional(),
  coverageAmount: z.string().optional(),
  vehicleDetails: z.string().optional(),
  propertyAddress: z.string().optional(),
  // Honeypot field
  website: z.string().optional(),
}).refine((data) => {
  // Require age for health insurance types
  if (data.insuranceType === 'SHORT_TERM_DISABILITY' || data.insuranceType === 'SUPPLEMENTAL_HEALTH') {
    return !!data.age;
  }
  return true;
}, {
  message: "Age is required for health insurance options",
  path: ["age"]
});

// Rate limiting map (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

// Default Zapier webhook URL for Google Sheets integration
const DEFAULT_ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/22689304/2phdsmv/';
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || DEFAULT_ZAPIER_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check
    const now = Date.now();
    const userRateLimit = rateLimit.get(ip);
    
    if (userRateLimit) {
      if (now - userRateLimit.timestamp < RATE_LIMIT_WINDOW) {
        if (userRateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        userRateLimit.count++;
      } else {
        rateLimit.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    const data = await request.json();

    // Check honeypot field
    if (data.website) {
      // Silently return success for spam submissions
      return NextResponse.json({ success: true });
    }

    // Validate form data
    const validatedData = formSchema.parse(data);

    // For development/testing, log the data but still try to submit to Zapier
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Form data:', validatedData);
    }

    // Send data to Zapier
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...validatedData,
        timestamp: new Date().toISOString(),
        source: 'quote-linker-web',
        page: `${validatedData.insuranceType.toLowerCase()}${validatedData.subType ? `-${validatedData.subType.toLowerCase()}` : ''}`,
      }),
    });

    if (!response.ok) {
      console.error('Failed to submit to Zapier:', await response.text());
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting quote:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'An error occurred while submitting your form. Please try again.' },
      { status: 500 }
    );
  }
} 