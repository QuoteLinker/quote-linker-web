'use client';

import { useState } from 'react';
import { HeartIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import ProductLayout from '@/components/ProductLayout';

export default function LifeInsurancePage() {
  const [subType, setSubType] = useState<'term' | 'permanent'>('term');

  const heroIconItems = [
    {
      icon: <HeartIcon className="h-6 w-6" />,
      text: 'Comprehensive life coverage',
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      text: 'Quick approval process',
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      text: 'Reliable protection',
    },
  ];

  const benefits = [
    {
      icon: <HeartIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Life Coverage',
      description: 'Get the coverage you need for your loved ones.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Fast Approval',
      description: 'Quick and easy application process with fast approval times.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Reliable Protection',
      description: 'Trust in our comprehensive life insurance solutions.',
    },
  ];

  return (
    <ProductLayout
      productType="life"
      subType={subType}
      heroTitle="Life Insurance Quotes"
      heroSubtitle="Find the right life coverage for you"
      heroCTA="Get Your Quote"
      heroIconItems={heroIconItems}
      benefitsTitle="Why Choose Life Insurance?"
      benefits={benefits}
      showToggle
      toggleOptions={[
        { value: 'term', label: 'Term Life' },
        { value: 'permanent', label: 'Permanent Life' },
      ]}
      onToggleChange={(value) => setSubType(value as 'term' | 'permanent')}
    />
  );
} 