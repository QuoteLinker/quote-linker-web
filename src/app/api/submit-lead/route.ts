import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateWithSalesforce, createSalesforceLead, type SalesforceLeadData } from '@/utils/salesforce';

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  productType: z.enum(['auto', 'home', 'life', 'health']),
  subType: z.string().optional(),
  age: z.string().optional(),
  termLength: z.string().optional(),
  coverageAmount: z.string().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  coverageType: z.string().optional(),
  preExistingConditions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Check if required environment variables are set
    if (!process.env.SALESFORCE_LOGIN_URL || 
        !process.env.SALESFORCE_CLIENT_ID || 
        !process.env.SALESFORCE_CLIENT_SECRET || 
        !process.env.SALESFORCE_USERNAME || 
        !process.env.SALESFORCE_PASSWORD || 
        !process.env.SALESFORCE_TOKEN) {
      console.error('Missing required Salesforce environment variables');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    console.log('Received form data:', body);
    
    const validatedData = formSchema.parse(body);
    console.log('Validated data:', validatedData);

    try {
      // Authenticate with Salesforce
      console.log('Authenticating with Salesforce...');
      const { access_token, instance_url } = await authenticateWithSalesforce();
      console.log('Salesforce authentication successful');

      // Prepare Lead Data
      const leadData: SalesforceLeadData = {
        FirstName: validatedData.firstName,
        LastName: validatedData.lastName,
        Phone: validatedData.phone,
        Email: validatedData.email,
        Company: 'QuoteLinker Lead',
        PostalCode: validatedData.zipCode,
        LeadSource: 'QuoteLinker Web',
        Product_Type__c: validatedData.productType,
        Sub_Type__c: validatedData.subType,
        Age__c: validatedData.age,
        Term_Length__c: validatedData.termLength,
        Coverage_Amount__c: validatedData.coverageAmount,
        Occupation__c: validatedData.occupation,
        Income__c: validatedData.income,
        Coverage_Type__c: validatedData.coverageType,
        Pre_Existing_Conditions__c: validatedData.preExistingConditions,
        Status: 'Open - Not Contacted'
      };
      console.log('Prepared lead data:', leadData);

      // Create Lead in Salesforce
      console.log('Creating lead in Salesforce...');
      await createSalesforceLead(leadData, access_token, instance_url);
      console.log('Lead created successfully');

      return NextResponse.json({ success: true });
    } catch (sfError) {
      console.error('Salesforce operation failed:', sfError);
      return NextResponse.json(
        { error: 'Failed to process lead in Salesforce' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 