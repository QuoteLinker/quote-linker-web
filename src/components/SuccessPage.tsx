'use client';

import { useEffect } from 'react';
import CalendlyWidget from './CalendlyWidget';

export default function SuccessPage() {
  useEffect(() => {
    // Add any success page analytics or tracking here
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-[#00EEFD] rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Thank You for Your Interest!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We've received your information and one of our licensed agents will be in touch shortly.
          In the meantime, feel free to schedule a call at your convenience.
        </p>

        <div className="max-w-3xl mx-auto">
          <CalendlyWidget />
        </div>
      </div>
    </div>
  );
} 