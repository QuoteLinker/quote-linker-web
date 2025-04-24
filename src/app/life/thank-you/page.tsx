import Link from 'next/link';

export default function LifeInsuranceThankYouPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You!</h2>
          <p className="mt-2 text-lg text-gray-600">
            A licensed agent will reach out to you shortly to help with your life insurance coverage.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 