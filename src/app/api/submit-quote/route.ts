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
  insuranceType: z.enum(['auto', 'home', 'life', 'health', 'disability', 'term'] as const),
  // Add other fields based on insurance type
  age: z.string().optional(),
  tobaccoUse: z.string().optional(),
  termLength: z.string().optional(),
  coverageAmount: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  address: z.string().optional(),
  propertyType: z.string().optional(),
  yearBuilt: z.string().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  coverageType: z.string().optional(),
  preExistingConditions: z.string().optional(),
  // Honeypot field
  website: z.string().optional(),
});

// Rate limiting map (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

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

    // Get Zapier webhook URL from environment variable
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (!zapierWebhookUrl) {
      console.error('Zapier webhook URL not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Send data to Zapier with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          source: 'quotelinker.com',
          timestamp: new Date().toISOString(),
          ip: ip,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Zapier responded with status: ${response.status}`);
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    // Return generic error message to prevent information leakage
    return NextResponse.json(
      { error: 'There was an error processing your submission' },
      { status: 500 }
    );
  }
} 