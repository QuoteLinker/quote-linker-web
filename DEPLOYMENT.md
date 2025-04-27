# QuoteLinker Deployment Guide

This guide provides step-by-step instructions for deploying the QuoteLinker application to production.

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git
- Vercel CLI (`npm install -g vercel`)
- Salesforce account with API access
- Google Tag Manager account
- Google Analytics 4 property

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/quote-linker-web.git
   cd quote-linker-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   # Salesforce Authentication
   SALESFORCE_LOGIN_URL=https://login.salesforce.com
   SALESFORCE_CLIENT_ID=your_client_id_here
   SALESFORCE_CLIENT_SECRET=your_client_secret_here
   SALESFORCE_USERNAME=your_username_here
   SALESFORCE_PASSWORD=your_password_here
   SALESFORCE_TOKEN=your_security_token_here
   SF_API_VERSION=v57.0

   # Salesforce Record Types
   SF_AGENT_RECORD_TYPE_ID=your_agent_record_type_id
   SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID=your_agent_opportunity_record_type_id

   # Other Configuration
   NODE_ENV=development
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Salesforce Integration

### Setting Up Salesforce Connected App

1. Log in to your Salesforce account
2. Go to Setup > App Manager > New Connected App
3. Fill in the following details:
   - Connected App Name: QuoteLinker
   - API Name: QuoteLinker
   - Contact Email: your-email@example.com
   - Enable OAuth Settings: Checked
   - Callback URL: https://www.quotelinker.com/api/auth/callback/salesforce
   - Selected OAuth Scopes: 
     - Access and manage your data (api)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
4. Click Save
5. After saving, you'll see the Consumer Key and Consumer Secret
6. Note down these values for your environment variables

### Getting Salesforce Security Token

1. Log in to your Salesforce account
2. Go to Setup > Users > Users
3. Click on your username
4. Click "Reset Security Token"
5. Check your email for the new security token
6. Note down this value for your `SALESFORCE_TOKEN` environment variable

### Verifying Salesforce Connection

Run the verification script to test the Salesforce connection:

```bash
./scripts/verify-salesforce-connection.js
```

## Vercel Deployment

### Setting Up Vercel Environment Variables

1. Log in to your Vercel account
2. Go to your project settings
3. Navigate to the "Environment Variables" tab
4. Add the following environment variables:
   - `SALESFORCE_LOGIN_URL`
   - `SALESFORCE_CLIENT_ID`
   - `SALESFORCE_CLIENT_SECRET`
   - `SALESFORCE_USERNAME`
   - `SALESFORCE_PASSWORD`
   - `SALESFORCE_TOKEN`
   - `SF_API_VERSION`
   - `SF_AGENT_RECORD_TYPE_ID`
   - `SF_AGENT_OPPORTUNITY_RECORD_TYPE_ID`

Alternatively, you can use the setup script:

```bash
./scripts/setup-vercel-env.js
```

### Deploying to Vercel

1. Run the deployment checklist to ensure everything is ready:
   ```bash
   ./scripts/deployment-checklist.js
   ```

2. Deploy to Vercel:
   ```bash
   vercel deploy --prod
   ```

3. Test the deployed site:
   ```bash
   ./scripts/test-api-endpoints.js
   ```

## Google Tag Manager Setup

1. Log in to your Google Tag Manager account
2. Create a new container for QuoteLinker
3. Add the following tags:
   - Google Analytics 4 Configuration
   - Lead Form Submission Event
   - Agent Form Submission Event
4. Publish the container
5. Add the GTM container ID to your environment variables:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## Testing Checklist

- [ ] Submit a test lead through the live site
- [ ] Verify the lead is created in Salesforce
- [ ] Submit a test agent through the live site
- [ ] Verify the agent is created in Salesforce
- [ ] Confirm GTM lead event is captured
- [ ] Confirm no 400/500 errors in Vercel or Salesforce logs

## Troubleshooting

### Salesforce Authentication Issues

If you encounter Salesforce authentication issues:

1. Check that all environment variables are set correctly
2. Verify that the Salesforce Connected App is configured correctly
3. Ensure the security token is correct
4. Check the Vercel logs for detailed error messages

### API Endpoint Issues

If the API endpoints are not working:

1. Check the Vercel logs for errors
2. Verify that the environment variables are set correctly
3. Test the endpoints locally to isolate the issue
4. Check the CORS configuration if accessing from a different domain

## Support

For support, please contact the development team. 