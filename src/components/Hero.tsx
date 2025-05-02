'use client';

import React from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface HeroProps {
  insuranceType: InsuranceType;
}

const productTitles: Record<InsuranceType, string> = {
  AUTO: 'Auto Insurance',
  HOME: 'Home Insurance',
  LIFE_TERM: 'Term Life Insurance',
  LIFE_PERMANENT: 'Permanent Life Insurance',
  HEALTH_SHORT_TERM_DISABILITY: 'Short-Term Disability Insurance',
  HEALTH_SUPPLEMENTAL: 'Supplemental Health Insurance',
  LIFE: 'Life Insurance',
  HEALTH: 'Health Insurance',
  DISABILITY: 'Disability Insurance',
};

const productSubtitles: Record<InsuranceType, string> = {
  AUTO: 'Find the perfect auto insurance coverage tailored to your needs and budget.',
  HOME: 'Protect your home with comprehensive coverage from trusted providers.',
  LIFE_TERM: 'Secure your family\'s future with the right term life insurance policy.',
  LIFE_PERMANENT: 'Build lifelong protection and wealth with permanent life insurance.',
  HEALTH_SHORT_TERM_DISABILITY: 'Protect your income with short-term disability coverage.',
  HEALTH_SUPPLEMENTAL: 'Get additional health coverage for extra peace of mind.',
  LIFE: 'Protect your loved ones with the right life insurance coverage.',
  HEALTH: 'Find comprehensive health insurance that fits your needs and budget.',
  DISABILITY: 'Protect your income with comprehensive disability coverage.',
};

export default function Hero({ insuranceType }: HeroProps) {
  if (!insuranceType || !productTitles[insuranceType]) {
    console.error('Hero: Invalid or missing insuranceType:', insuranceType);
    return (
      <div className="bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Insurance Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't load the hero section for this insurance type.</p>
      </div>
    );
  }
  const title = productTitles[insuranceType] || 'Insurance Coverage';
  const subtitle = productSubtitles[insuranceType] || 'Find the right coverage for your needs.';

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white pt-32 md:pt-44 pb-16">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {subtitle}
          </p>
          <div className="flex justify-center w-full">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00EEFD] text-white rounded-lg font-extrabold text-lg md:text-xl shadow-lg hover:bg-[#00D4E5] focus:outline-none focus:ring-4 focus:ring-[#00EEFD]/50 transition-colors duration-200 w-full max-w-xs mx-auto mb-4 md:mb-0"
              style={{ boxShadow: '0 4px 24px 0 rgba(0,238,253,0.15)' }}
              aria-label="Get My Free Quote"
            >
              Get My Free Quote
              <ArrowDownIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 