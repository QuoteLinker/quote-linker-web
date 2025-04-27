#!/usr/bin/env node

/**
 * Test script to verify lead submissions for all insurance types
 * This script sends test leads to the Zapier webhook for each insurance type
 * and verifies the response.
 */

// Import node-fetch correctly
import fetch from 'node-fetch';

// Zapier webhook URL
const ZAPIER_WEBHOOK_URL = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/22689304/2phdsmv/';

// Test data for different insurance types
const testLeads = [
  {
    productType: 'auto',
    subType: 'auto',
    firstName: 'Test',
    lastName: 'Auto',
    email: 'test.auto@example.com',
    phone: '5551234567',
    zipCode: '12345',
    vehicleYear: '2020',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry'
  },
  {
    productType: 'home',
    subType: 'home',
    firstName: 'Test',
    lastName: 'Home',
    email: 'test.home@example.com',
    phone: '5551234568',
    zipCode: '12345',
    address: '123 Test St',
    propertyType: 'single',
    yearBuilt: '2010'
  },
  {
    productType: 'life',
    subType: 'term',
    firstName: 'Test',
    lastName: 'Life',
    email: 'test.life@example.com',
    phone: '5551234569',
    zipCode: '12345',
    age: '35',
    coverageAmount: '500000',
    termLength: '20'
  },
  {
    productType: 'health',
    subType: 'std',
    firstName: 'Test',
    lastName: 'Health',
    email: 'test.health@example.com',
    phone: '5551234570',
    zipCode: '12345',
    occupation: 'Software Engineer',
    income: '120000',
    coverageType: 'short'
  }
];

// Function to submit a test lead
async function submitTestLead(leadData) {
  console.log(`\nSubmitting test lead for ${leadData.productType} insurance...`);
  
  try {
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
        source: 'test-script'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(`✅ Successfully submitted ${leadData.productType} lead to Zapier`);
    return true;
  } catch (error) {
    console.error(`❌ Error submitting ${leadData.productType} lead:`, error.message);
    return false;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('🧪 Starting lead submission tests...');
  console.log(`Using Zapier webhook: ${ZAPIER_WEBHOOK_URL}`);
  
  let successCount = 0;
  let failureCount = 0;
  
  for (const lead of testLeads) {
    const success = await submitTestLead(lead);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Add a small delay between submissions
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Successful submissions: ${successCount}`);
  console.log(`❌ Failed submissions: ${failureCount}`);
  
  if (failureCount > 0) {
    console.log('\n⚠️ Some tests failed. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed successfully!');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 