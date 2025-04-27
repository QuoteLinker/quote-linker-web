import { NextResponse } from 'next/server';
import { authenticateWithSalesforce } from '@/utils/salesforce';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // If in development, return mock response
    if (isDevelopment) {
      return NextResponse.json({
        status: 'ok',
        environment: 'development',
        salesforceConnected: false,
        mockMode: true,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }
    
    // Try to authenticate with Salesforce
    try {
      await authenticateWithSalesforce();
      
      return NextResponse.json({
        status: 'ok',
        environment: 'production',
        salesforceConnected: true,
        mockMode: false,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    } catch (error) {
      console.error('Salesforce authentication error:', error);
      
      return NextResponse.json({
        status: 'ok',
        environment: 'production',
        salesforceConnected: false,
        mockMode: true,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }
  } catch (error) {
    console.error('Ping endpoint error:', error);
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500, headers: corsHeaders });
  }
} 