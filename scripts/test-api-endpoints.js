#!/usr/bin/env node

/**
 * This script tests the API endpoints with curl.
 * It sends test data to the /api/submit-lead and /api/submit-agent endpoints.
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Test data
const testLeadData = {
  firstName: 'Test',
  lastName: 'Lead',
  email: 'test.lead@example.com',
  phone: '1234567890',
  zipCode: '12345',
  productType: 'auto',
  subType: 'comprehensive',
  age: '30',
  coverageAmount: '50000',
  notes: 'Test lead submission'
};

const testAgentData = {
  firstName: 'Test',
  lastName: 'Agent',
  email: 'test.agent@example.com',
  phone: '1234567890',
  agencyName: 'Test Agency',
  zipCode: '12345'
};

// Function to run curl command
function runCurl(endpoint, data) {
  try {
    console.log(`\nTesting ${endpoint}...`);
    const curlCommand = `curl -X POST https://www.quotelinker.com${endpoint} \\
      -H "Content-Type: application/json" \\
      -d '${JSON.stringify(data)}'`;
    
    console.log('Running command:', curlCommand);
    const result = execSync(curlCommand, { encoding: 'utf8' });
    console.log('Response:', result);
    return true;
  } catch (error) {
    console.error(`Error testing ${endpoint}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('Testing API Endpoints\n');
  
  // Test /api/submit-lead
  const leadResult = runCurl('/api/submit-lead', testLeadData);
  
  // Test /api/submit-agent
  const agentResult = runCurl('/api/submit-agent', testAgentData);
  
  console.log('\nTest Results:');
  console.log(`- /api/submit-lead: ${leadResult ? '✅ Success' : '❌ Failed'}`);
  console.log(`- /api/submit-agent: ${agentResult ? '✅ Success' : '❌ Failed'}`);
  
  rl.close();
}

main(); 