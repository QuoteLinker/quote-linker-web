'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { InsuranceType } from '@/utils/insuranceCopy';
import LoadingSpinner from './LoadingSpinner';

// Dynamic imports for client components
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const QuoteForm = dynamic(() => import('@/components/QuoteForm'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const WhyChoose = dynamic(() => import('@/components/WhyChoose'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

interface ProductPageProps {
  params: {
    type: string;
  };
}

const typeMapping: Record<string, InsuranceType> = {
  'auto': 'AUTO',
  'home': 'HOME',
  'life': 'LIFE',
  'health': 'HEALTH',
  'disability': 'DISABILITY',
  'term-life': 'LIFE_TERM',
  'permanent-life': 'LIFE_PERMANENT',
  'short-term-disability': 'HEALTH_SHORT_TERM_DISABILITY',
  'supplemental-health': 'HEALTH_SUPPLEMENTAL'
};

export default function ProductPage({ params }: ProductPageProps) {
  const inputType = params.type.toLowerCase();
  const type = typeMapping[inputType];
  
  if (!type) {
    console.error(`Invalid insurance type: ${params.type}. Input type:`, inputType, 'Type mapping:', typeMapping);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We couldn't find the right insurance type for this page. Please check the URL or return to the home page.</p>
          <a href="/" className="inline-block px-6 py-3 bg-[#00EEFD] text-white rounded-lg font-bold text-lg shadow hover:bg-[#00D4E5] transition-colors duration-200">Return Home</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero insuranceType={type} />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden" id="quote-form">
            <div className="p-6 sm:p-8">
              <Suspense fallback={<LoadingSpinner />}>
                <QuoteForm intent={type} />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <WhyChoose insuranceType={type} />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <FAQ insuranceType={type} />
        </Suspense>
      </div>
    </div>
  );
} 