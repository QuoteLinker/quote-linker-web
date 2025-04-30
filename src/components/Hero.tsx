import React from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface HeroProps {
  insuranceType: InsuranceType;
  subType: string;
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
};

export default function Hero({ insuranceType, subType }: HeroProps) {
  const title = productTitles[insuranceType];
  const subtitle = productSubtitles[insuranceType];

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your {title} Quote Today!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {subtitle}
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center px-8 py-4 bg-[#00EEFD] text-white rounded-lg font-bold text-lg hover:bg-[#00D4E5] transition-colors duration-200"
          >
            Get My Free Quote
            <ArrowDownIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 