import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  token_type: string;
}

interface SalesforceLeadResponse {
  id: string;
  success: boolean;
  errors: any[];
}

async function verifySalesforceIntegration() {
  const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
  const SF_CLIENT_ID = process.env.SF_CLIENT_ID;
  const SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
  const SF_USERNAME = process.env.SF_USERNAME;
  const SF_PASSWORD = process.env.SF_PASSWORD;
  const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
  const SF_API_VERSION = process.env.SF_API_VERSION || 'v57.0';
  const SF_LOGIN_URL = 'https://login.salesforce.com';

  console.log('\nVerifying Salesforce Integration...\n');

  // Check environment variables
  console.log('1. Checking environment variables:');
  const missingVars = [];
  if (!SF_INSTANCE_URL) missingVars.push('SF_INSTANCE_URL');
  if (!SF_CLIENT_ID) missingVars.push('SF_CLIENT_ID');
  if (!SF_CLIENT_SECRET) missingVars.push('SF_CLIENT_SECRET');
  if (!SF_USERNAME) missingVars.push('SF_USERNAME');
  if (!SF_PASSWORD) missingVars.push('SF_PASSWORD');
  if (!SF_SECURITY_TOKEN) missingVars.push('SF_SECURITY_TOKEN');

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    return;
  }
  console.log('✅ All required environment variables are set');

  try {
    // Authenticate with Salesforce using password flow
    console.log('2. Authenticating with Salesforce...');
    const authResponse = await fetch(`${SF_LOGIN_URL}/services/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        client_id: SF_CLIENT_ID || '',
        client_secret: SF_CLIENT_SECRET || '',
        username: SF_USERNAME || '',
        password: `${SF_PASSWORD}${SF_SECURITY_TOKEN}` || '',
      }),
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Authentication failed:', {
        status: authResponse.status,
        error: errorText
      });
      return;
    }

    const { access_token, instance_url } = await authResponse.json() as SalesforceAuthResponse;
    console.log('✅ Successfully authenticated with Salesforce');

    // Test lead creation
    console.log('\n3. Testing lead creation:');
    const testLead = {
      FirstName: 'Test',
      LastName: 'Integration',
      Email: 'test@quotelinker.com',
      Phone: '1234567890',
      PostalCode: '12345',
      Company: 'Integration Test',
      LeadSource: 'QuoteLinker Web Test',
      Product_Type__c: 'auto',
      Status: 'Test',
    };

    const leadResponse = await fetch(
      `${instance_url}/services/data/${SF_API_VERSION}/sobjects/Lead/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(testLead),
      }
    );

    if (!leadResponse.ok) {
      const errorData = await leadResponse.text();
      console.error('❌ Lead creation failed:', {
        status: leadResponse.status,
        error: errorData
      });
      return;
    }

    const leadResult = await leadResponse.json() as SalesforceLeadResponse;
    console.log('✅ Successfully created test lead:', {
      id: leadResult.id,
      ...testLead
    });

    // Clean up test lead
    console.log('\n4. Cleaning up test lead:');
    const deleteResponse = await fetch(
      `${instance_url}/services/data/${SF_API_VERSION}/sobjects/Lead/${leadResult.id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      console.error('❌ Failed to delete test lead:', {
        status: deleteResponse.status,
        id: leadResult.id
      });
      return;
    }

    console.log('✅ Successfully deleted test lead');
    console.log('\n✅ All tests passed! Salesforce integration is working correctly.\n');

  } catch (error) {
    console.error('\n❌ Error during verification:', error);
  }
}

verifySalesforceIntegration(); 