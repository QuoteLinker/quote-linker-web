'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  const isInsuranceTypeError = error.message.includes('Invalid insurance type');

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {isInsuranceTypeError ? 'Insurance Type Not Found' : 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isInsuranceTypeError 
            ? 'The requested insurance type is not available. Please select from our available insurance products.'
            : 'We apologize for the inconvenience. Our team has been notified and is working to fix the issue.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isInsuranceTypeError && (
            <button
              onClick={reset}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-[#00D4E5] transition-colors shadow-brand hover:shadow-lg"
            >
              Try again
            </button>
          )}
          <Link
            href="/"
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
} 