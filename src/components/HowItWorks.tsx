import React from 'react';
import { ClipboardDocumentCheckIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface HowItWorksProps {
  insuranceType: InsuranceType;
}

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Submit Your Form',
    description: 'Fill out our simple form with your basic information. It only takes a few minutes.',
  },
  {
    icon: UserGroupIcon,
    title: 'Get Matched with a Licensed Agent',
    description: 'We\'ll connect you with a qualified agent who specializes in your insurance needs.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Get Covered Fast',
    description: 'Review your options, choose your coverage, and get protected quickly and easily.',
  },
];

export default function HowItWorks({ insuranceType }: HowItWorksProps) {
  const displayTitle = insuranceType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B0B45] mb-4">
            How QuoteLinker Works
          </h2>
          <p className="text-xl text-gray-600">
            Get your {displayTitle} Insurance quote in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="w-16 h-16 bg-[#00EEFD] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-[#00EEFD]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B0B45] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 