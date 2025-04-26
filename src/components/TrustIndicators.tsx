'use client';

import { ShieldCheckIcon, StarIcon, UserGroupIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: ShieldCheckIcon,
      text: 'Vetted Licensed Agents',
      description: 'Expert guidance from certified professionals'
    },
    {
      icon: UserGroupIcon,
      text: '1000+ Satisfied Clients',
      description: 'Trusted by families and individuals'
    },
    {
      icon: LockClosedIcon,
      text: 'Secure Form',
      description: 'Your information is protected'
    },
    {
      icon: StarIcon,
      text: '5-Star Service',
      description: 'Highly rated customer satisfaction'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <indicator.icon className="w-12 h-12 text-brand-primary mb-4" />
              <h3 className="text-xl font-semibold text-brand-headline mb-2">{indicator.text}</h3>
              <p className="text-brand-body">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 