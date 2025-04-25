import { NextResponse } from 'next/server';
import { InsuranceType } from '@/utils/insuranceCopy';
import { z } from 'zod';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
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

export async function POST(request: Request) {
  try {
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
      throw new Error('Zapier webhook URL not configured');
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
      throw new Error('Failed to send data to Zapier');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Return generic error message to prevent information leakage
    return NextResponse.json(
      { error: 'There was an error processing your submission' },
      { status: 500 }
    );
  }
} 