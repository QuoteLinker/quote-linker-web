import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateWithSalesforce, createSalesforceLead, SalesforceLeadData } from '@/utils/salesforce';

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
  try {
    // Authenticate with Salesforce
    console.log('Attempting Salesforce authentication...');
    const authResponse = await authenticateWithSalesforce();
    const { access_token, instance_url } = authResponse;
    console.log('Salesforce authentication successful');

    // Create Lead in Salesforce
    const leadData: SalesforceLeadData = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phone,
      PostalCode: data.zipCode,
      Company: 'QuoteLinker',
      LeadSource: 'QuoteLinker Web',
      Product_Type__c: data.productType,
      Sub_Type__c: data.subType,
      Age__c: data.age,
      Coverage_Amount__c: data.coverageAmount,
      Status: 'New',
    };

    await createSalesforceLead(leadData, access_token, instance_url);
    console.log('Lead created successfully in Salesforce');

    return { success: true };
  } catch (error) {
    console.error('Error creating Salesforce records:', error);
    throw error;
  }
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
        message: 'Lead submitted successfully (mock mode)'
      }, { headers: corsHeaders });
    }

    try {
      // Attempt to create records in Salesforce
      const result = await createSalesforceRecords(validationResult.data);
      
      return NextResponse.json({
        success: true,
        message: 'Lead submitted successfully'
      }, { headers: corsHeaders });
    } catch (sfError) {
      console.error('Salesforce error:', sfError);
      
      // Fall back to mock mode if Salesforce fails
      return NextResponse.json({
        success: true,
        mockMode: true,
        leadId: 'MOCK-' + Math.random().toString(36).substr(2, 9),
        message: 'Lead submitted successfully (mock mode due to Salesforce error)',
        error: sfError instanceof Error ? sfError.message : 'Unknown Salesforce error'
      }, { headers: corsHeaders });
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
      { status: 500, headers: corsHeaders }
    );
  }
} 