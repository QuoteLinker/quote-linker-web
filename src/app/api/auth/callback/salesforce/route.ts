import { NextResponse } from 'next/server';
import { authenticateWithSalesforce } from '@/utils/salesforce';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      throw new Error('No authorization code received');
    }

    // Authenticate with Salesforce using the authorization code
    const authResponse = await authenticateWithSalesforce();
    
    // Store the access token securely (you might want to use a session or JWT)
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Salesforce authentication successful',
      instance_url: authResponse.instance_url
    });
  } catch (error) {
    console.error('Salesforce callback error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to authenticate with Salesforce',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 