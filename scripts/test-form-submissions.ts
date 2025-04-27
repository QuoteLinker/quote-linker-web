import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface TestResult {
  insuranceType: string;
  status: string;
  responseCode: number;
  zapierStatus: string;
  googleSheetsStatus: string;
  timestamp: string;
}

const TEST_DATA = {
  auto: {
    firstName: 'Test',
    lastName: 'Auto',
    email: 'test.auto@example.com',
    phone: '555-555-5555',
    zipCode: '12345',
    insuranceType: 'auto'
  },
  home: {
    firstName: 'Test',
    lastName: 'Home',
    email: 'test.home@example.com',
    phone: '555-555-5556',
    zipCode: '12345',
    insuranceType: 'home'
  },
  termLife: {
    firstName: 'Test',
    lastName: 'TermLife',
    email: 'test.term@example.com',
    phone: '555-555-5557',
    zipCode: '12345',
    insuranceType: 'term-life',
    age: 35
  },
  permLife: {
    firstName: 'Test',
    lastName: 'PermLife',
    email: 'test.perm@example.com',
    phone: '555-555-5558',
    zipCode: '12345',
    insuranceType: 'permanent-life',
    age: 35
  },
  std: {
    firstName: 'Test',
    lastName: 'STD',
    email: 'test.std@example.com',
    phone: '555-555-5559',
    zipCode: '12345',
    insuranceType: 'std'
  },
  supplemental: {
    firstName: 'Test',
    lastName: 'Supplemental',
    email: 'test.supp@example.com',
    phone: '555-555-5560',
    zipCode: '12345',
    insuranceType: 'supplemental-health'
  }
};

async function testFormSubmission(data: any): Promise<TestResult> {
  try {
    const response = await axios.post('https://www.quotelinker.com/api/submit-lead', data);
    
    return {
      insuranceType: data.insuranceType,
      status: 'Success',
      responseCode: response.status,
      zapierStatus: 'Pending verification',
      googleSheetsStatus: 'Pending verification',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      insuranceType: data.insuranceType,
      status: 'Failed',
      responseCode: error.response?.status || 500,
      zapierStatus: 'Not triggered',
      googleSheetsStatus: 'Not triggered',
      timestamp: new Date().toISOString()
    };
  }
}

async function updateDeploymentReport(results: TestResult[]) {
  const reportPath = path.join(process.cwd(), 'DEPLOYMENT_REPORT.md');
  let report = fs.readFileSync(reportPath, 'utf8');

  results.forEach(result => {
    const insuranceType = result.insuranceType.replace(/-/g, ' ');
    const section = `### ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance`;
    
    const testResult = `
- [x] Test 1: Basic quote request
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
    console.log(`Testing ${type} insurance form...`);
    const result = await testFormSubmission(data);
    results.push(result);
    console.log(`Result: ${result.status} (${result.responseCode})`);
  }

  console.log('Updating deployment report...');
  await updateDeploymentReport(results);
  
  console.log('Tests completed. Check DEPLOYMENT_REPORT.md for results.');
}

main().catch(console.error); 