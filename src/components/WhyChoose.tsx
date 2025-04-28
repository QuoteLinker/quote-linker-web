import React from 'react';
import { ShieldCheckIcon, CurrencyDollarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface WhyChooseProps {
  insuranceType: InsuranceType;
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Record<InsuranceType, Benefit[]> = {
  AUTO: [
    {
      icon: ShieldCheckIcon,
      title: 'Comprehensive Coverage',
      description: 'Protection against accidents, theft, and damage to your vehicle.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Rates',
      description: 'Compare quotes from top carriers to find the best value.',
    },
    {
      icon: ClockIcon,
      title: 'Quick Process',
      description: 'Get covered in minutes with our streamlined application process.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Agents',
      description: 'Work with licensed agents who specialize in auto insurance.',
    },
  ],
  HOME: [
    {
      icon: ShieldCheckIcon,
      title: 'Complete Protection',
      description: 'Coverage for your home, belongings, and liability.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Affordable Options',
      description: 'Find the right coverage at a price that fits your budget.',
    },
    {
      icon: ClockIcon,
      title: 'Fast Claims',
      description: 'Quick response and processing when you need it most.',
    },
    {
      icon: UserGroupIcon,
      title: 'Local Experts',
      description: 'Connect with agents who understand your area\'s specific needs.',
    },
  ],
  LIFE_TERM: [
    {
      icon: ShieldCheckIcon,
      title: 'Family Protection',
      description: 'Ensure your loved ones are financially secure.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Flexible Options',
      description: 'Affordable term life insurance solutions.',
    },
    {
      icon: ClockIcon,
      title: 'Simple Process',
      description: 'Easy application and quick approval process.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Guidance',
      description: 'Work with agents who understand life insurance planning.',
    },
  ],
  LIFE_PERMANENT: [
    {
      icon: ShieldCheckIcon,
      title: 'Lifetime Protection',
      description: 'Coverage that lasts your entire life.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cash Value Growth',
      description: 'Build wealth while protecting your family.',
    },
    {
      icon: ClockIcon,
      title: 'Simple Process',
      description: 'Easy application and quick approval process.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Guidance',
      description: 'Work with agents who understand permanent life insurance.',
    },
  ],
  HEALTH_SHORT_TERM_DISABILITY: [
    {
      icon: ShieldCheckIcon,
      title: 'Income Protection',
      description: 'Replace your income if you can\'t work.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Affordable Coverage',
      description: 'Protect your income at a reasonable cost.',
    },
    {
      icon: ClockIcon,
      title: 'Quick Benefits',
      description: 'Start receiving benefits when you need them.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Support',
      description: 'Work with agents who understand disability insurance.',
    },
  ],
  HEALTH_SUPPLEMENTAL: [
    {
      icon: ShieldCheckIcon,
      title: 'Extra Protection',
      description: 'Additional coverage beyond your primary health insurance.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost-Effective',
      description: 'Affordable supplemental health coverage options.',
    },
    {
      icon: ClockIcon,
      title: 'Quick Enrollment',
      description: 'Easy enrollment process for supplemental coverage.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Guidance',
      description: 'Work with agents who understand supplemental health insurance.',
    },
  ],
  LIFE: [
    {
      icon: ShieldCheckIcon,
      title: 'Comprehensive Protection',
      description: 'Protect your loved ones with flexible coverage options.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Affordable Solutions',
      description: 'Find the right coverage at competitive rates.',
    },
    {
      icon: ClockIcon,
      title: 'Simple Process',
      description: 'Easy application and quick approval process.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Guidance',
      description: 'Work with agents who understand all types of life insurance.',
    },
  ],
  HEALTH: [
    {
      icon: ShieldCheckIcon,
      title: 'Complete Coverage',
      description: 'Comprehensive health insurance for your needs.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Flexible Plans',
      description: 'Choose from a variety of coverage options.',
    },
    {
      icon: ClockIcon,
      title: 'Quick Access',
      description: 'Get the care you need when you need it.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Support',
      description: 'Work with agents who understand healthcare coverage.',
    },
  ],
};

export default function WhyChoose({ insuranceType }: WhyChooseProps) {
  const productBenefits = benefits[insuranceType];
  const displayTitle = productBenefits ? insuranceType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ') : '';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B0B45] mb-4">
            Why Choose {displayTitle} Insurance?
          </h2>
          <p className="text-xl text-gray-600">
            Get the coverage you need with these key benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="w-16 h-16 bg-[#00EEFD] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-8 h-8 text-[#00EEFD]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B0B45] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 