'use client';

import React from 'react';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';

const trustFeatures = [
  {
    name: 'Trusted Partners',
    description: 'We work with A-rated insurance carriers',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Fast & Easy',
    description: 'Get quotes in minutes, not hours',
    icon: ClockIcon,
  },
  {
    name: 'Save Money',
    description: 'Compare rates from multiple providers',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Top Rated',
    description: '4.8/5 average customer rating',
    icon: StarIcon,
  },
];

export default function TrustIndicators() {
  return (
    <div className="bg-gray-50 py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustFeatures.map((feature) => (
            <div
              key={feature.name}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <feature.icon className="h-8 w-8 text-[#00ECFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 