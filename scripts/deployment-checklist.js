#!/usr/bin/env node

/**
 * This script helps with the deployment checklist for QuoteLinker.
 * It checks for required files, environment variables, and provides guidance for deployment.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check for required files
function checkRequiredFiles() {
  console.log('1. Checking required files...');
  
  const requiredFiles = [
    '.env.local',
    'src/utils/salesforce.ts',
    'src/app/api/submit-lead/route.ts',
    'src/app/api/submit-agent/route.ts',
    'next.config.js',
    'package.json'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));
  
  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    return false;
  }
  
  console.log('✅ All required files are present');
  return true;
}

// Check for required environment variables
function checkEnvironmentVariables() {
  console.log('\n2. Checking environment variables...');
  
  // Check if .env.local exists
  if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    console.error('❌ .env.local file is missing');
    return false;
  }
  
  // Read .env.local
  const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
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
  
  // Check for required variables
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
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    return false;
  }
  
  console.log('✅ All required environment variables are set');
  return true;
}

// Check for Vercel CLI
function checkVercelCLI() {
  console.log('\n3. Checking Vercel CLI...');
  
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    console.log('✅ Vercel CLI is installed');
    return true;
  } catch (error) {
    console.error('❌ Vercel CLI is not installed');
    console.log('   Install it with: npm install -g vercel');
    return false;
  }
}

// Check for Git
function checkGit() {
  console.log('\n4. Checking Git...');
  
  try {
    execSync('git --version', { stdio: 'ignore' });
    console.log('✅ Git is installed');
    return true;
  } catch (error) {
    console.error('❌ Git is not installed');
    return false;
  }
}

// Check for uncommitted changes
function checkUncommittedChanges() {
  console.log('\n5. Checking for uncommitted changes...');
  
  try {
    const result = execSync('git status --porcelain', { encoding: 'utf8' });
    if (result.trim()) {
      console.error('❌ There are uncommitted changes:');
      console.log(result);
      return false;
    }
    console.log('✅ No uncommitted changes');
    return true;
  } catch (error) {
    console.error('❌ Error checking Git status');
    return false;
  }
}

// Main function
async function main() {
  console.log('QuoteLinker Deployment Checklist\n');
  
  const filesCheck = checkRequiredFiles();
  const envCheck = checkEnvironmentVariables();
  const vercelCheck = checkVercelCLI();
  const gitCheck = checkGit();
  const changesCheck = checkUncommittedChanges();
  
  console.log('\nDeployment Checklist Results:');
  console.log(`- Required files: ${filesCheck ? '✅' : '❌'}`);
  console.log(`- Environment variables: ${envCheck ? '✅' : '❌'}`);
  console.log(`- Vercel CLI: ${vercelCheck ? '✅' : '❌'}`);
  console.log(`- Git: ${gitCheck ? '✅' : '❌'}`);
  console.log(`- Uncommitted changes: ${changesCheck ? '✅' : '❌'}`);
  
  const allChecksPass = filesCheck && envCheck && vercelCheck && gitCheck && changesCheck;
  
  if (allChecksPass) {
    console.log('\n✅ All checks passed! You are ready to deploy.');
    console.log('\nDeployment steps:');
    console.log('1. Run: vercel env pull .env.production.local');
    console.log('2. Run: vercel env push .env.production.local');
    console.log('3. Run: vercel deploy --prod');
    console.log('4. Test the deployed site: https://www.quotelinker.com');
    console.log('5. Run: ./scripts/test-api-endpoints.js');
  } else {
    console.log('\n❌ Some checks failed. Please fix the issues before deploying.');
  }
  
  rl.close();
}

main(); 