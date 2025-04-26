# QuoteLinker Web Application

A Next.js 14 application for managing insurance quote requests.

## Features

- Lead form for insurance quote requests
- Salesforce integration for lead management
- Google Tag Manager integration
- Google Ads conversion tracking
- Responsive design with TailwindCSS

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Salesforce account with API access
- Google Tag Manager account
- Google Ads account (optional)

## Environment Variables

Create the following environment files:

### .env.local (Development)
```
SF_USERNAME=your_salesforce_username
SF_PASSWORD=your_salesforce_password
SF_SECURITY_TOKEN=your_salesforce_security_token
SF_LOGIN_URL=https://login.salesforce.com
GTM_ID=GTM-XXXXXXX
GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### .env.production (Production)
```
SF_USERNAME=your_production_salesforce_username
SF_PASSWORD=your_production_salesforce_password
SF_SECURITY_TOKEN=your_production_salesforce_security_token
SF_LOGIN_URL=https://login.salesforce.com
GTM_ID=GTM-XXXXXXX
GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://your-production-domain.com
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment

### Vercel Deployment

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Security Considerations

- Never commit environment files to version control
- Use strong passwords for Salesforce credentials
- Regularly rotate security tokens
- Enable HTTPS in production
- Implement rate limiting for the API routes

## Support

For support, please contact the development team. 