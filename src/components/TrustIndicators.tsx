'use client';

import React from 'react';
import { ShieldCheck, Clock, DollarSign, Star, Lock, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

const trustFeatures = [
  {
    name: 'Licensed Professionals',
    description: 'All agents are fully licensed and understand local requirements',
    icon: ShieldCheck,
  },
  {
    name: 'Fast & Simple',
    description: 'Get personalized quotes in minutes, not hours',
    icon: Clock,
  },
  {
    name: 'Save Money',
    description: 'Compare rates from multiple carriers to find the best value',
    icon: DollarSign,
  },
  {
    name: 'Top Rated Service',
    description: '4.8/5 average customer rating from satisfied customers',
    icon: Star,
  },
  {
    name: 'Secure & Private',
    description: 'Your information is protected with bank-level encryption',
    icon: Lock,
  },
  {
    name: 'No Obligation',
    description: 'Compare quotes with no pressure to buy',
    icon: ThumbsUp,
  },
];

export default function TrustIndicators() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-8">Why Choose QuoteLinker?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-center p-4 rounded-lg hover:bg-cyan-50 transition-colors duration-200">
            <div className="flex-shrink-0 mr-4 p-2 bg-cyan-50 rounded-full text-cyan-600">
              <feature.icon size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-8 border-t">
        <p className="text-center text-sm text-gray-500 mb-6">Trusted by customers nationwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <Image src="/logos/partner1.svg" alt="Insurance Partner" width={100} height={30} className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300" />
          <Image src="/logos/partner2.svg" alt="Insurance Partner" width={100} height={30} className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300" />
          <Image src="/logos/partner3.svg" alt="Insurance Partner" width={100} height={30} className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300" />
          <Image src="/logos/partner4.svg" alt="Insurance Partner" width={100} height={30} className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
} 