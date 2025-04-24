import React from 'react';
import Link from 'next/link';

interface StickyCTAProps {
  insuranceType: string;
}

export default function StickyCTA({ insuranceType }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-card shadow-lg z-50 md:hidden">
      <a
        href="#quote-form"
        className="block w-full bg-brand-primary hover:bg-brand-secondary text-black text-center font-semibold px-6 py-3 rounded-lg shadow-brand transition-all duration-200"
      >
        Get Your Free Quote
      </a>
    </div>
  );
} 