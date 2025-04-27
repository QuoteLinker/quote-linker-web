'use client';

import React from 'react';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

const trustFeatures = [
  {
    name: 'Trusted Partners',
    description: 'We work with top rated insurance carriers',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Fast & Easy',
    description: 'Get quotes in minutes, not hours',
    icon: ClockIcon,
  },
  {
    name: 'Save Money',
    description: 'Compare rates from licensed agents who know how to get you the right discounts',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Top Rated',
    description: '4.8/5 average customer rating',
    icon: StarIcon,
  },
];

export default function TrustIndicators() {
  const indicators = [
    {
      icon: ShieldCheckIcon,
      text: 'Secure Application',
    },
    {
      icon: ClockIcon,
      text: 'Fast & Easy Quotes',
    },
    {
      icon: DocumentCheckIcon,
      text: 'No Obligation',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2 text-gray-600">
          <indicator.icon className="h-5 w-5 text-primary-500" />
          <span className="text-sm font-medium">{indicator.text}</span>
        </div>
      ))}
    </div>
  );
} 