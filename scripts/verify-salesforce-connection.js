#!/usr/bin/env node

/**
 * This script verifies the Salesforce connection by attempting to authenticate
 * and create a test lead in Salesforce.
 */

const { authenticateWithSalesforce, createSalesforceLead } = require('../src/utils/salesforce');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function verifySalesforceConnection() {
  console.log('Verifying Salesforce Connection\n');
  
  try {
    // Check environment variables
    console.log('1. Checking environment variables...');
    const requiredVars = [
      'SALESFORCE_LOGIN_URL',
      'SALESFORCE_CLIENT_ID',
      'SALESFORCE_CLIENT_SECRET',
      'SALESFORCE_USERNAME',
      'SALESFORCE_PASSWORD',
      'SALESFORCE_TOKEN'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing required environment variables:');
      missingVars.forEach(varName => console.error(`   - ${varName}`));
      return;
    }
    
    console.log('✅ All required environment variables are set');
    
    // Authenticate with Salesforce
    console.log('\n2. Authenticating with Salesforce...');
    const authResponse = await authenticateWithSalesforce();
    console.log('✅ Successfully authenticated with Salesforce');
    console.log(`   Instance URL: ${authResponse.instance_url}`);
    
    // Create test lead
    console.log('\n3. Creating test lead in Salesforce...');
    const testLeadData = {
      FirstName: 'Test',
      LastName: 'Connection',
      Email: 'test.connection@example.com',
      Phone: '1234567890',
      Company: 'QuoteLinker',
      PostalCode: '12345',
      LeadSource: 'QuoteLinker Web Test',
      Product_Type__c: 'auto',
      Status: 'New'
    };
    
    await createSalesforceLead(
      testLeadData,
      authResponse.access_token,
      authResponse.instance_url
    );
    
    console.log('✅ Successfully created test lead in Salesforce');
    console.log('\n✅ Salesforce connection verified successfully!');
    
  } catch (error) {
    console.error('\n❌ Error verifying Salesforce connection:');
    console.error(error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

verifySalesforceConnection(); 