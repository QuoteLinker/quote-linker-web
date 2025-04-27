import { NextResponse } from 'next/server';
import { z } from 'zod';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Validation schema for lead submission
const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits'),
  productType: z.string().min(1, 'Product type is required'),
  subType: z.string().min(1, 'Sub type is required'),
  age: z.string().optional(),
  coverageAmount: z.string().optional(),
  notes: z.string().optional(),
});

// Force mock mode for testing
const mockMode = process.env.NODE_ENV === 'development';

async function createSalesforceRecords(data: z.infer<typeof leadSchema>) {
  const sfLoginUrl = process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com';
  const sfClientId = process.env.SALESFORCE_CLIENT_ID;
  const sfClientSecret = process.env.SALESFORCE_CLIENT_SECRET;
  const sfUsername = process.env.SALESFORCE_USERNAME;
  const sfPassword = process.env.SALESFORCE_PASSWORD;
  const sfSecurityToken = process.env.SALESFORCE_TOKEN;
  const sfApiVersion = process.env.SF_API_VERSION || 'v57.0';

  // Log environment variables (without sensitive data)
  console.log('Salesforce Configuration:', {
    loginUrl: sfLoginUrl,
    clientId: sfClientId ? '***' : 'missing',
    clientSecret: sfClientSecret ? '***' : 'missing',
    username: sfUsername ? '***' : 'missing',
    password: sfPassword ? '***' : 'missing',
    securityToken: sfSecurityToken ? '***' : 'missing',
    apiVersion: sfApiVersion
  });

  if (!sfClientId || !sfClientSecret || !sfUsername || !sfPassword || !sfSecurityToken) {
    const missingVars = [];
    if (!sfClientId) missingVars.push('SALESFORCE_CLIENT_ID');
    if (!sfClientSecret) missingVars.push('SALESFORCE_CLIENT_SECRET');
    if (!sfUsername) missingVars.push('SALESFORCE_USERNAME');
    if (!sfPassword) missingVars.push('SALESFORCE_PASSWORD');
    if (!sfSecurityToken) missingVars.push('SALESFORCE_TOKEN');
    throw new Error(`Missing Salesforce credentials: ${missingVars.join(', ')}`);
  }

  // Authenticate with Salesforce
  console.log('Attempting Salesforce authentication...');
  const authResponse = await fetch(`${sfLoginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      client_id: sfClientId,
      client_secret: sfClientSecret,
      username: sfUsername,
      password: `${sfPassword}${sfSecurityToken}`,
    }),
  });

  if (!authResponse.ok) {
    const errorText = await authResponse.text();
    console.error('Salesforce authentication error:', {
      status: authResponse.status,
      statusText: authResponse.statusText,
      error: errorText
    });
    throw new Error(`Failed to authenticate with Salesforce: ${errorText}`);
  }

  const authData = await authResponse.json();
  console.log('Salesforce authentication successful');
  const { access_token, instance_url } = authData;

  // Create Contact
  const contactData = {
    FirstName: data.firstName,
    LastName: data.lastName,
    Email: data.email,
    Phone: data.phone,
    MailingPostalCode: data.zipCode,
    Product_Type__c: data.productType,
    Sub_Type__c: data.subType,
    Age__c: data.age,
    Coverage_Amount__c: data.coverageAmount,
    Notes__c: data.notes,
  };

  const contactResponse = await fetch(
    `${instance_url}/services/data/${sfApiVersion}/sobjects/Contact`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(contactData),
    }
  );

  if (!contactResponse.ok) {
    throw new Error('Failed to create Contact in Salesforce');
  }

  const { id: contactId } = await contactResponse.json();

  // Create Opportunity
  const opportunityData = {
    Name: `Quote Request - ${data.firstName} ${data.lastName}`,
    StageName: 'Prospecting',
    Type: 'New Business',
    CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    ContactId: contactId,
    Product_Type__c: data.productType,
    Sub_Type__c: data.subType,
    Amount: data.coverageAmount ? parseFloat(data.coverageAmount) : null,
  };

  const opportunityResponse = await fetch(
    `${instance_url}/services/data/${sfApiVersion}/sobjects/Opportunity`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(opportunityData),
    }
  );

  if (!opportunityResponse.ok) {
    throw new Error('Failed to create Opportunity in Salesforce');
  }

  const { id: opportunityId } = await opportunityResponse.json();

  return { contactId, opportunityId };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the incoming request data
    console.log('Received lead submission:', {
      ...body,
      timestamp: new Date().toISOString(),
      mockMode
    });

    // Validate the request data
    const validationResult = leadSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.warn('Validation failed:', validationResult.error);
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    // If in mock mode, return mock success response
    if (mockMode) {
      console.log('Running in mock mode - returning mock success response');
      return NextResponse.json({
        success: true,
        mockMode: true,
        leadId: 'MOCK-' + Math.random().toString(36).substr(2, 9),
        message: 'Lead submitted successfully (mock mode)'
      });
    }

    try {
      // Attempt to create records in Salesforce
      const { contactId, opportunityId } = await createSalesforceRecords(validationResult.data);
      
      return NextResponse.json({
        success: true,
        contactId,
        opportunityId,
        message: 'Lead submitted successfully'
      });
    } catch (sfError) {
      console.error('Salesforce error:', sfError);
      
      // Fall back to mock mode if Salesforce fails
      return NextResponse.json({
        success: true,
        mockMode: true,
        leadId: 'MOCK-' + Math.random().toString(36).substr(2, 9),
        message: 'Lead submitted successfully (mock mode due to Salesforce error)',
        error: sfError instanceof Error ? sfError.message : 'Unknown Salesforce error'
      });
    }

  } catch (error) {
    console.error('Error processing lead submission:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while processing your request';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 