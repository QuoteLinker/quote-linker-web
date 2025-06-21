import React from 'react';
import { ArrowRight, BarChart2, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'Exclusive Territory',
    description: 'Lock in your exclusive territory with first-mover pricing.',
    icon: ShieldCheck,
  },
  {
    name: 'AI-Powered Leads',
    description: 'Smart matching technology connects you with high-intent prospects.',
    icon: BarChart2,
  },
  {
    name: 'CRM Integration',
    description: 'Seamlessly sync leads with your existing CRM workflow.',
    icon: Users,
  },
];

export default function AgentHero() {
  return (
    <div className="relative bg-background-primary">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-text-primary sm:mt-10 sm:text-6xl">
              Get Exclusive Insurance Leads in Your Territory
            </h1>
            <p className="mt-6 text-lg leading-8 text-text-body">
              QuoteLinker connects you with qualified prospects actively seeking coverage. Lock in your exclusive territory today.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/agents/start-trial"
                className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Start free trial
              </Link>
              <Link
                href="/agents/demo"
                className="text-sm font-semibold leading-6 text-text-primary"
              >
                Book demo <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Value props tooltips */}
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:gap-x-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative group">
                  <dt className="text-base font-semibold leading-7 text-text-primary">
                    <div className="absolute left-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 group-hover:bg-primary-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base leading-7 text-text-body">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <div className="relative aspect-[3/2] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/images/agent-dashboard-preview.png"
              alt="Preview of the Agent Dashboard showing analytics and lead management"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background-primary/80 via-background-primary/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
