import React from 'react';
import {
  TruckIcon,
  HomeIcon,
  HeartIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const products = [
  {
    icon: TruckIcon,
    title: 'Auto Insurance',
    description: 'Protect your vehicle with comprehensive coverage options tailored to your needs.',
    features: [
      'Liability Coverage',
      'Collision Coverage',
      'Comprehensive Coverage',
      'Personal Injury Protection',
    ],
    link: '/auto',
  },
  {
    icon: HomeIcon,
    title: 'Home Insurance',
    description: 'Safeguard your home and belongings with flexible coverage options.',
    features: [
      'Property Coverage',
      'Personal Property Protection',
      'Liability Coverage',
      'Additional Living Expenses',
    ],
    link: '/home',
  },
  {
    icon: HeartIcon,
    title: 'Life Insurance',
    description: 'Ensure your loved ones are protected with the right life insurance policy.',
    features: [
      'Term Life Insurance',
      'Whole Life Insurance',
      'Universal Life Insurance',
      'Death Benefit Protection',
    ],
    link: '/life',
  },
  {
    icon: BriefcaseIcon,
    title: 'Disability Insurance',
    description: 'Protect your income and financial security with disability coverage.',
    features: [
      'Short-term Disability',
      'Long-term Disability',
      'Income Protection',
      'Occupation Coverage',
    ],
    link: '/disability',
  },
];

export default function ProductsSection() {
  return (
    <section className="py-24 px-6 bg-brand-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-headline mb-4">
            Insurance Products
          </h2>
          <p className="text-xl text-brand-body max-w-2xl mx-auto">
            Find the perfect coverage for your needs with our comprehensive insurance options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="bg-brand-background p-8 rounded-2xl shadow-brand transition hover:shadow-2xl hover:scale-105"
              >
                <Icon className="w-10 h-10 text-brand-primary mb-4" />
                <h3 className="text-xl font-semibold text-brand-headline mb-2">
                  {product.title}
                </h3>
                <p className="text-brand-body mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-brand-body">
                      <svg
                        className="w-4 h-4 text-brand-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={product.link}
                  className="inline-block w-full text-center bg-brand-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-brand-primary-dark transition-colors shadow-brand"
                >
                  Learn More
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 