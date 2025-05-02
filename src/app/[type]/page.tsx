import { Metadata } from 'next';

interface InsurancePageProps {
  params: {
    type: string;
  };
}

export async function generateMetadata({ params }: InsurancePageProps): Promise<Metadata> {
  const insuranceType = params.type.charAt(0).toUpperCase() + params.type.slice(1);
  
  return {
    title: `${insuranceType} Insurance Quotes | QuoteLinker`,
    description: `Get competitive ${insuranceType.toLowerCase()} insurance quotes from top-rated carriers. Compare rates and coverage options to find the best policy for your needs.`,
  };
}

export default function InsurancePage({ params }: InsurancePageProps) {
  const insuranceType = params.type.toLowerCase();
  const displayType = params.type.charAt(0).toUpperCase() + params.type.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your {displayType} Insurance Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare competitive {displayType.toLowerCase()} insurance quotes from top-rated carriers. 
            Fill out the form below to get started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Remove <QuoteForm intent={insuranceType} /> from the render tree */}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Top-Rated Carriers</h3>
              <p className="text-gray-600">
                We work with the most trusted insurance providers to ensure you get the best coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Rates</h3>
              <p className="text-gray-600">
                Compare multiple quotes to find the best rates that fit your budget and needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary-600 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Licensed agents available to help you make the right choice for your coverage needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 