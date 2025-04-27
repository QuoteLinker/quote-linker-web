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
  TERM_LIFE: 'Term Life Insurance',
  PERMANENT_LIFE: 'Permanent Life Insurance',
  SHORT_TERM_DISABILITY: 'Short-Term Disability Insurance',
  SUPPLEMENTAL_HEALTH: 'Supplemental Health Insurance',
};

const productSubtitles: Record<InsuranceType, string> = {
  AUTO: 'Find the perfect auto insurance coverage tailored to your needs and budget.',
  HOME: 'Protect your home with comprehensive coverage from trusted providers.',
  TERM_LIFE: 'Secure your family\'s future with the right term life insurance policy.',
  PERMANENT_LIFE: 'Build lifelong protection and wealth with permanent life insurance.',
  SHORT_TERM_DISABILITY: 'Protect your income with short-term disability coverage.',
  SUPPLEMENTAL_HEALTH: 'Get additional health coverage for extra peace of mind.',
};

export default function Hero({ insuranceType, subType }: HeroProps) {
  const title = productTitles[insuranceType];
  const subtitle = productSubtitles[insuranceType];

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your {title} Quote Today!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {subtitle}
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center px-8 py-4 bg-[#00EEFD] text-[#0B0B45] rounded-lg font-bold text-lg hover:bg-[#00DDEB] transition-colors duration-200"
          >
            Get My Free Quote
            <ArrowDownIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 