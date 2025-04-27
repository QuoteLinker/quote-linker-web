'use client';

import { HomeIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import ProductLayout from '@/components/ProductLayout';

export default function HomeInsurancePage() {
  const heroIconItems = [
    {
      icon: <HomeIcon className="h-6 w-6" />,
      text: 'Comprehensive home coverage',
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
      icon: <HomeIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Home Coverage',
      description: 'Get the coverage you need for your home.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Fast Approval',
      description: 'Quick and easy application process with fast approval times.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Reliable Protection',
      description: 'Trust in our comprehensive home insurance solutions.',
    },
  ];

  return (
    <ProductLayout
      productType="home"
      subType="home"
      heroTitle="Home Insurance Quotes"
      heroSubtitle="Find the right home coverage for you"
      heroCTA="Get Your Quote"
      heroIconItems={heroIconItems}
      benefitsTitle="Why Choose Home Insurance?"
      benefits={benefits}
    />
  );
} 