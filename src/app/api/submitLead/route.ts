import { NextResponse } from 'next/server';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  age?: string;
  coverageAmount?: string;
  notes?: string;
  productType: string;
  subType: string;
  leadSource: string;
}

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    // TODO: Implement actual Salesforce OAuth2 flow
    const sfClientId = process.env.SF_CLIENT_ID;
    const sfClientSecret = process.env.SF_CLIENT_SECRET;
    const sfInstanceUrl = process.env.SF_INSTANCE_URL;
    const sfApiVersion = process.env.SF_API_VERSION || 'v57.0';

    // Log the lead data for now
    console.log('Lead Submission:', {
      ...data,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });

    // TODO: Implement actual Salesforce API call
    // const response = await fetch(`${sfInstanceUrl}/services/data/${sfApiVersion}/sobjects/Lead`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     FirstName: data.firstName,
    //     LastName: data.lastName,
    //     Email: data.email,
    //     Phone: data.phone,
    //     PostalCode: data.zip,
    //     Age__c: data.age,
    //     Coverage_Amount__c: data.coverageAmount,
    //     Notes__c: data.notes,
    //     Product_Type__c: data.productType,
    //     Sub_Type__c: data.subType,
    //     LeadSource: data.leadSource
    //   })
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
} 