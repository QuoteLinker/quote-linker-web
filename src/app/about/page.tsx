import { Metadata } from 'next';
import { ShieldCheckIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About QuoteLinker - Your Trusted Insurance Partner',
  description: 'Learn about QuoteLinker\'s mission to simplify insurance shopping and connect you with trusted providers.',
};

const features = [
  {
    name: 'Expert Guidance',
    description: 'Our team of insurance professionals ensures you get the best coverage for your needs.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Customer-First Approach',
    description: 'We prioritize your needs and work to find the perfect insurance solution for you.',
    icon: UserGroupIcon,
  },
  {
    name: 'Data-Driven Insights',
    description: 'We use advanced analytics to match you with the most suitable insurance providers.',
    icon: ChartBarIcon,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About QuoteLinker
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We're on a mission to simplify insurance shopping and connect you with trusted providers.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#00EEFD] rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-50 rounded-lg px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-500">
              QuoteLinker was founded with a simple idea: insurance shopping should be easy and transparent. 
              We've built our platform to connect you with trusted insurance providers while ensuring you get 
              the coverage that best fits your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 