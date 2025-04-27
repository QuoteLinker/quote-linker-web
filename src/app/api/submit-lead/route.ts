import { NextResponse } from 'next/server';
import { z } from 'zod';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  productType: z.enum(['auto', 'home', 'life', 'health']),
  subType: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Check required environment variables
    const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
    const SF_CLIENT_ID = process.env.SF_CLIENT_ID;
    const SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
    const SF_API_VERSION = process.env.SF_API_VERSION || 'v57.0';

    if (!SF_INSTANCE_URL || !SF_CLIENT_ID || !SF_CLIENT_SECRET) {
      console.error('Missing required Salesforce environment variables');
      return NextResponse.json(
        { success: false, error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const formData = formSchema.parse(await request.json());

    // Authenticate with Salesforce
    const authResponse = await fetch(`${SF_INSTANCE_URL}/services/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SF_CLIENT_ID,
        client_secret: SF_CLIENT_SECRET,
      }),
    });

    if (!authResponse.ok) {
      console.error('Salesforce authentication failed:', await authResponse.text());
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 500 }
      );
    }

    const { access_token } = await authResponse.json();

    // Create lead in Salesforce
    const leadData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      Phone: formData.phone,
      PostalCode: formData.zipCode,
      LeadSource: "QuoteLinker Web",
      Product_Type__c: formData.productType,
      Sub_Type__c: formData.subType || ''
    };

    const leadResponse = await fetch(
      `${SF_INSTANCE_URL}/services/data/${SF_API_VERSION}/sobjects/Lead/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
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