import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface TestResult {
  insuranceType: string;
  subType: string;
  status: string;
  responseCode: number;
  zapierStatus: string;
  googleSheetsStatus: string;
  timestamp: string;
  productDetails: string;
}

const TEST_DATA = {
  auto: {
    firstName: 'Test',
    lastName: 'Auto',
    email: 'test.auto@example.com',
    phone: '5555555555',
    zipCode: '12345',
    insuranceType: 'AUTO',
    subType: 'PERSONAL'
  },
  home: {
    firstName: 'Test',
    lastName: 'Home',
    email: 'test.home@example.com',
    phone: '5555555556',
    zipCode: '12345',
    insuranceType: 'HOME',
    subType: 'SINGLE_FAMILY'
  },
  termLife: {
    firstName: 'Test',
    lastName: 'TermLife',
    email: 'test.term@example.com',
    phone: '5555555557',
    zipCode: '12345',
    insuranceType: 'LIFE_TERM',
    age: '35',
    coverageAmount: '500000',
    termLength: '20'
  },
  permLife: {
    firstName: 'Test',
    lastName: 'PermLife',
    email: 'test.perm@example.com',
    phone: '5555555558',
    zipCode: '12345',
    insuranceType: 'LIFE_PERMANENT',
    age: '35',
    coverageAmount: '1000000'
  },
  std: {
    firstName: 'Test',
    lastName: 'STD',
    email: 'test.std@example.com',
    phone: '5555555559',
    zipCode: '12345',
    insuranceType: 'HEALTH_SHORT_TERM_DISABILITY',
    age: '35',
    subType: 'INDIVIDUAL'
  },
  supplemental: {
    firstName: 'Test',
    lastName: 'Supplemental',
    email: 'test.supp@example.com',
    phone: '5555555560',
    zipCode: '12345',
    insuranceType: 'HEALTH_SUPPLEMENTAL',
    age: '35',
    subType: 'CRITICAL_ILLNESS'
  }
};

async function testFormSubmission(data: any): Promise<TestResult> {
  try {
    const response = await axios.post('https://www.quotelinker.com/api/submit-quote', data);
    
    return {
      insuranceType: data.insuranceType,
      subType: data.subType || 'N/A',
      status: 'Success',
      responseCode: response.status,
      zapierStatus: 'Pending verification',
      googleSheetsStatus: 'Pending verification',
      timestamp: new Date().toISOString(),
      productDetails: `${data.insuranceType}${data.subType ? ` - ${data.subType}` : ''}`
    };
  } catch (error: any) {
    return {
      insuranceType: data.insuranceType,
      subType: data.subType || 'N/A',
      status: 'Failed',
      responseCode: error.response?.status || 500,
      zapierStatus: 'Not triggered',
      googleSheetsStatus: 'Not triggered',
      timestamp: new Date().toISOString(),
      productDetails: `${data.insuranceType}${data.subType ? ` - ${data.subType}` : ''}`
    };
  }
}

async function updateDeploymentReport(results: TestResult[]) {
  const reportPath = path.join(process.cwd(), 'DEPLOYMENT_REPORT.md');
  let report = fs.readFileSync(reportPath, 'utf8');

  results.forEach(result => {
    const insuranceType = result.insuranceType.toLowerCase().replace(/_/g, ' ');
    const section = `### ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance`;
    
    const testResult = `
- [x] Test 1: Basic quote request
  - Product Type: ${result.insuranceType}
  - Sub Type: ${result.subType}
  - Status: ${result.status}
  - Response Code: ${result.responseCode}
  - Zapier Status: ${result.zapierStatus}
  - Google Sheets Status: ${result.googleSheetsStatus}
  - Timestamp: ${result.timestamp}
`;

    // Replace the test section in the report
    const regex = new RegExp(`${section}[\\s\\S]*?(?=###|$)`, 'g');
    report = report.replace(regex, `${section}${testResult}`);
  });

  fs.writeFileSync(reportPath, report);
}

async function main() {
  console.log('Starting form submission tests...');
  
  const results: TestResult[] = [];
  
  for (const [type, data] of Object.entries(TEST_DATA)) {
    console.log(`Testing ${data.insuranceType} - ${data.subType || 'N/A'}...`);
    const result = await testFormSubmission(data);
    results.push(result);
    console.log(`Result for ${result.productDetails}: ${result.status} (${result.responseCode})`);
    
    // Add a delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('Updating deployment report...');
  await updateDeploymentReport(results);
  
  console.log('Tests completed. Check DEPLOYMENT_REPORT.md for results.');
}

main().catch(console.error); 