'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { TrustIndicator } from '@/components/trust/TrustIndicator';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { trackCalendlyInteraction } from '@/utils/gtm';

export default function ThankYouPage() {
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true);

  useEffect(() => {
    // Track conversion in Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': `QUOTE_${Date.now()}`
      });
    }

    // Set up Calendly loading and event tracking
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        setIsCalendlyLoading(false);
        
        // Track Calendly interactions
        if (e.data.event === 'calendly:event_scheduled') {
          trackCalendlyInteraction('scheduled', {
            eventType: e.data.payload.event_type.name,
            eventDate: e.data.payload.event.start_time
          });
        } else if (e.data.event === 'calendly:profile_page_viewed') {
          trackCalendlyInteraction('open');
        } else if (e.data.event === 'calendly:profile_page_closed') {
          trackCalendlyInteraction('close');
        }
      }
    };
    
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  return (
    <ErrorBoundary>
      {/* Google Ads Conversion Tracking */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}');
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
            Schedule a Consultation
          </h2>
          <p className="text-gray-600 mb-6">
            Want to discuss your insurance needs right away? Schedule a free consultation with one of our licensed agents.
          </p>
          
          <div className="calendly-inline-widget min-h-[700px] relative">
            {isCalendlyLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              </div>
            )}
            <InlineWidget
              url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/quotelinker/consultation'}
              styles={{
                height: '700px',
                width: '100%',
                minWidth: '320px',
              }}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '00EEFD',
                textColor: '333333',
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
    </ErrorBoundary>
  );
} 