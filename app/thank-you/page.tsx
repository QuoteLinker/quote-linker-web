import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | QuoteLinker',
  description: 'Thank you for your interest in our insurance products.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Thank You!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We've received your quote request and will be in touch shortly.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What's Next?
          </h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">
                Our licensed agent will review your information
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">
                You'll receive a personalized quote within 24 hours
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">
                We'll help you find the best coverage for your needs
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 