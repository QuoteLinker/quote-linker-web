import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InsuranceProvider } from '@/context/InsuranceContext';
import QuoteFormStepper from '@/components/QuoteFormStepper';

export const metadata: Metadata = {
  title: 'Final Expense Insurance Quotes | QuoteLinker',
  description: 'Get competitive final expense insurance quotes. Compare affordable burial insurance options from top-rated carriers to cover funeral costs and final expenses.',
};

export default function FinalExpenseLifePage() {
  return (
    <InsuranceProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="relative bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white pt-24 pb-16">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Final Expense Insurance
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Ensure your funeral costs and final expenses are covered without burdening your loved ones.
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
              Why Choose Final Expense Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Final expense insurance provides peace of mind for you and your family
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Premiums</h3>
              <p className="text-gray-600">
                Lower face amounts mean manageable monthly premiums, even on fixed incomes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simplified Underwriting</h3>
              <p className="text-gray-600">
                Often easier to qualify for with less stringent medical requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Peace of Mind</h3>
              <p className="text-gray-600">
                Ensures your funeral costs and final expenses won't burden your loved ones.
              </p>
            </div>
          </div>
        </div>
      </main>
    </InsuranceProvider>
  );
}
