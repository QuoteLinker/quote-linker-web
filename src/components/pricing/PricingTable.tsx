import { useState } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface PriceOption {
  monthly: number;
  annual: number;
}

interface Feature {
  name: string;
  tiers: {
    free: boolean;
    basic: boolean;
    pro: boolean;
    enterprise: boolean;
  };
}

const tiers = [
  {
    name: 'Free',
    id: 'free',
    price: { monthly: 0, annual: 0 } as PriceOption,
    description: 'Get started with core features',
    features: [
      'Up to 10 leads per month',
      'Basic lead tracking',
      'Standard support',
      'Basic analytics',
    ],
    cta: 'Start Free',
    ctaLink: '/agents/signup?plan=free',
    highlighted: false,
  },
  {
    name: 'Basic',
    id: 'basic',
    price: { monthly: 49, annual: 470 } as PriceOption,
    description: 'Perfect for growing agencies',
    features: [
      'Up to 50 leads per month',
      'Advanced lead tracking',
      'Priority support',
      'Enhanced analytics',
      'CRM integration',
      'Team collaboration tools',
    ],
    cta: 'Start Trial',
    ctaLink: '/agents/signup?plan=basic',
    highlighted: false,
  },
  {
    name: 'Pro',
    id: 'pro',
    price: { monthly: 99, annual: 950 } as PriceOption,
    description: 'Built for high-performing teams',
    features: [
      'Unlimited leads',
      'Advanced lead scoring',
      '24/7 priority support',
      'Custom analytics',
      'Advanced CRM integration',
      'Team collaboration tools',
      'Custom branding',
      'API access',
    ],
    cta: 'Start Trial',
    ctaLink: '/agents/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: { monthly: null, annual: null } as unknown as PriceOption,
    description: 'Custom solutions for large teams',
    features: [
      'Custom lead volume',
      'Dedicated success manager',
      'White-label solution',
      'Custom analytics',
      'Premium CRM integration',
      'Advanced team tools',
      'Custom branding',
      'API access',
      'Custom development',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    ctaLink: '/agents/contact-sales',
    highlighted: false,
  },
];

const features: Feature[] = [
  {
    name: 'Lead Generation',
    tiers: { free: true, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'Lead Tracking',
    tiers: { free: true, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'Analytics Dashboard',
    tiers: { free: true, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'Email Notifications',
    tiers: { free: true, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'CRM Integration',
    tiers: { free: false, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'Team Collaboration',
    tiers: { free: false, basic: true, pro: true, enterprise: true },
  },
  {
    name: 'Custom Branding',
    tiers: { free: false, basic: false, pro: true, enterprise: true },
  },
  {
    name: 'API Access',
    tiers: { free: false, basic: false, pro: true, enterprise: true },
  },
  {
    name: 'White Labeling',
    tiers: { free: false, basic: false, pro: false, enterprise: true },
  },
  {
    name: 'Dedicated Support',
    tiers: { free: false, basic: false, pro: false, enterprise: true },
  },
];

export default function PricingTable() {
  const [annual, setAnnual] = useState(true);
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose your perfect plan
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="relative flex rounded-full bg-gray-100 p-1">
            <button
              type="button"
              className={clsx(
                'relative rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
                !annual ? 'bg-white shadow' : 'text-gray-700',
              )}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={clsx(
                'relative ml-0.5 rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
                annual ? 'bg-white shadow' : 'text-gray-700',
              )}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="absolute -top-2 -right-12 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={clsx(
                'rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10',
                tier.highlighted ? 'bg-gray-900 text-white' : 'bg-white',
                tierIdx === 0 && 'lg:rounded-r-none',
                tierIdx === tiers.length - 1 && 'lg:rounded-l-none',
                tierIdx > 0 && tierIdx < tiers.length - 1 && 'lg:rounded-none'
              )}
            >
              <h3
                className={clsx(
                  'text-lg font-semibold leading-8',
                  tier.highlighted ? 'text-white' : 'text-gray-900'
                )}
              >
                {tier.name}
              </h3>
              <p
                className={clsx(
                  'mt-4 text-sm leading-6',
                  tier.highlighted ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price[annual ? 'annual' : 'monthly'] === null
                    ? 'Custom'
                    : `$${tier.price[annual ? 'annual' : 'monthly']}`}
                </span>
                {tier.price[annual ? 'annual' : 'monthly'] !== null && (
                  <span
                    className={clsx(
                      'text-sm',
                      tier.highlighted ? 'text-gray-300' : 'text-gray-600'
                    )}
                  >
                    {annual ? '/year' : '/month'}
                  </span>
                )}
              </p>
              <a
                href={tier.ctaLink}
                className={clsx(
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  tier.highlighted
                    ? 'bg-primary-500 text-white hover:bg-primary-400 focus-visible:outline-primary-500'
                    : 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600'
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={clsx(
                  'mt-8 space-y-3 text-sm leading-6',
                  tier.highlighted ? 'text-gray-300' : 'text-gray-600'
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={clsx(
                        'h-6 w-5 flex-none',
                        tier.highlighted ? 'text-primary-400' : 'text-primary-600'
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features comparison table */}
        <div className="mt-16">
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 text-left">
                  Features
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    className="px-3 py-4 text-sm font-semibold text-gray-900 text-center"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIdx) => (
                <tr
                  key={feature.name}
                  className={featureIdx % 2 === 0 ? 'bg-gray-50' : undefined}
                >
                  <td className="py-4 pl-4 pr-3 text-sm text-gray-900">
                    {feature.name}
                  </td>
                  {Object.entries(feature.tiers).map(([tierId, included]) => (
                    <td key={tierId} className="px-3 py-4 text-center">
                      {included ? (
                        <Check
                          className="mx-auto h-5 w-5 text-primary-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="sr-only">Not included</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
