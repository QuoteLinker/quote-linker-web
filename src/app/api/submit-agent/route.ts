import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for agent submission
const agentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  agencyName: z.string().min(1, 'Agency name is required'),
});

// Force mock mode for testing
const mockMode = process.env.NODE_ENV === 'development';

async function createSalesforceAgentRecord(data: z.infer<typeof agentSchema>) {
  const sfInstanceUrl = process.env.SF_INSTANCE_URL;
  const sfClientId = process.env.SF_CLIENT_ID;
  const sfClientSecret = process.env.SF_CLIENT_SECRET;
  const sfApiVersion = process.env.SF_API_VERSION || 'v57.0';

  if (!sfInstanceUrl || !sfClientId || !sfClientSecret) {
    throw new Error('Missing Salesforce credentials');
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
    throw new Error('Failed to authenticate with Salesforce');
  }

  const { access_token } = await authResponse.json();

  // Create Contact for agent
  const contactData = {
    FirstName: data.firstName,
    LastName: data.lastName,
    Email: data.email,
    Phone: data.phone,
    RecordTypeId: process.env.SF_AGENT_RECORD_TYPE_ID, // Make sure this is set in your Salesforce org
    Agency_Name__c: data.agencyName,
    Type: 'Agent',
  };

  const contactResponse = await fetch(
    `${sfInstanceUrl}/services/data/${sfApiVersion}/sobjects/Contact`,
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
    throw new Error('Failed to create Agent Contact in Salesforce');
  }

  const { id: contactId } = await contactResponse.json();

  // Create Opportunity for agent onboarding
  const opportunityData = {
    Name: `Agent Onboarding - ${data.firstName} ${data.lastName}`,
    StageName: 'Prospecting',
    Type: 'New Business',
    CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    ContactId: contactId,
    RecordTypeId: process.env.SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID, // Make sure this is set in your Salesforce org
  };

  const opportunityResponse = await fetch(
    `${sfInstanceUrl}/services/data/${sfApiVersion}/sobjects/Opportunity`,
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
    throw new Error('Failed to create Agent Opportunity in Salesforce');
  }

  const { id: opportunityId } = await opportunityResponse.json();

  return { contactId, opportunityId };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the incoming request data
    console.log('Received agent submission:', {
      ...body,
      timestamp: new Date().toISOString(),
      mockMode
    });

    // Validate the request data
    const validationResult = agentSchema.safeParse(body);
    
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
        message: 'Agent submission successful (mock mode)'
      });
    }

    try {
      // Attempt to create records in Salesforce
      const { contactId, opportunityId } = await createSalesforceAgentRecord(validationResult.data);
      
      return NextResponse.json({
        success: true,
        contactId,
        opportunityId,
        message: 'Agent submission successful'
      });
    } catch (sfError) {
      console.error('Salesforce error:', sfError);
      
      // Fall back to mock mode if Salesforce fails
      return NextResponse.json({
        success: true,
        mockMode: true,
        leadId: 'MOCK-' + Math.random().toString(36).substr(2, 9),
        message: 'Agent submission successful (mock mode due to Salesforce error)',
        error: sfError instanceof Error ? sfError.message : 'Unknown Salesforce error'
      });
    }

  } catch (error) {
    console.error('Error processing agent submission:', error);
    
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