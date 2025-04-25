# Integration Guide for QuoteLinker Web

This guide provides instructions for integrating Salesforce and Google Analytics with the QuoteLinker Web application after deployment.

## Salesforce Integration

### Prerequisites

- A Salesforce account with API access
- Salesforce Connected App credentials (Client ID and Client Secret)

### Implementation Steps

1. **Install Required Packages**

   ```bash
   npm install jsforce
   # or
   yarn add jsforce
   ```

2. **Update API Route**

   Modify the `/api/submit/route.ts` file to include Salesforce integration:

   ```typescript
   import { NextResponse } from 'next/server';
   import { InsuranceType } from '@/utils/insuranceCopy';
   import jsforce from 'jsforce';

   interface FormData {
     name: string;
     email: string;
     phone: string;
     zip: string;
     insuranceType: InsuranceType;
     comments?: string;
   }

   export async function POST(request: Request) {
     try {
       const data: FormData = await request.json();

       // Connect to Salesforce
       const conn = new jsforce.Connection({
         loginUrl: process.env.SF_LOGIN_URL || 'https://login.salesforce.com'
       });

       // Login to Salesforce
       await conn.login(
         process.env.SF_USERNAME,
         process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN
       );

       // Create Lead in Salesforce
       const lead = {
         FirstName: data.name.split(' ')[0],
         LastName: data.name.split(' ').slice(1).join(' '),
         Email: data.email,
         Phone: data.phone,
         PostalCode: data.zip,
         Company: 'QuoteLinker',
         LeadSource: 'Website',
         Description: `Insurance Type: ${data.insuranceType}\nComments: ${data.comments || 'None'}`
       };

       const result = await conn.sobject('Lead').create(lead);

       console.log('Form submission received and sent to Salesforce:', data);
       console.log('Salesforce Lead created with ID:', result.id);

       return NextResponse.json(
         { message: 'Form submitted successfully' },
         { status: 200 }
       );
     } catch (error) {
       console.error('Error processing form submission:', error);
       return NextResponse.json(
         { message: 'Error processing form submission' },
         { status: 500 }
       );
     }
   }
   ```

3. **Add Environment Variables**

   In your Vercel project settings, add the following environment variables:

   - `SF_USERNAME`: Your Salesforce username
   - `SF_PASSWORD`: Your Salesforce password
   - `SF_SECURITY_TOKEN`: Your Salesforce security token
   - `SF_LOGIN_URL`: Salesforce login URL (default: https://login.salesforce.com)

4. **Test the Integration**

   - Submit a test form on your deployed site
   - Verify that a new Lead is created in your Salesforce account

## Google Analytics Integration

### Prerequisites

- A Google Analytics 4 account
- A Google Tag Manager account

### Implementation Steps

1. **Add Google Tag Manager Script**

   Add the following script to your `src/app/layout.tsx` file:

   ```tsx
   import Script from 'next/script';

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <head>
           <Script
             id="gtm-script"
             strategy="afterInteractive"
             dangerouslySetInnerHTML={{
               __html: `
                 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                 })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
               `,
             }}
           />
         </head>
         <body>
           <noscript>
             <iframe
               src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
               height="0"
               width="0"
               style={{ display: 'none', visibility: 'hidden' }}
             />
           </noscript>
           {children}
         </body>
       </html>
     );
   }
   ```

2. **Add Google Analytics Event Tracking**

   Create a utility function to track events:

   ```typescript
   // src/utils/analytics.ts
   export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
     if (typeof window !== 'undefined' && window.gtag) {
       window.gtag('event', eventName, eventParams);
     }
   };
   ```

3. **Track Form Submissions**

   Update your form submission handler to track events:

   ```typescript
   import { trackEvent } from '@/utils/analytics';

   // In your form submission handler
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     // ... existing form submission code ...
     
     // Track form submission
     trackEvent('form_submission', {
       form_name: 'quote_form',
       insurance_type: insuranceType,
     });
   };
   ```

4. **Add Environment Variables**

   In your Vercel project settings, add the following environment variables:

   - `NEXT_PUBLIC_GTM_ID`: Your Google Tag Manager container ID
   - `NEXT_PUBLIC_GA_ID`: Your Google Analytics measurement ID

5. **Test the Integration**

   - Submit a test form on your deployed site
   - Verify that events are being tracked in your Google Analytics account

## Security Best Practices

- Never commit sensitive credentials to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys and credentials
- Implement rate limiting on API routes
- Validate form submissions server-side
- Keep dependencies updated
- Follow security advisories
- Monitor for unusual activity 