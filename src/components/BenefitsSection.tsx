'use client';

import { 
  UserGroupIcon,
  ShieldCheckIcon,
  UserIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const iconMap = {
  0: UserGroupIcon,
  1: ShieldCheckIcon,
  2: UserIcon,
  3: SparklesIcon,
};

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[index % 4];
            return (
              <div key={benefit.title} className="text-center">
                <div className="flex justify-center">
                  <Icon className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-base text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
