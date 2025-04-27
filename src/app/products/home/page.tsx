'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon, HomeIcon } from '@heroicons/react/24/outline';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import QuoteForm from '@/components/QuoteForm';
import { Suspense } from 'react';
import FeatureGrid from '@/components/FeatureGrid';
import { FaHome, FaShieldAlt, FaTools, FaHandHoldingUsd } from 'react-icons/fa';
import { InsuranceType } from '@/utils/insuranceCopy';

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

  const features = [
    {
      icon: <FaHome />,
      title: 'Property Protection',
      description: 'Coverage for your home and personal belongings'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Liability Coverage',
      description: 'Protection against accidents and injuries on your property'
    },
    {
      icon: <FaTools />,
      title: 'Additional Coverage',
      description: 'Options for natural disasters and other perils'
    },
    {
      icon: <FaHandHoldingUsd />,
      title: 'Competitive Rates',
      description: 'Save money with quotes from top insurance carriers'
    }
  ];

  return (
    <main>
      <HeroSection
        title="Home Insurance"
        subtitle="Protect your biggest investment"
        ctaText="Get My Home Quote"
        ctaLink="#quote-form"
      />
      
      <FeatureGrid items={features} />
      
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <QuoteForm insuranceType="HOME" />
        </div>
      </section>
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