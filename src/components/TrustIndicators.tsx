'use client';

import React from 'react';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon, DocumentCheckIcon, MapPinIcon } from '@heroicons/react/24/outline';

const trustFeatures = [
  {
    name: 'Minnesota Licensed',
    description: 'All agents are licensed in Minnesota and understand local requirements',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Fast & Easy',
    description: 'Get quotes in minutes, not hours',
    icon: ClockIcon,
  },
  {
    name: 'Save Money',
    description: 'Compare rates from licensed agents who know Minnesota discounts',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Top Rated',
    description: '4.8/5 average customer rating from Minnesota residents',
    icon: StarIcon,
  },
  {
    name: 'Local Expertise',
    description: 'Agents who understand Minnesota weather and driving conditions',
    icon: MapPinIcon,
  },
  {
    name: 'No Obligation',
    description: 'Compare quotes with no pressure to buy',
    icon: DocumentCheckIcon,
  },
];

export default function TrustIndicators() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {trustFeatures.map((feature, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-shrink-0">
            <feature.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 