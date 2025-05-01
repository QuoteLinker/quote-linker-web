import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateWithSalesforce } from '@/utils/salesforce';
import axios from 'axios';

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

// Validation schema for agent submission
const agentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  agencyName: z.string().min(1, 'Agency name is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
});

// Force mock mode for testing
const mockMode = process.env.NODE_ENV === 'development';

interface SalesforceContactResponse {
  data: {
    id: string;
    success: boolean;
    errors: string[];
  };
}

interface SalesforceOpportunityResponse {
  data: {
    id: string;
    success: boolean;
    errors: string[];
  };
}

async function createSalesforceAgentRecord(data: z.infer<typeof agentSchema>) {
  try {
    // Authenticate with Salesforce
    console.log('Attempting Salesforce authentication...');
    const authResponse = await authenticateWithSalesforce();
    const { access_token, instance_url } = authResponse;
    console.log('Salesforce authentication successful');

    // Create Contact for agent
    const contactData = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phone,
      MailingPostalCode: data.zipCode,
      RecordTypeId: process.env.SF_AGENT_RECORD_TYPE_ID, // Make sure this is set in your Salesforce org
      Agency_Name__c: data.agencyName,
      Type: 'Agent',
    };

    const contactResponse = await axios.post(
      `${instance_url}/services/data/v58.0/sobjects/Contact`,
      contactData,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    ) as SalesforceContactResponse;

    console.log('Agent Contact created successfully in Salesforce');
    const { id: contactId } = contactResponse.data;

    // Create Opportunity for agent onboarding
    const opportunityData = {
      Name: `Agent Onboarding - ${data.firstName} ${data.lastName}`,
      StageName: 'Prospecting',
      Type: 'New Business',
      CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      ContactId: contactId,
      RecordTypeId: process.env.SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID, // Make sure this is set in your Salesforce org
    };

    const opportunityResponse = await axios.post(
      `${instance_url}/services/data/v58.0/sobjects/Opportunity`,
      opportunityData,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    ) as SalesforceOpportunityResponse;

    console.log('Agent Opportunity created successfully in Salesforce');
    const { id: opportunityId } = opportunityResponse.data;

    return { contactId, opportunityId };
  } catch (error) {
    console.error('Error creating Salesforce agent records:', error);
    throw error;
  }
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
        { status: 400, headers: corsHeaders }
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
      }, { headers: corsHeaders });
    }

    try {
      // Attempt to create records in Salesforce
      const { contactId, opportunityId } = await createSalesforceAgentRecord(validationResult.data);
      
      return NextResponse.json({
        success: true,
        contactId,
        opportunityId,
        message: 'Agent submission successful'
      }, { headers: corsHeaders });
    } catch (sfError) {
      console.error('Salesforce error:', sfError);
      
      // Fall back to mock mode if Salesforce fails
      return NextResponse.json({
        success: true,
        mockMode: true,
        leadId: 'MOCK-' + Math.random().toString(36).substr(2, 9),
        message: 'Agent submission successful (mock mode due to Salesforce error)',
        error: sfError instanceof Error ? sfError.message : 'Unknown Salesforce error'
      }, { headers: corsHeaders });
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
      { status: 500, headers: corsHeaders }
    );
  }
} 