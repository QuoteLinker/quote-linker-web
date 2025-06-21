#!/usr/bin/env node

/**
 * Script to verify that Sentry is properly configured in the application.
 * 
 * This script checks:
 * 1. Sentry client and server DSNs are set
 * 2. Sentry environment variables are present
 * 3. Sentry is properly imported in the configuration files
 */

var fs = require('fs');
var path = require('path');
var dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Colors for console output
var colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

console.log(colors.blue + colors.bold + 'Verifying Sentry Configuration' + colors.reset + '\n');

// Check environment variables
var requiredEnvVars = [
  'NEXT_PUBLIC_SENTRY_DSN',
  'SENTRY_AUTH_TOKEN',
  'SENTRY_PROJECT',
  'SENTRY_ORG'
];

var envVarsMissing = false;
console.log('Checking environment variables:');

requiredEnvVars.forEach(function(envVar) {
  if (!process.env[envVar]) {
    console.log('  ' + colors.red + '✗ ' + envVar + ' is not set' + colors.reset);
    envVarsMissing = true;
  } else {
    console.log('  ' + colors.green + '✓ ' + envVar + ' is set' + colors.reset);
  }
});

// Check Sentry configuration files
var configFiles = [
  'sentry.client.config.ts',
  'sentry.server.config.ts',
  'next.config.js'
];

console.log('\nChecking configuration files:');
configFiles.forEach(function(file) {
  var filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log('  ' + colors.green + '✓ ' + file + ' exists' + colors.reset);
    
    var content = fs.readFileSync(filePath, 'utf8');
    
    // Check if Sentry is imported
    if (content.includes('@sentry/nextjs')) {
      console.log('    ' + colors.green + '✓ Sentry is imported' + colors.reset);
    } else {
      console.log('    ' + colors.yellow + '! Sentry import may be missing' + colors.reset);
    }
    
    // Check for DSN usage
    if (content.includes('NEXT_PUBLIC_SENTRY_DSN') || content.includes('dsn:')) {
      console.log('    ' + colors.green + '✓ DSN configuration found' + colors.reset);
    } else {
      console.log('    ' + colors.yellow + '! DSN configuration may be missing' + colors.reset);
    }
  } else {
    console.log('  ' + colors.red + '✗ ' + file + ' is missing' + colors.reset);
  }
});

// Perform a test call to Sentry
console.log('\nPerforming test error capture:');
try {
  // Only attempt to import if in a Node.js environment that supports ES modules or if transpiled
  // This is just a simulation
  console.log('  ' + colors.yellow + '! Simulation only: Sentry.captureMessage("Test message from verify-sentry script")' + colors.reset);
  
  // Summary
  if (envVarsMissing) {
    console.log('\n' + colors.yellow + colors.bold + 'Warning: Some Sentry environment variables are missing. Error tracking may not work properly.' + colors.reset);
  } else {
    console.log('\n' + colors.green + colors.bold + 'Sentry configuration looks good!' + colors.reset);
  }
  
  console.log('\n' + colors.blue + 'Don\'t forget to:' + colors.reset);
  console.log('  - Set up proper error boundaries in your React components');
  console.log('  - Test error reporting in development mode');
  console.log('  - Configure performance monitoring if needed');
  
} catch (error) {
  console.error('\n' + colors.red + 'Error during Sentry verification:' + colors.reset, error);
}
