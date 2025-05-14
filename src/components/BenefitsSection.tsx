'use client';

import { 
  UserGroupIcon,
  ShieldCheckIcon,
  UserIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <SparklesIcon className="w-8 h-8" aria-hidden="true" />,
      title: 'Smart AI Matching',
      description: 'Get matched with a local agent who understands your needs',
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" aria-hidden="true" />,
      title: 'No Spam, Just Agents',
      description: 'No robocalls or spam — only real, licensed professionals',
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" aria-hidden="true" />,
      title: 'Built by an Agent',
      description: 'Created by an actual insurance producer who knows the industry',
    },
    {
      icon: <UserIcon className="w-8 h-8" aria-hidden="true" />,
      title: 'Hassle-Free Experience',
      description: 'The most straightforward way to find the right insurance',
    },
  ];

  return (
    <section className="py-16 bg-white" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose QuoteLinker?
          </h2>
          <p className="text-xl text-gray-600">
            We&apos;re not just another quote aggregator. We&apos;re your personal connection to
            trusted local agents.
          </p>
        </div>
        {/* Responsive grid for benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-cool-gray rounded-2xl p-8 flex flex-col items-center hover:shadow-card-hover shadow-card transition-shadow min-h-[220px]"
            >
              <div className="text-electric-blue mb-4" aria-hidden="true">{benefit.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-dark-gray mb-2 text-center">{benefit.title}</h3>
              <p className="text-dark-gray text-center text-base md:text-lg">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
