import fetch from 'node-fetch';

const testData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '1234567890',
  zipCode: '12345',
  timestamp: new Date().toISOString(),
  source: 'test-script',
  insuranceType: 'health',
  preExistingConditions: 'no'
};

async function testHealthSubmission() {
  console.log('Testing SUPPLEMENTAL_HEALTH submission with data:', testData);
  
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
      console.error('❌ SUPPLEMENTAL_HEALTH submission failed:', response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ SUPPLEMENTAL_HEALTH submission successful:', result);
    return true;
  } catch (error) {
    console.error('❌ SUPPLEMENTAL_HEALTH submission error:', error);
    return false;
  }
}

// Run the test
testHealthSubmission().catch(error => {
  console.error('Test script error:', error);
  process.exit(1);
}); 