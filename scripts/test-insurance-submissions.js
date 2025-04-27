import fetch from 'node-fetch';

// Insurance types from the codebase (using lowercase to match API expectations)
const insuranceTypes = [
  { type: 'auto', label: 'AUTO' },
  { type: 'home', label: 'HOME' },
  { type: 'term', label: 'TERM_LIFE' },
  { type: 'life', label: 'PERMANENT_LIFE' },
  { type: 'disability', label: 'SHORT_TERM_DISABILITY' },
  { type: 'health', label: 'SUPPLEMENTAL_HEALTH' }
];

// Base test data
const baseTestData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '1234567890',
  zipCode: '12345',
  timestamp: new Date().toISOString(),
  source: 'test-script'
};

// Function to generate test data for a specific insurance type
function generateTestData(insuranceTypeObj) {
  const data = { ...baseTestData, insuranceType: insuranceTypeObj.type };
  
  // Add type-specific fields
  switch (insuranceTypeObj.label) {
    case 'TERM_LIFE':
    case 'PERMANENT_LIFE':
      data.age = '35';
      data.tobaccoUse = 'no';
      break;
    case 'SHORT_TERM_DISABILITY':
    case 'SUPPLEMENTAL_HEALTH':
      data.preExistingConditions = 'no';
      break;
    case 'AUTO':
      data.vehicleDetails = '2020 Toyota Camry';
      break;
    case 'HOME':
      data.propertyAddress = '123 Test St, Minneapolis, MN 55401';
      break;
  }
  
  return data;
}

// Function to test form submission for a specific insurance type
async function testInsuranceSubmission(insuranceTypeObj) {
  const testData = generateTestData(insuranceTypeObj);
  
  console.log(`Testing ${insuranceTypeObj.label} submission with data:`, testData);
  
  try {
    const response = await fetch('https://quotelinker.com/api/submit-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ ${insuranceTypeObj.label} submission failed:`, response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log(`✅ ${insuranceTypeObj.label} submission successful:`, result);
    return true;
  } catch (error) {
    console.error(`❌ ${insuranceTypeObj.label} submission error:`, error);
    return false;
  }
}

// Main function to test all insurance types
async function testAllInsuranceSubmissions() {
  console.log('Starting insurance submission tests...');
  
  const results = {};
  
  for (const insuranceType of insuranceTypes) {
    results[insuranceType.label] = await testInsuranceSubmission(insuranceType);
    
    // Add a delay between submissions to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\nTest Results Summary:');
  console.log('=====================');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (const [type, success] of Object.entries(results)) {
    console.log(`${type}: ${success ? '✅ Success' : '❌ Failed'}`);
    if (success) successCount++;
    else failureCount++;
  }
  
  console.log(`\nTotal: ${successCount} successful, ${failureCount} failed`);
  
  if (failureCount > 0) {
    console.log('\nSome tests failed. Please check the logs above for details.');
    process.exit(1);
  } else {
    console.log('\nAll tests passed successfully!');
  }
}

// Run the tests
testAllInsuranceSubmissions().catch(error => {
  console.error('Test script error:', error);
  process.exit(1);
}); 