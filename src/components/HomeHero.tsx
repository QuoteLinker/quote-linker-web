import React from 'react';
import Image from 'next/image';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';

const trustBadges = [
  { icon: Shield, text: 'Licensed & Verified Agents' },
  { icon: Clock, text: 'Quotes in Minutes' },
  { icon: Star, text: '4.9/5 Customer Rating' },
];

export default function HomeHero() {
  return (
    <div className="relative isolate overflow-hidden bg-background-primary">
      <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
                Find the Right Insurance Coverage Today
              </h1>
              <p className="mt-6 text-lg leading-8 text-text-body">
                Compare personalized quotes from trusted local agents. Save up to 30% on auto, home, life, and health insurance.
              </p>
              
              {/* Get Quote Form */}
              <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="insurance-type" className="block text-sm font-medium text-text-primary">
                      Insurance Type
                    </label>
                    <select
                      id="insurance-type"
                      name="type"
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    >
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="health">Health Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="zip-code" className="block text-sm font-medium text-text-primary">
                      ZIP Code
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="zip"
                        id="zip-code"
                        className="block w-full rounded-md border-gray-300 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                        placeholder="Enter ZIP code"
                      />
                      <button
                        type="submit"
                        className="ml-4 inline-flex items-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {trustBadges.map((badge) => (
                    <div key={badge.text} className="flex items-center space-x-2">
                      <badge.icon className="h-5 w-5 text-accent-500" />
                      <span className="text-sm text-text-body">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Steps Infographic */}
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-background-secondary shadow-xl shadow-primary-500/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-background-primary [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-semibold text-text-primary mb-8">
                  How it Works
                </h2>
                <div className="relative">
                  <div className="absolute left-8 top-0 h-full w-px bg-gray-200" aria-hidden="true" />
                  <div className="space-y-8">
                    {[
                      { number: 1, title: 'Tell us what you need', description: 'Fill out a quick form with your insurance requirements.' },
                      { number: 2, title: 'Compare quotes', description: 'Get matched with licensed agents and compare coverage options.' },
                      { number: 3, title: 'Save on coverage', description: 'Choose the best policy and start saving up to 30%.' },
                    ].map((step) => (
                      <div key={step.number} className="relative flex items-start">
                        <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white text-xl font-semibold">
                          {step.number}
                        </div>
                        <div className="ml-24">
                          <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                          <p className="mt-2 text-text-body">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
