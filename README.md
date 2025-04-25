# QuoteLinker Web

A Next.js 14 application for QuoteLinker, a lead generation platform for a licensed State Farm agent in Minnesota.

## Features

- Dynamic product pages for different insurance types
- Mobile-optimized responsive design
- Secure form handling with validation
- Google Tag Manager integration
- Anti-spam protection with honeypot
- Zapier integration for lead management

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Vercel account for deployment

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_GTM_ID=your-gtm-id
ZAPIER_WEBHOOK_URL=your-zapier-webhook-url
```

## Development

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site is automatically deployed to Vercel when changes are pushed to the main branch.

To deploy manually:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Project Structure

- `/app` - Next.js 14 app directory
  - `/api` - API routes
  - `/components` - Reusable React components
  - `/[type]` - Dynamic product pages
- `/public` - Static assets

## Security

- Form validation using Zod
- Honeypot field for spam prevention
- Environment variables for sensitive data
- Secure API routes

## Analytics

Google Tag Manager is integrated for:
- Page views
- Form submissions
- User interactions

## License

Proprietary - All rights reserved 