'use client';

import React from 'react';
import { InsuranceType } from '@/utils/insuranceCopy';

interface StickyCTAProps {
  insuranceType?: InsuranceType;
}

export default function StickyCTA({ insuranceType }: StickyCTAProps) {
  const buttonText = insuranceType 
    ? `Get Your Free ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Quote`
    : 'Get Your Free Quote';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <a
        href="#quote-form"
        className="block bg-brand-primary p-4 text-center text-black font-semibold shadow-lg"
      >
        {buttonText}
      </a>
    </div>
  );
} 