'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import QuoteForm from '@/components/QuoteForm';
import { Suspense } from 'react';
import FeatureGrid from '@/components/FeatureGrid';
import { FaCar, FaShieldAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';

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

  const features = [
    {
      icon: <FaCar />,
      title: 'Comprehensive Coverage',
      description: 'Protection for your vehicle against accidents, theft, and natural disasters'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Liability Protection',
      description: 'Coverage for bodily injury and property damage to others'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Competitive Rates',
      description: 'Save money with quotes from top-rated insurance carriers'
    },
    {
      icon: <FaClock />,
      title: 'Quick Process',
      description: 'Get your quote in minutes, coverage in hours'
    }
  ];

  return (
    <main>
      <HeroSection
        title="Auto Insurance"
        subtitle="Protect your ride with the right coverage"
        ctaText="Get My Auto Quote"
        ctaLink="#quote-form"
      />
      
      <FeatureGrid items={features} />
      
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <QuoteForm insuranceType="AUTO" />
        </div>
      </section>
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