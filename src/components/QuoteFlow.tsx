'use client';

import React, { Suspense } from 'react';
import InsuranceHero from '@/components/InsuranceHero';
import TrustIndicators from '@/components/TrustIndicators';
import HowItWorks from '@/components/HowItWorks';
import MultiStepQuoteForm from '@/components/MultiStepQuoteForm';
import { InsuranceType } from '@/utils/insuranceCopy';

interface QuoteFlowProps {
  type: InsuranceType;
  title: string;
  description: string;
  hero: {
    heading: string;
    subheading: string;
    image: string;
  };
}

const loadingStateForm = (
  <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-slate-200 rounded col-span-1"></div>
          <div className="h-10 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
      </div>
      <div className="h-12 bg-slate-200 rounded-full w-1/3 mx-auto"></div>
    </div>
  </div>
);

export function QuoteFlow({ type, title, description, hero }: QuoteFlowProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <InsuranceHero
        insuranceType={type}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            <Suspense fallback={loadingStateForm}>
              <MultiStepQuoteForm 
                productType={type} 
              />
            </Suspense>
          </div>

          {/* Right Column - Trust Indicators & How It Works */}
          <div className="space-y-12">
            <TrustIndicators />
            <HowItWorks 
              insuranceType={type}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
