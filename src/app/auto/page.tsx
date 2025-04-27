'use client';

import { TruckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import ProductLayout from '@/components/ProductLayout';

export default function AutoInsurancePage() {
  const heroIconItems = [
    {
      icon: <TruckIcon className="h-6 w-6" />,
      text: 'Comprehensive auto coverage',
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
      icon: <TruckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Auto Coverage',
      description: 'Get the coverage you need for your vehicle.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Fast Approval',
      description: 'Quick and easy application process with fast approval times.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Reliable Protection',
      description: 'Trust in our comprehensive auto insurance solutions.',
    },
  ];

  return (
    <ProductLayout
      productType="auto"
      subType="auto"
      heroTitle="Auto Insurance Quotes"
      heroSubtitle="Find the right auto coverage for you"
      heroCTA="Get Your Quote"
      heroIconItems={heroIconItems}
      benefitsTitle="Why Choose Auto Insurance?"
      benefits={benefits}
    />
  );
} 