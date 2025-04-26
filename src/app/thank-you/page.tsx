'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Trigger Google Tag if available
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID
        });
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00ECFF] mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          We've received your quote request. A local licensed agent will contact you shortly to complete your personalized quote.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="inline-block bg-[#00ECFF] hover:bg-[#00d6e8] text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
          >
            Return Home
          </button>
          <p className="text-sm text-gray-500">
            If you have any immediate questions, please call us at{' '}
            <a href="tel:+1234567890" className="text-[#00ECFF] hover:text-[#00d6e8]">
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 