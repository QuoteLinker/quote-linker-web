import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Quotes - QuoteLinker',
  description: 'Get instant quotes for Auto, Home, Life & Health insurance from licensed agents.',
};

export default function InsuranceQuotesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Insurance Quotes Made Simple
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Compare quotes from top insurance providers and find the best coverage for your needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Auto Insurance */}
          <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto Insurance</h3>
            <p className="text-gray-500 mb-4">Protect your vehicle with comprehensive coverage options.</p>
            <Link href="/auto" className="text-electric-blue hover:underline">
              Get Auto Insurance Quote
            </Link>
          </div>

          {/* Home Insurance */}
          <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Insurance</h3>
            <p className="text-gray-500 mb-4">Safeguard your home and belongings with tailored coverage.</p>
            <Link href="/home" className="text-electric-blue hover:underline">
              Get Home Insurance Quote
            </Link>
          </div>

          {/* Life Insurance */}
          <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Life Insurance</h3>
            <p className="text-gray-500 mb-4">Secure your family&apos;s future with flexible life insurance options.</p>
            <Link href="/life" className="text-electric-blue hover:underline">
              Get Life Insurance Quote
            </Link>
          </div>

          {/* Health Insurance */}
          <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Insurance</h3>
            <p className="text-gray-500 mb-4">Find affordable health coverage that meets your needs.</p>
            <Link href="/health" className="text-electric-blue hover:underline">
              Get Health Insurance Quote
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose QuoteLinker?</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="text-3xl font-bold text-electric-blue mb-2">4.8/5</div>
              <p className="text-gray-600">Customer Rating</p>
            </div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="text-3xl font-bold text-electric-blue mb-2">10k+</div>
              <p className="text-gray-600">Quotes Generated</p>
            </div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="text-3xl font-bold text-electric-blue mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}