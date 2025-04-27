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
  // Auto Insurance
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
  // Home Insurance
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
  // Life Insurance - Term
  {
    productType: 'life',
    subType: 'term',
    firstName: 'Test',
    lastName: 'LifeTerm',
    email: 'test.life.term@example.com',
    phone: '5551234569',
    zipCode: '12345',
    age: '35',
    coverageAmount: '500000',
    termLength: '20'
  },
  // Life Insurance - Permanent
  {
    productType: 'life',
    subType: 'permanent',
    firstName: 'Test',
    lastName: 'LifePerm',
    email: 'test.life.perm@example.com',
    phone: '5551234570',
    zipCode: '12345',
    age: '35',
    coverageAmount: '250000'
  },
  // Health Insurance - Short Term Disability
  {
    productType: 'health',
    subType: 'std',
    firstName: 'Test',
    lastName: 'HealthSTD',
    email: 'test.health.std@example.com',
    phone: '5551234571',
    zipCode: '12345',
    occupation: 'Software Engineer',
    income: '120000',
    coverageType: 'short'
  },
  // Health Insurance - Supplemental Health
  {
    productType: 'health',
    subType: 'supplemental',
    firstName: 'Test',
    lastName: 'HealthSupp',
    email: 'test.health.supp@example.com',
    phone: '5551234572',
    zipCode: '12345',
    age: '35',
    preExistingConditions: 'none'
  }
];

// Function to submit a test lead
async function submitTestLead(leadData) {
  console.log(`\nSubmitting test lead for ${leadData.productType} insurance (${leadData.subType})...`);
  
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

    const responseText = await response.text();
    console.log(`✅ Successfully submitted ${leadData.productType} (${leadData.subType}) lead to Zapier`);
    console.log(`Response: ${responseText}`);
    return true;
  } catch (error) {
    console.error(`❌ Error submitting ${leadData.productType} (${leadData.subType}) lead:`, error.message);
    return false;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('🧪 Starting lead submission tests...');
  console.log(`Using Zapier webhook: ${ZAPIER_WEBHOOK_URL}`);
  
  let successCount = 0;
  let failureCount = 0;
  const failures = [];
  
  for (const lead of testLeads) {
    const success = await submitTestLead(lead);
    if (success) {
      successCount++;
    } else {
      failureCount++;
      failures.push(`${lead.productType} (${lead.subType})`);
    }
    
    // Add a small delay between submissions to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Successful submissions: ${successCount}`);
  console.log(`❌ Failed submissions: ${failureCount}`);
  
  if (failureCount > 0) {
    console.log('\n❌ Failed submissions for:');
    failures.forEach(failure => console.log(`  - ${failure}`));
    console.log('\n⚠️ Some tests failed. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed successfully!');
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 