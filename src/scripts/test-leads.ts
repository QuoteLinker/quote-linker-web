import fetch from 'node-fetch';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL 
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/submit-lead`
  : 'http://localhost:3000/api/submit-lead';

interface TestLead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  productType: 'auto' | 'home' | 'life' | 'health';
  subType?: string;
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  mockMode?: boolean;
  leadId?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

const testLeads: TestLead[] = [
  {
    // Auto Insurance Lead
    firstName: "Test",
    lastName: "AutoLead",
    email: "auto.test@example.com",
    phone: "1234567890",
    zipCode: "12345",
    productType: "auto",
    vehicleYear: "2020",
    vehicleMake: "Toyota",
    vehicleModel: "Camry"
  },
  {
    // Home Insurance Lead
    firstName: "Test",
    lastName: "HomeLead",
    email: "home.test@example.com",
    phone: "1234567890",
    zipCode: "12345",
    productType: "home",
    address: "123 Test St",
    propertyType: "single",
    yearBuilt: "2000"
  },
  {
    // Term Life Insurance Lead
    firstName: "Test",
    lastName: "LifeLead",
    email: "life.test@example.com",
    phone: "1234567890",
    zipCode: "12345",
    productType: "life",
    subType: "term",
    age: "35",
    coverageAmount: "500000",
    termLength: "20"
  },
  {
    // Health Insurance Lead
    firstName: "Test",
    lastName: "HealthLead",
    email: "health.test@example.com",
    phone: "1234567890",
    zipCode: "12345",
    productType: "health",
    subType: "supplemental",
    age: "30",
    coverageType: "individual",
    occupation: "Engineer",
    income: "100000",
    preExistingConditions: "no"
  }
];

async function testLeadSubmission(lead: TestLead) {
  try {
    console.log(`\nTesting ${lead.productType.toUpperCase()} insurance lead submission...`);
    console.log('Lead data:', JSON.stringify(lead, null, 2));

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    const data = await response.json() as ApiResponse;
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('✅ Lead submission successful');
      if (data.mockMode) {
        console.log('ℹ️ Running in mock mode');
      }
      if (data.leadId) {
        console.log('📝 Lead ID:', data.leadId);
      }
    } else {
      console.log('❌ Lead submission failed');
      if (data.error) {
        console.log('Error:', data.error);
      }
      if (data.details) {
        console.log('Validation errors:', data.details);
      }
    }
  } catch (error) {
    console.error('❌ Error during test:', error);
  }
}

async function runTests() {
  console.log('Starting lead submission tests...\n');
  
  for (const lead of testLeads) {
    await testLeadSubmission(lead);
    // Add a small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\nAll tests completed.');
}

runTests(); 