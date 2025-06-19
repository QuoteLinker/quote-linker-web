import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InsuranceProvider } from '@/context/InsuranceContext';
import QuoteFormStepper from '@/components/QuoteFormStepper';

export const metadata: Metadata = {
  title: 'Cash Value Life Insurance Quotes | QuoteLinker',
  description: 'Get competitive cash value life insurance quotes. Compare permanent life insurance options with cash value components from top-rated carriers.',
};

export default function CashValueLifePage() {
  return (
    <InsuranceProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white pt-24 pb-16">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cash Value Life Insurance
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Build lifelong protection and cash value with permanent life insurance.
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
              Why Choose Cash Value Life Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cash value policies offer permanent coverage plus an investment component
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifelong Coverage</h3>
              <p className="text-gray-600">
                Provides coverage for your entire life as long as premiums are paid.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash Value Growth</h3>
              <p className="text-gray-600">
                Builds tax-deferred cash value that you can access during your lifetime.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Estate Planning Benefits</h3>
              <p className="text-gray-600">
                Provides a tax-efficient way to leave a legacy and handle estate taxes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </InsuranceProvider>
  );
}
