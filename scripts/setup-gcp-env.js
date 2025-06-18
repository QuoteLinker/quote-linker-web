#!/usr/bin/env node

/**
 * This script helps set up environment variables in Google Cloud Run.
 * It reads from .env.local and outputs the commands to set up the variables in GCP.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env.local file...');
  fs.writeFileSync(envPath, `# Salesforce Authentication
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=
SALESFORCE_CLIENT_SECRET=
SALESFORCE_USERNAME=
SALESFORCE_PASSWORD=
SALESFORCE_TOKEN=
SF_API_VERSION=v57.0

# Salesforce Record Types
SF_AGENT_RECORD_TYPE_ID=
SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID=

# Other Configuration
NODE_ENV=development
`);
  console.log('.env.local file created. Please fill in the values and run this script again.');
  rl.close();
  process.exit(0);
}

// Read .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse .env.local
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

// Check if all required variables are set
const requiredVars = [
  'SALESFORCE_LOGIN_URL',
  'SALESFORCE_CLIENT_ID',
  'SALESFORCE_CLIENT_SECRET',
  'SALESFORCE_USERNAME',
  'SALESFORCE_PASSWORD',
  'SALESFORCE_TOKEN',
  'SF_API_VERSION'
];

const missingVars = requiredVars.filter(varName => !envVars[varName]);

if (missingVars.length > 0) {
  console.log('The following required environment variables are missing:');
  missingVars.forEach(varName => console.log(`- ${varName}`));
  console.log('\nPlease update your .env.local file and run this script again.');
  rl.close();
  process.exit(1);
}

// Generate Google Cloud Run commands
console.log('\n# Google Cloud Run Environment Variables Setup\n');
console.log('# Run the following commands to set up your Cloud Run environment variables:\n');

// Command to list current service details
console.log('# First, get your current service details:');
console.log('gcloud run services describe quotelinkercom --region us-central1 --format json | jq .spec.template.spec.containers[0].env\n');

// Command to update environment variables
console.log('# Then, update with new environment variables:');
console.log('gcloud run services update quotelinkercom --region us-central1 \\');

// Add each environment variable
Object.entries(envVars).forEach(([key, value], index, array) => {
  const isLast = index === array.length - 1;
  console.log(`  --set-env-vars "${key}=${value}"${isLast ? '' : ' \\'}`);
});

console.log('\n# Alternatively, you can use a YAML file for configuration:');
console.log('# 1. Create a file named env-vars.yaml with the following content:');
console.log('```yaml');
console.log('env_variables:');
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`  ${key}: "${value}"`);
});
console.log('```');
console.log('\n# 2. Update your service with the YAML file:');
console.log('gcloud run services update quotelinkercom --region us-central1 --env-vars-file env-vars.yaml\n');

rl.close();
