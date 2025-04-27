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
});

// Rate limiting map (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const rateLimitData = rateLimit.get(ip) || { count: 0, timestamp: now };
    
    if (now - rateLimitData.timestamp > RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      rateLimitData.count = 0;
      rateLimitData.timestamp = now;
    }
    
    if (rateLimitData.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Increment rate limit counter
    rateLimitData.count++;
    rateLimit.set(ip, rateLimitData);
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = formSchema.parse(body);
    
    // Get Salesforce credentials from environment variables
    const sfClientId = process.env.SF_CLIENT_ID;
    const sfClientSecret = process.env.SF_CLIENT_SECRET;
    const sfInstanceUrl = process.env.SF_INSTANCE_URL;
    const sfApiVersion = process.env.SF_API_VERSION || 'v57.0';
    
    if (!sfClientId || !sfClientSecret || !sfInstanceUrl) {
      console.error('Missing Salesforce credentials');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Authenticate with Salesforce
    const authResponse = await fetch(`${sfInstanceUrl}/services/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: sfClientId,
        client_secret: sfClientSecret,
      }),
    });
    
    if (!authResponse.ok) {
      console.error('Salesforce authentication failed:', await authResponse.text());
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 500 }
      );
    }
    
    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    
    // Create lead in Salesforce
    const leadData = {
      FirstName: validatedData.firstName,
      LastName: validatedData.lastName,
      Email: validatedData.email,
      Phone: validatedData.phone,
      PostalCode: validatedData.postalCode,
      Product_Type__c: validatedData.productType,
      Sub_Type__c: validatedData.subType || '',
      LeadSource: 'QuoteLinker Web',
    };
    
    const leadResponse = await fetch(
      `${sfInstanceUrl}/services/data/${sfApiVersion}/sobjects/Lead/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(leadData),
      }
    );
    
    if (!leadResponse.ok) {
      console.error('Salesforce lead creation failed:', await leadResponse.text());
      return NextResponse.json(
        { success: false, error: 'Failed to create lead' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 