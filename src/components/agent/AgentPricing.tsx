import React, { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const PricingTiers = [
  {
    name: 'Starter',
    description: 'Best for independent agents',
    price: { monthly: 199, annual: 179 },
    features: [
      '25 exclusive leads per month',
      'Basic CRM integration',
      'Email & SMS notifications',
      'Standard support'
    ]
  },
  {
    name: 'Professional',
    description: 'Perfect for growing teams',
    price: { monthly: 499, annual: 449 },
    featured: true,
    features: [
      '100 exclusive leads per month',
      'Advanced CRM integration',
      'Priority support',
      'Lead scoring & analytics',
      'Team collaboration tools'
    ]
  },
  {
    name: 'Enterprise',
    description: 'For large agencies',
    price: { monthly: 999, annual: 899 },
    features: [
      'Unlimited exclusive leads',
      'Custom CRM integration',
      'Dedicated account manager',
      'Advanced analytics & reporting',
      'White-label options',
      'API access'
    ]
  }
];

export default function AgentPricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="bg-background-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Simple pricing for growing agencies
          </h2>
          <p className="mt-4 text-lg text-text-body">
            Get 100% exclusive leads with territory protection. No long-term contracts required.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex rounded-full bg-background-accent p-1">
            <button
              type="button"
              className={`${
                billingCycle === 'monthly'
                  ? 'bg-primary-500 text-white'
                  : 'text-text-body hover:bg-background-secondary'
              } rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`${
                billingCycle === 'annual'
                  ? 'bg-primary-500 text-white'
                  : 'text-text-body hover:bg-background-secondary'
              } ml-2 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual
              <span className="ml-1 text-xs text-accent-500">Save 10%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {PricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`ring-1 ${
                tier.featured
                  ? 'ring-primary-500 shadow-primary-500/10'
                  : 'ring-gray-200'
              } rounded-3xl p-8 xl:p-10 ${
                tier.featured ? 'shadow-lg' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  className={`text-lg font-semibold leading-8 ${
                    tier.featured ? 'text-primary-500' : 'text-text-primary'
                  }`}
                >
                  {tier.name}
                </h3>
                {tier.featured && (
                  <p className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-500">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-text-body">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-text-primary">
                  ${billingCycle === 'monthly' ? tier.price.monthly : tier.price.annual}
                </span>
                <span className="text-sm font-semibold leading-6 text-text-body">/month</span>
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-text-body"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <ArrowRight
                      className="h-6 w-5 flex-none text-primary-500"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.featured ? '/agents/signup?plan=pro' : `/agents/signup?plan=${tier.name.toLowerCase()}`}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-primary-500 text-white shadow-sm hover:bg-primary-600 focus-visible:outline-primary-500'
                    : 'bg-background-accent text-primary-500 hover:bg-background-secondary'
                }`}
              >
                {tier.featured ? 'Start your free trial' : 'Learn more'}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="flex flex-col items-center p-4">
              <img
                src="/badges/bbb-a-plus.svg"
                alt="A+ BBB Rating"
                className="h-16 w-auto"
              />
              <p className="mt-2 text-sm text-text-body">A+ BBB Rating</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <img
                src="/badges/state-farm-partner.svg"
                alt="State Farm Licensed"
                className="h-16 w-auto"
              />
              <p className="mt-2 text-sm text-text-body">State Farm Licensed</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <img
                src="/badges/mn-seal.svg"
                alt="10 Years in MN"
                className="h-16 w-auto"
              />
              <p className="mt-2 text-sm text-text-body">10 Years in MN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
