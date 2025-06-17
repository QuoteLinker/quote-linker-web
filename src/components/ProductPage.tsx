'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { InsuranceType } from '@/utils/insuranceCopy';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link'; // Added Link import
// import { getArticleBySlug } from '@/utils/getArticles'; // Commented out as it's not used yet

// Dynamic imports for client components
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const QuoteForm = dynamic(() => import('@/components/QuoteForm'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <LoadingSpinner />,
  ssr: true
});

const WhyChoose = dynamic(() => import('@/components/WhyChoose'), {
  loading: () => <LoadingSpinner />,
  ssr: true
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

export default function ProductPage({ params }: ProductPageProps) {
  const inputType = params.type.toLowerCase();
  const type = typeMapping[inputType];

  // Determine the relevant article slug based on product type
  let articleSlug = '';
  switch (type) {
    case 'AUTO':
      articleSlug = 'auto-insurance-basics'; // Example slug, adjust as needed
      break;
    case 'HOME':
      articleSlug = 'homeowners-insurance-guide'; // Example slug
      break;
    case 'LIFE':
      articleSlug = 'life-insurance-explained'; // Example slug
      break;
    case 'HEALTH':
      articleSlug = 'understanding-health-insurance'; // Placeholder, create this article or use an existing one
      break;
    // Add cases for other insurance types if needed
  }

  // Fetch the relevant article for snippet display (server-side or pass as prop if client component)
  // This is a simplified example; consider how to best fetch/pass this data
  // For a client component, this fetch might need to happen in a useEffect or be passed down.
  // However, since ProductPage can be a server component, we can fetch directly.
  // Let's assume getArticleBySlug can be called here if ProductPage is a Server Component or in a getStaticProps/getServerSideProps if using Pages Router.
  // For App Router, if this is a server component, direct async calls are fine.
  // If it must be a client component due to dynamic imports, data fetching strategy needs adjustment.

  // This part is conceptual for snippet display. Actual implementation depends on component type (Server/Client)
  // const articleForSnippet = articleSlug ? getArticleBySlug(articleSlug) : null;
  // For now, we will just construct the link and a placeholder for the snippet.

  if (!type) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Invalid insurance type: ${params.type}. Input type:`, inputType, 'Type mapping:', typeMapping);
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We couldn&apos;t find the right insurance type for this page. Please check the URL or return to the home page.</p>
          <a href="/" className="inline-block px-6 py-3 bg-[#00EEFD] text-white rounded-lg font-bold text-lg shadow hover:bg-[#00D4E5] transition-colors duration-200">Return Home</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero insuranceType={type} />
      </Suspense>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden" id="quote-form">
              <div className="p-6 sm:p-8">
                <Suspense fallback={<LoadingSpinner />}>
                  <QuoteForm />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Learning Content Snippet Section */}
          {articleSlug && (
            <div className="lg:col-span-1 bg-white shadow-xl rounded-lg p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn More</h3>
              {/* Placeholder for article snippet. Ideally, fetch and display a summary. */}
              <p className="text-gray-700 mb-4">
                Discover more about {params.type.replace(/-/g, ' ')} insurance and how to make the best choices for your needs.
              </p>
              <Link href={`/learn/${articleSlug}`}>
                <span className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-cyan-700 transition-colors duration-200">
                  Read Our Guide
                </span>
              </Link>
            </div>
          )}
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