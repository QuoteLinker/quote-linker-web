'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { InsuranceType } from '@/types/insurance';
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
    type: InsuranceType;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero insuranceType={params.type} />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <Suspense fallback={<LoadingSpinner />}>
                <QuoteForm insuranceType={params.type} />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <WhyChoose insuranceType={params.type} />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <FAQ insuranceType={params.type} />
        </Suspense>
      </div>
    </div>
  );
} 