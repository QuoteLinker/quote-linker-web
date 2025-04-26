import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InsuranceType } from '@/utils/insuranceCopy';

interface ThankYouPageProps {
  params: {
    insuranceType: string;
  };
}

const validInsuranceTypes = ['auto', 'home', 'life', 'health', 'disability', 'term'];

export default function ThankYouPage({ params }: ThankYouPageProps) {
  const { insuranceType } = params;
  
  if (!validInsuranceTypes.includes(insuranceType)) {
    notFound();
  }

  const formattedType = insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Thank You!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              A licensed agent will contact you shortly to review your {insuranceType} insurance quote and coverage options.
            </p>
            <div className="mt-6">
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