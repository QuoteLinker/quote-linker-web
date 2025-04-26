'use client';

import CalendlyWidget from '@/components/CalendlyWidget';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          We've received your information and will be in touch shortly.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Schedule a call with our insurance experts to discuss your quote:
        </p>
      </div>

      <div className="flex justify-center">
        <CalendlyWidget />
      </div>
    </div>
  );
} 