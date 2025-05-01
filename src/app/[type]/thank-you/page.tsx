import Link from 'next/link';
import { ShieldCheckIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface ThankYouPageProps {
  params: {
    type: string;
  };
}

const insuranceTypeTitles = {
  auto: 'Auto Insurance',
  home: 'Home Insurance',
  life: 'Life Insurance',
  health: 'Health Insurance',
  'short-term-disability': 'Short-Term Disability Insurance',
  'supplemental-health': 'Supplemental Health Insurance'
};

export default function ThankYouPage({ params }: ThankYouPageProps) {
  const insuranceType = params.type.toLowerCase();
  const title = insuranceTypeTitles[insuranceType as keyof typeof insuranceTypeTitles] || 'Insurance';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Thank You for Your Interest!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've received your information and will be in touch shortly with your personalized {title} quotes.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  A licensed Minnesota agent will contact you within 15 minutes during business hours.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-5 w-5 text-gray-400" />
                </div>
                <p className="ml-3 text-sm text-gray-600">
                  You'll receive quotes from multiple top-rated carriers in Minnesota.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 