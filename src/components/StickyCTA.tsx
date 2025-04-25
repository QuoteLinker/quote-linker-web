'use client';

import React from 'react';
import { InsuranceType } from '@/utils/insuranceCopy';

interface StickyCTAProps {
  insuranceType: InsuranceType;
}

export default function StickyCTA({ insuranceType }: StickyCTAProps) {
  const buttonText = `Get ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance Quote`;

  return (
    <>
      {/* Spacer div to prevent content overlap */}
      <div className="h-24 md:h-0" />
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <a
          href="#quote-form"
          className="block w-full bg-brand-primary text-white text-center font-semibold px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </>
  );
} 