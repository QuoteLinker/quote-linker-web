import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InsuranceProvider } from '@/context/InsuranceContext';
import QuoteFormStepper from '@/components/QuoteFormStepper';

export const metadata: Metadata = {
  title: 'Term Life Insurance Quotes | QuoteLinker',
  description: 'Get competitive term life insurance quotes tailored to your needs. Compare affordable coverage options from top-rated carriers.',
};

export default function TermLifePage() {
  return (
    <InsuranceProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white pt-24 pb-16">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Term Life Insurance
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Get affordable term life insurance coverage to protect your family's future.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6">
          <QuoteFormStepper />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Term Life Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Term life insurance offers affordable protection for a specific period of time
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Coverage</h3>
              <p className="text-gray-600">
                Term life insurance typically offers the most coverage for your premium dollar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple & Straightforward</h3>
              <p className="text-gray-600">
                Easy to understand coverage for a specific time period—10, 20, or 30 years.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Protection</h3>
              <p className="text-gray-600">
                Provides security when your family needs it most, like paying off a mortgage or funding college.
              </p>
            </div>
          </div>
        </div>
      </main>
    </InsuranceProvider>
  );
}
