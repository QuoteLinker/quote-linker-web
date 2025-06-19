'use client';

import React, { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { InsuranceType } from '@/utils/insuranceCopy';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';

// Dynamic imports for client components
const InsuranceHero = dynamic(() => import('@/components/InsuranceHero'), {
  loading: () => <LoadingSpinner />, ssr: true
});
// Lazy-load QuoteForm (heaviest dependency)
const QuoteForm = React.lazy(() => import('@/components/QuoteForm'));
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <LoadingSpinner />, ssr: true
});
const WhyChoose = dynamic(() => import('@/components/WhyChoose'), {
  loading: () => <LoadingSpinner />, ssr: true
});

interface ProductPageProps {
  params: {
    type: string;
  };
}

const typeMapping: Record<string, InsuranceType> = {
  'auto': 'AUTO',
  'home': 'HOME',
  'life': 'LIFE',
  'health': 'HEALTH',
  'disability': 'DISABILITY',
  'term-life': 'LIFE_TERM',
  'permanent-life': 'LIFE_PERMANENT',
  'short-term-disability': 'HEALTH_SHORT_TERM_DISABILITY',
  'supplemental-health': 'HEALTH_SUPPLEMENTAL'
};

// Error state as a memoized component
const ErrorState = React.memo(() => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">We couldn&apos;t find the right insurance type for this page. Please check the URL or return to the home page.</p>
      <a href="/" className="inline-block px-6 py-3 bg-[#00EEFD] text-white rounded-lg font-bold text-lg shadow hover:bg-[#00D4E5] transition-colors duration-200">Return Home</a>
    </div>
  </div>
));

// Learn More snippet as a memoized component
const LearnMoreSnippet = React.memo(({ articleSlug, type }: { articleSlug: string, type: string }) => (
  <div className="lg:col-span-1 bg-white shadow-xl rounded-lg p-6 sm:p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn More</h3>
    <p className="text-gray-700 mb-4">
      Discover more about {type.replace(/-/g, ' ')} insurance and how to make the best choices for your needs.
    </p>
    <Link href={`/learn/${articleSlug}`}>
      <span className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-cyan-700 transition-colors duration-200">
        Read Our Guide
      </span>
    </Link>
  </div>
));

const getArticleSlug = (type: InsuranceType | undefined) => {
  switch (type) {
    case 'AUTO':
      return 'auto-insurance-basics';
    case 'HOME':
      return 'homeowners-insurance-guide';
    case 'LIFE':
      return 'life-insurance-explained';
    case 'HEALTH':
      return 'understanding-health-insurance';
    // Add more as needed
    default:
      return '';
  }
};

function ProductPage({ params }: ProductPageProps) {
  const inputType = params.type.toLowerCase();
  const type = useMemo(() => typeMapping[inputType], [inputType]);
  const articleSlug = useMemo(() => getArticleSlug(type), [type]);

  if (!type) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(`Invalid insurance type: ${params.type}. Input type:`, inputType, 'Type mapping:', typeMapping);
    }
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <InsuranceHero insuranceType={type} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden" id="quote-form">
              <div className="p-6 sm:p-8">
                <Suspense fallback={<LoadingSpinner />}>
                  <QuoteForm productType={type} />
                </Suspense>
              </div>
            </div>
          </div>
          {articleSlug && <LearnMoreSnippet articleSlug={articleSlug} type={params.type} />}
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <WhyChoose insuranceType={type} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <FAQ insuranceType={type} />
        </Suspense>
      </div>
    </div>
  );
}

export default React.memo(ProductPage);