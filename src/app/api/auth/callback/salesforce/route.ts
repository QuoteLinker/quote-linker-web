import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      console.error('Salesforce OAuth Error:', {
        error,
        errorDescription,
        timestamp: new Date().toISOString()
      });
      
      // Redirect to error page with friendly message
      return NextResponse.redirect(new URL('/error?message=Authentication failed', request.url));
    }

    if (!code) {
      throw new Error('No authorization code received from Salesforce');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.SF_CLIENT_ID || '',
        client_secret: process.env.SF_CLIENT_SECRET || '',
        redirect_uri: 'https://www.quotelinker.com/api/auth/callback/salesforce',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Salesforce token exchange failed:', {
        status: tokenResponse.status,
        error: errorData,
        timestamp: new Date().toISOString()
      });
      throw new Error('Failed to exchange authorization code for access token');
    }

    const tokenData = await tokenResponse.json();
    
    // Store tokens securely (implement your token storage solution)
    // For now, we'll just log success
    console.log('Salesforce OAuth successful:', {
      instanceUrl: tokenData.instance_url,
      timestamp: new Date().toISOString()
    });

    // Redirect to success page
    return NextResponse.redirect(new URL('/success', request.url));

  } catch (error) {
    console.error('Salesforce callback error:', error);
    return NextResponse.redirect(new URL('/error?message=Authentication failed', request.url));
  }
} 