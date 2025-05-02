import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ChartBarIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Partner with QuoteLinker – AI-Driven Lead Generation for Agents',
  description: 'Join QuoteLinker to access exclusive insurance leads and scalable funnel automation built for modern agents.',
  openGraph: {
    title: 'Partner with QuoteLinker – AI-Driven Lead Generation for Agents',
    description: 'Access exclusive insurance leads and scalable funnel automation.',
    images: [{ url: '/images/agents-og.png', width: 1200, height: 630 }],
  },
};

const features = [
  {
    name: '100% Exclusive Leads',
    description: 'Every lead is yours alone. No sharing, no bidding wars, just direct connections with high-intent prospects.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Smart Matching by ZIP Code',
    description: 'Our AI matches leads to agents based on location, ensuring you get prospects in your target territory.',
    icon: ChartBarIcon,
  },
  {
    name: 'Pay-As-You-Grow Pricing',
    description: 'Start with a volume that fits your budget and scale up as your business grows. No long-term commitments.',
    icon: CurrencyDollarIcon,
  },
];

const integrations = [
  {
    name: 'Salesforce CRM',
    description: 'Automatic lead sync and tracking',
    status: 'Coming Soon',
  },
  {
    name: 'OpenPhone',
    description: 'Integrated calling and SMS',
    status: 'Coming Soon',
  },
  {
    name: 'Stripe Billing',
    description: 'Flexible subscription management',
    status: 'Coming Soon',
  },
  {
    name: 'Zapier',
    description: 'Connect with 5000+ apps',
    status: 'Coming Soon',
  },
];

const testimonial = {
  content: "QuoteLinker's exclusive leads and territory protection have helped me double my book of business in just 6 months. The quality of prospects is outstanding.",
  author: {
    name: 'Sarah Johnson',
    role: 'Independent Insurance Agent',
    image: '/images/testimonials/sarah-johnson.jpg',
  },
};

export default function AgentsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/20 to-white" />
        <div className="container max-w-screen-xl mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Grow Your Insurance Business with Exclusive Leads
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              QuoteLinker connects high-intent consumers with top local agents using AI-powered funnels.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/contact"
                className="rounded-lg bg-electric-blue px-6 py-2.5 text-sm font-medium text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
              >
                Apply for Access
              </Link>
              <a
                href="https://calendly.com/quotelinker/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container max-w-screen-xl mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built for Modern Insurance Agents
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform helps you focus on what matters most: building relationships and closing deals.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-6 w-6 flex-none text-electric-blue" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful Integrations
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect QuoteLinker with your favorite tools to streamline your workflow.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col rounded-lg bg-white p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {integration.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{integration.description}</p>
                <p className="mt-6 text-sm font-medium text-electric-blue">{integration.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container max-w-screen-xl mx-auto px-4 py-24">
        <figure className="mx-auto max-w-2xl">
          <blockquote className="relative text-center text-xl font-medium leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p className="before:content-['\u201C'] after:content-['\u201D'] italic">
              {testimonial.content}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-x-6">
            <div className="relative h-12 w-12 rounded-full bg-gray-50">
              <Image
                src={testimonial.author.image}
                alt={testimonial.author.name}
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 768px) 3rem, 3rem"
              />
            </div>
            <div className="text-base">
              <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
              <div className="mt-1 text-gray-600">{testimonial.author.role}</div>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join QuoteLinker today and start receiving exclusive, high-quality insurance leads.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                href="/contact"
                className="rounded-lg bg-electric-blue px-6 py-2.5 text-sm font-medium text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
              >
                Apply for Access
              </Link>
              <a
                href="https://calendly.com/quotelinker/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
