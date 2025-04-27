'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import QuoteForm from '@/components/QuoteForm';
import { Suspense } from 'react';

type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

function AutoInsuranceContent() {
  const searchParams = useSearchParams();
  const subType = (searchParams.get('subType') || 'auto') as SubType;
  
  const iconItems = [
    { icon: <ShieldCheckIcon className="h-6 w-6" />, label: 'Licensed Agents' },
    { icon: <ClockIcon className="h-6 w-6" />, label: 'Fast Quotes' },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, label: 'Best Rates' },
    { icon: <StarIcon className="h-6 w-6" />, label: 'Top Carriers' },
  ];
  
  const benefits = [
    { 
      icon: <ShieldCheckIcon className="h-6 w-6" />, 
      title: 'Comprehensive Coverage',
      description: 'Comprehensive coverage options tailored to your specific needs and budget'
    },
    { 
      icon: <ClockIcon className="h-6 w-6" />, 
      title: 'Quick Process',
      description: 'Quick and easy quote process with same-day coverage options'
    },
    { 
      icon: <CurrencyDollarIcon className="h-6 w-6" />, 
      title: 'Best Rates',
      description: 'Competitive rates from top auto insurance providers'
    },
    { 
      icon: <StarIcon className="h-6 w-6" />, 
      title: 'Expert Guidance',
      description: 'Expert guidance from licensed insurance professionals'
    },
  ];

  return (
    <main>
      <HeroSection
        title="Auto Insurance"
        subtitle="Find the perfect auto insurance coverage for your needs"
        ctaText="Get My Auto Quote"
        ctaLink="/products/auto"
        iconItems={iconItems}
      />
      
      <BenefitsSection
        title="Why Choose Auto Insurance Through QuoteLinker"
        benefits={benefits}
      />
      
      <div className="container mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg mt-12 mb-12">
        <QuoteForm productType="auto" subType={subType} />
      </div>
    </main>
  );
}

export default function AutoInsurancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AutoInsuranceContent />
    </Suspense>
  );
} 