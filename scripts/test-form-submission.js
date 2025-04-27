import fetch from 'node-fetch';

async function testFormSubmission() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
    zipCode: '12345',
    age: '35',
    coverageAmount: '250000',
    termLength: '20',
    productType: 'life',
    subType: 'term',
    timestamp: new Date().toISOString(),
    source: 'quotelinker.com'
  };

  try {
    console.log('Testing form submission with data:', testData);
    
    const response = await fetch('https://hooks.zapier.com/hooks/catch/22689304/2phdsmv/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log('Submission successful!');
    console.log('Response:', result);
  } catch (error) {
    console.error('Error testing form submission:', error);
  }
}

testFormSubmission(); 