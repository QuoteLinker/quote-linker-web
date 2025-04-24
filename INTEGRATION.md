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
- A Google Tag Manager account (optional but recommended)

### Implementation Steps

1. **Add Google Analytics Script**

   Create a new component for Google Analytics:

   ```typescript
   // src/components/GoogleAnalytics.tsx
   'use client';

   import Script from 'next/script';

   export default function GoogleAnalytics() {
     return (
       <>
         <Script
           src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
           strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
           {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
           `}
         </Script>
       </>
     );
   }
   ```

2. **Add to Layout**

   Update your root layout file to include the Google Analytics component:

   ```typescript
   // src/app/layout.tsx
   import GoogleAnalytics from '@/components/GoogleAnalytics';

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <head>
           <GoogleAnalytics />
         </head>
         <body>
           {children}
         </body>
       </html>
     );
   }
   ```

3. **Add Environment Variable**

   In your Vercel project settings, add the following environment variable:

   - `NEXT_PUBLIC_GA_ID`: Your Google Analytics measurement ID (e.g., G-XXXXXXXXXX)

4. **Track Form Submissions**

   Update the QuoteForm component to track form submissions:

   ```typescript
   // In the handleSubmit function of QuoteForm.tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     setError('');

     try {
       const response = await fetch('/api/submit', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           ...formData,
           insuranceType,
         }),
       });

       if (!response.ok) {
         throw new Error('Failed to submit form');
       }

       // Track form submission in Google Analytics
       if (typeof window !== 'undefined' && window.gtag) {
         window.gtag('event', 'form_submission', {
           event_category: 'Quote',
           event_label: insuranceType,
           value: 1
         });
       }

       // Redirect to thank you page
       router.push(`/${insuranceType}/thank-you`);
     } catch (err) {
       setError('There was an error submitting your form. Please try again.');
       console.error('Form submission error:', err);
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

5. **Google Tag Manager (Optional)**

   If you want to use Google Tag Manager for more advanced tracking:

   - Create a GTM container
   - Add the GTM script to your layout file
   - Configure tags, triggers, and variables in the GTM interface

## Testing Integrations

1. **Salesforce**
   - Submit a test form
   - Check your Salesforce account for the new Lead
   - Verify all fields are correctly mapped

2. **Google Analytics**
   - Use the Google Analytics Real-Time reports to verify tracking
   - Check that form submissions are being tracked
   - Verify that page views are being tracked correctly 