import { NextResponse } from 'next/server';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productType: string;
  subType?: string;
  [key: string]: any;
}

async function getSalesforceToken() {
  const response = await fetch(`${process.env.SF_INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SF_CLIENT_ID!,
      client_secret: process.env.SF_CLIENT_SECRET!,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function createSalesforceLead(accessToken: string, leadData: LeadData) {
  const response = await fetch(
    `${process.env.SF_INSTANCE_URL}/services/data/v${process.env.SF_API_VERSION}/sobjects/Lead`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: leadData.firstName,
        LastName: leadData.lastName,
        Email: leadData.email,
        Phone: leadData.phone,
        Product_Type__c: leadData.productType,
        Sub_Type__c: leadData.subType || '',
        // Add any additional fields from leadData
        ...Object.entries(leadData)
          .filter(([key]) => !['firstName', 'lastName', 'email', 'phone', 'productType', 'subType'].includes(key))
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      }),
    }
  );

  return response.json();
}

export async function POST(request: Request) {
  try {
    const leadData: LeadData = await request.json();

    // Get Salesforce access token
    const accessToken = await getSalesforceToken();

    // Create lead in Salesforce
    const result = await createSalesforceLead(accessToken, leadData);

    // Log success
    console.log('Lead created successfully:', result);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    // Log error
    console.error('Error creating lead:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
} 