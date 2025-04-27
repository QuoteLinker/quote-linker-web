#!/usr/bin/env node

/**
 * This script helps set up the environment variables in Vercel.
 * It reads from .env.local and outputs the commands to set up the variables in Vercel.
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

// Generate Vercel CLI commands
console.log('\n# Vercel Environment Variables Setup\n');
console.log('# Run the following commands to set up your Vercel environment variables:');
console.log('# vercel env add SALESFORCE_LOGIN_URL');
console.log('# vercel env add SALESFORCE_CLIENT_ID');
console.log('# vercel env add SALESFORCE_CLIENT_SECRET');
console.log('# vercel env add SALESFORCE_USERNAME');
console.log('# vercel env add SALESFORCE_PASSWORD');
console.log('# vercel env add SALESFORCE_TOKEN');
console.log('# vercel env add SF_API_VERSION');
console.log('# vercel env add SF_AGENT_RECORD_TYPE_ID');
console.log('# vercel env add SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID\n');

console.log('# Or use the following command to set all variables at once:');
console.log('vercel env pull .env.production.local');
console.log('vercel env push .env.production.local\n');

console.log('# To deploy with these environment variables:');
console.log('vercel deploy --prod\n');

rl.close(); 