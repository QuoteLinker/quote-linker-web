import { Metadata } from 'next';
import { Suspense } from 'react';
import MultiStepQuoteForm from '@/components/MultiStepQuoteForm'; // Import the multi-step form
import TrustIndicators from '@/components/TrustIndicators'; // Import trust indicators

export const metadata: Metadata = {
  title: 'Get Your Insurance Quote - QuoteLinker',
  description: 'Start your free insurance quote process with QuoteLinker. We connect you with trusted local agents for the best rates on auto, home, life, and health insurance.',
};

// Loading state component
function FormLoadingState() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-slate-200 rounded col-span-1"></div>
            <div className="h-10 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
        </div>
        <div className="h-12 bg-slate-200 rounded-full w-1/3 mx-auto"></div>
      </div>
    </div>
  );
}

export default function GetQuotePage() {
  return (
    // Ensure the main div takes full height and uses flex to center content
    <div className="min-h-screen flex flex-col items-center py-12 md:py-16 bg-gradient-to-b from-white to-slate-50 px-4 sm:px-6 lg:px-8">
      {/* Container to maintain consistent width and alignment */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Header section with value proposition */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Get Matched With Top Insurance Providers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mx-auto">
            Compare personalized quotes from trusted insurance companies in minutes.
          </p>
        </div>
        
        {/* The multi-step form wrapped in Suspense - ensure it's centered */}
        <div className="w-full mx-auto">
          <Suspense fallback={<FormLoadingState />}>
            <MultiStepQuoteForm />
          </Suspense>
        </div>
        
        {/* Trust indicators below the form */}
        <div className="mt-16 w-full">
          <TrustIndicators />
        </div>
      </div>
    </div>
  );
}