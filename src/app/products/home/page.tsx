'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon, HomeIcon } from '@heroicons/react/24/outline';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import QuoteForm from '@/components/QuoteForm';
import { Suspense } from 'react';

type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

function HomeInsuranceContent() {
  const searchParams = useSearchParams();
  const subType = (searchParams.get('subType') || 'home') as SubType;
  
  const iconItems = [
    { icon: <ShieldCheckIcon className="h-6 w-6" />, label: 'Licensed Agents' },
    { icon: <ClockIcon className="h-6 w-6" />, label: 'Fast Quotes' },
    { icon: <CurrencyDollarIcon className="h-6 w-6" />, label: 'Best Rates' },
    { icon: <StarIcon className="h-6 w-6" />, label: 'Top Carriers' },
  ];
  
  const benefits = [
    { 
      icon: <HomeIcon className="h-6 w-6" />, 
      title: 'Home Protection',
      description: 'Comprehensive home coverage to protect your most valuable asset'
    },
    { 
      icon: <ShieldCheckIcon className="h-6 w-6" />, 
      title: 'Complete Coverage',
      description: 'Protection against natural disasters, theft, and liability'
    },
    { 
      icon: <CurrencyDollarIcon className="h-6 w-6" />, 
      title: 'Best Rates',
      description: 'Competitive rates from top home insurance providers'
    },
    { 
      icon: <ClockIcon className="h-6 w-6" />, 
      title: 'Quick Process',
      description: 'Quick and easy quote process with personalized coverage options'
    },
  ];

  return (
    <main>
      <HeroSection
        title="Home Insurance"
        subtitle="Protect your home with comprehensive coverage from trusted providers"
        ctaText="Get My Home Quote"
        ctaLink="/products/home"
        iconItems={iconItems}
      />
      
      <BenefitsSection
        title="Why Choose Home Insurance Through QuoteLinker"
        benefits={benefits}
      />
      
      <div className="container mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg mt-12 mb-12">
        <QuoteForm productType="home" subType={subType} />
      </div>
    </main>
  );
}

export default function HomeInsurancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeInsuranceContent />
    </Suspense>
  );
} 