const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const testData = {
  auto: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-555-5555',
    zipCode: '12345',
    vehicleYear: '2020',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
  },
  home: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-555-5556',
    zipCode: '12345',
    homeValue: '300000',
    homeType: 'Single Family',
    homeAge: '10',
  },
  life: {
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '555-555-5557',
    zipCode: '12345',
    age: '35',
    gender: 'Male',
    healthStatus: 'Good',
    coverageAmount: '500000',
  },
  health: {
    firstName: 'Mary',
    lastName: 'Williams',
    email: 'mary.williams@example.com',
    phone: '555-555-5558',
    zipCode: '12345',
    age: '30',
    gender: 'Female',
    healthStatus: 'Good',
    coverageType: 'Individual',
  },
};

async function runSmokeTest() {
  console.log('Running smoke tests...');
  
  for (const [type, data] of Object.entries(testData)) {
    try {
      console.log(`Testing ${type} quote submission...`);
      const response = await axios.post(`${API_URL}/quote/${type}`, data);
      console.log(`✅ ${type} quote submission successful:`, response.status);
    } catch (error) {
      console.error(`❌ ${type} quote submission failed:`, error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }
  
  console.log('Smoke tests completed.');
}

runSmokeTest().catch(console.error); 