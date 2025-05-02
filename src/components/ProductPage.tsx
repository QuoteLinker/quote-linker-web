'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { InsuranceType } from '@/utils/insuranceCopy';
import LoadingSpinner from './LoadingSpinner';

// Dynamic imports for client components
const Hero = dynamic(() => import('./Hero'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const QuoteForm = dynamic(() => import('./QuoteForm'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const FAQ = dynamic(() => import('./FAQ'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const WhyChoose = dynamic(() => import('./WhyChoose'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

interface ProductPageProps {
  params: {
    type: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const type = params.type.toUpperCase() as InsuranceType;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero insuranceType={type} />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <Suspense fallback={<LoadingSpinner />}>
                <QuoteForm insuranceType={type} />
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