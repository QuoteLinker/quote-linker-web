'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-cool-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <Image
          src="/quotelinker_logo.png"
          alt="QuoteLinker Logo"
          width={200}
          height={50}
          className="mx-auto mb-8"
        />
        
        <div className="bg-white rounded-lg shadow-brand p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-electric-blue/10">
              <svg className="h-6 w-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-deep-navy mb-4">
            Thank You!
          </h1>
          
          <p className="text-lg text-dark-gray mb-6">
            A licensed agent is reviewing your options now.
          </p>
          
          <p className="text-dark-gray mb-8">
            Expect a call, text, or email shortly to finalize your quote.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-electric-blue hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 