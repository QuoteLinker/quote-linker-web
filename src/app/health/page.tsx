'use client';

import { useState } from 'react';
import { HeartIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import ProductLayout from '@/components/ProductLayout';

export default function HealthInsurancePage() {
  const [subType, setSubType] = useState<'std' | 'supplemental'>('std');

  const heroIconItems = [
    {
      icon: <HeartIcon className="h-6 w-6" />,
      text: 'Comprehensive health coverage',
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
      title: 'Health Coverage',
      description: 'Get the coverage you need for your health.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Fast Approval',
      description: 'Quick and easy application process with fast approval times.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Reliable Protection',
      description: 'Trust in our comprehensive health insurance solutions.',
    },
  ];

  return (
    <ProductLayout
      productType="health"
      subType={subType}
      heroTitle="Health Insurance Quotes"
      heroSubtitle="Find the right health coverage for you"
      heroCTA="Get Your Quote"
      heroIconItems={heroIconItems}
      benefitsTitle="Why Choose Health Insurance?"
      benefits={benefits}
      showToggle
      toggleOptions={[
        { value: 'std', label: 'Short-Term Disability' },
        { value: 'supplemental', label: 'Supplemental Health' },
      ]}
      onToggleChange={(value) => setSubType(value as 'std' | 'supplemental')}
    />
  );
} 