#!/usr/bin/env node

/**
 * Script to check the production deployment status
 * This script verifies that the production site is up and running
 * and that the Zapier integration is working correctly.
 */

import fetch from 'node-fetch';

// Production URL
const PRODUCTION_URL = 'https://quotelinker.com';

// Function to check if the site is up
async function checkSiteStatus() {
  console.log(`\nChecking if ${PRODUCTION_URL} is up...`);
  
  try {
    const response = await fetch(PRODUCTION_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    console.log(`✅ Site is up and running (Status: ${response.status})`);
    return true;
  } catch (error) {
    console.error(`❌ Site is down:`, error.message);
    return false;
  }
}

// Function to check if the Zapier integration is working
async function checkZapierIntegration() {
  console.log(`\nChecking Zapier integration...`);
  
  const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/22689304/2phdsmv/';
  
  try {
    // Send a test ping to Zapier
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
        source: 'deployment-check'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(`✅ Zapier integration is working`);
    return true;
  } catch (error) {
    console.error(`❌ Zapier integration is not working:`, error.message);
    return false;
  }
}

// Main function to run all checks
async function runChecks() {
  console.log('🔍 Starting deployment checks...');
  
  const siteUp = await checkSiteStatus();
  const zapierWorking = await checkZapierIntegration();
  
  console.log('\n📊 Check Results:');
  console.log(`✅ Site status: ${siteUp ? 'UP' : 'DOWN'}`);
  console.log(`✅ Zapier integration: ${zapierWorking ? 'WORKING' : 'NOT WORKING'}`);
  
  if (!siteUp || !zapierWorking) {
    console.log('\n⚠️ Some checks failed. Please investigate the issues above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All checks passed successfully! The site is ready for production traffic.');
  }
}

// Run the checks
runChecks().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 