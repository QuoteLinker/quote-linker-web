'use client';

import { useState } from 'react';
import QuoteForm from '@/components/QuoteForm';

export default function HealthInsurancePage() {
  const [subType, setSubType] = useState<'std' | 'supplemental'>('std');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Health Insurance Quotes</h1>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              subType === 'std'
                ? 'bg-[#00EEFD] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setSubType('std')}
          >
            Short-Term Disability
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              subType === 'supplemental'
                ? 'bg-[#00EEFD] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setSubType('supplemental')}
          >
            Supplemental Health
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center mx-auto max-w-lg pb-8">
        <QuoteForm productType="health" subType={subType} />
      </div>
    </div>
  );
} 