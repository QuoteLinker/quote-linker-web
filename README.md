# QuoteLinker: Transforming Insurance Distribution

## Vision Statement

QuoteLinker is revolutionizing the insurance distribution landscape by creating the industry's first AI-optimized marketplace that connects high-intent consumers with licensed insurance agents in real-time. Our platform streamlines the quote capture process, eliminates friction in lead distribution, and empowers agencies to scale their operations through data-driven insights and predictive nurturing. By modernizing the entire insurance sales funnel, QuoteLinker is setting a new standard for efficiency, transparency, and growth in the insurance sector.

## Live Demo

**[quotelinker.com](https://quotelinker.com)**

## Key Features

- **AI-Optimized Lead Funnels**: Intelligent routing and scoring systems that match consumers with the most qualified agents based on location, expertise, and performance metrics.
- **Streamlined Quote Capture**: Mobile-optimized forms with smart validation and progressive disclosure that maximize conversion rates while collecting essential information.
- **CRM-Ready Integration**: Seamless connection with Salesforce and other leading CRM platforms for immediate lead activation and follow-up.
- **Scalable Infrastructure**: Built on modern cloud architecture with global CDN support for lightning-fast performance and 99.9% uptime.
- **Advanced Analytics**: Comprehensive dashboards providing real-time insights into lead quality, conversion rates, and ROI metrics.
- **Compliance-First Design**: Built-in compliance features ensuring adherence to insurance regulations across all jurisdictions.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, API Routes
- **Infrastructure**: Vercel, Cloudflare
- **Analytics**: Google Tag Manager, Google Analytics 4
- **Marketing**: Google Ads, Facebook Pixel
- **CRM**: Salesforce API Integration
- **Lead Management**: Zapier, Custom Webhooks

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/QuoteLinker/quote-linker-web.git
   cd quote-linker-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   SF_USERNAME=your_salesforce_username
   SF_PASSWORD=your_salesforce_password
   SF_SECURITY_TOKEN=your_salesforce_security_token
   SF_LOGIN_URL=https://login.salesforce.com
   GTM_ID=GTM-XXXXXXX
   GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ZAPIER_WEBHOOK_URL=your_zapier_webhook_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy with a single click

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

## Security & Compliance

- **Data Protection**: All data is encrypted in transit and at rest
- **Authentication**: Secure authentication mechanisms for all API endpoints
- **Rate Limiting**: Protection against abuse and DDoS attacks
- **Compliance**: Built-in features to maintain compliance with insurance regulations
- **Regular Audits**: Continuous security monitoring and regular penetration testing

## Contribution Guidelines

We welcome contributions from the community. Please read our contribution guidelines (coming soon) before submitting pull requests.

## License

Private - All rights reserved. QuoteLinker is proprietary software and may not be used, copied, or distributed without explicit permission.

---

© 2023 QuoteLinker. All rights reserved. 