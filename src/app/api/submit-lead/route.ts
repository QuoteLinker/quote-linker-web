import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateWithSalesforce, createSalesforceLead } from '@/utils/salesforce';

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
    // Parse and validate request body
    const body = await request.json();
    const validatedData = formSchema.parse(body);

    // Authenticate with Salesforce
    const { access_token, instance_url } = await authenticateWithSalesforce();

    // Prepare Lead Data
    const leadData = {
      FirstName: validatedData.firstName,
      LastName: validatedData.lastName,
      Phone: validatedData.phone,
      Email: validatedData.email,
      Company: 'QuoteLinker Lead', // Required by Salesforce
      PostalCode: validatedData.zipCode,
      LeadSource: 'QuoteLinker Web',
      Product_Type__c: validatedData.productType,
      Sub_Type__c: validatedData.subType || '',
      Age__c: validatedData.age || '',
      Term_Length__c: validatedData.termLength || '',
      Coverage_Amount__c: validatedData.coverageAmount || '',
      Occupation__c: validatedData.occupation || '',
      Income__c: validatedData.income || '',
      Coverage_Type__c: validatedData.coverageType || '',
      Pre_Existing_Conditions__c: validatedData.preExistingConditions || '',
      Status: 'Open - Not Contacted'
    };

    // Create Lead in Salesforce
    await createSalesforceLead(leadData, access_token, instance_url);

    return NextResponse.json({ success: true });
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