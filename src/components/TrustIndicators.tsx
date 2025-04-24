'use client';

import { ShieldCheckIcon, StarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/solid';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: ShieldCheckIcon,
      text: 'Licensed Agents',
      description: 'Expert guidance from certified professionals'
    },
    {
      icon: StarIcon,
      text: '5-Star Service',
      description: 'Highly rated customer satisfaction'
    },
    {
      icon: UserGroupIcon,
      text: '10K+ Customers',
      description: 'Trusted by thousands nationwide'
    },
    {
      icon: ClockIcon,
      text: '24/7 Support',
      description: 'Always here when you need us'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <indicator.icon className="w-12 h-12 text-[#00e8ff] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{indicator.text}</h3>
              <p className="text-gray-600">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 