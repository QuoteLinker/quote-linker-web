'use client';

import React from 'react';
import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import FAQ from '@/components/FAQ';
import WhyChoose from '@/components/WhyChoose';
import type { InsuranceType } from '@/types/insurance';

interface ProductPageProps {
  params: {
    type: InsuranceType;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero insuranceType={params.type} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <QuoteForm insuranceType={params.type} />
            </div>
          </div>
        </div>

        <WhyChoose insuranceType={params.type} />
        <FAQ insuranceType={params.type} />
      </div>
    </div>
  );
} 