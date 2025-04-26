import { NextResponse } from 'next/server';
import { authenticateWithSalesforce, createSalesforceLead } from '@/utils/salesforce';

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      insuranceType,
      subLine,
      zipCode,
      heardAboutUs,
      notes
    } = await request.json();

    // Authenticate with Salesforce
    const { access_token, instance_url } = await authenticateWithSalesforce();

    // Prepare Lead Data
    const leadData = {
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Email: email,
      Company: 'QuoteLinker Lead', // Required by Salesforce
      PostalCode: zipCode,
      LeadSource: 'QuoteLinker',
      Description: notes || '',
      Custom_Insurance_Type__c: insuranceType, // Map to Salesforce custom field
      Custom_Sub_Line__c: subLine || '',
      Custom_Heard_About_Us__c: heardAboutUs || '',
      Status: 'Open - Not Contacted'
    };

    // Create Lead
    await createSalesforceLead(leadData, access_token, instance_url);

    return NextResponse.json({ message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Salesforce Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 