'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import { TrustIndicator } from '@/components/trust/TrustIndicator';

export default function ThankYouPage() {
  useEffect(() => {
    // Track conversion in Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual values
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': ''
      });
    }
  }, []);

  return (
    <>
      {/* Google Ads Conversion Tracking */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-CONVERSION_ID'); // Replace with actual conversion ID
          `
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Quote Request!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A licensed insurance agent will review your information and contact you shortly.
          </p>
          <TrustIndicator className="mb-8" showDetails={true} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to Talk Sooner?
          </h2>
          <p className="text-gray-600 mb-6">
            Schedule a convenient time to speak with a licensed agent who can answer your questions
            and help you find the perfect coverage.
          </p>
          
          <div className="calendly-inline-widget min-h-[700px]">
            <InlineWidget
              url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/quotelinker/consultation'}
              styles={{
                height: '700px',
                width: '100%',
              }}
            />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Your privacy is important to us. We never share your information without your consent.
          </p>
        </div>
      </div>
    </>
  );
} 