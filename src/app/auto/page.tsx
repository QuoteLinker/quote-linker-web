'use client';

import { TruckIcon, ClockIcon, ShieldCheckIcon, CurrencyDollarIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
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
      title: 'Comprehensive Coverage',
      description: 'Protect your vehicle with comprehensive coverage tailored to your needs.',
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Competitive Rates',
      description: 'Get the best rates from top insurance providers in your area.',
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Expert Support',
      description: 'Access to licensed insurance agents for personalized assistance.',
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Fast Process',
      description: 'Quick and easy application process with fast approval times.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Reliable Protection',
      description: 'Trust in our comprehensive auto insurance solutions.',
    },
    {
      icon: <StarIcon className="h-8 w-8 text-[#00EEFD]" />,
      title: 'Top-Rated Carriers',
      description: 'Access quotes from the most trusted insurance companies.',
    },
  ];

  return (
    <ProductLayout
      productType="auto"
      subType="auto"
      heroTitle="Auto Insurance Quotes"
      heroSubtitle="Find the perfect auto coverage for your needs at the best rates"
      heroCTA="Get My Free Quote"
      heroIconItems={heroIconItems}
      benefitsTitle="Why Choose Our Auto Insurance?"
      benefits={benefits}
    />
  );
} 