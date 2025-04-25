import { Metadata } from 'next';
import QuoteForm from '../components/QuoteForm';

interface ProductPageProps {
  params: {
    type: string;
  };
}

const productInfo = {
  auto: {
    title: 'Auto Insurance',
    description: 'Get comprehensive auto insurance coverage tailored to your needs.',
    benefits: [
      '24/7 claims service',
      'Accident forgiveness',
      'Safe driving discounts',
      'Multiple vehicle discounts',
    ],
  },
  home: {
    title: 'Home Insurance',
    description: 'Protect your home with comprehensive coverage.',
    benefits: [
      'Property damage protection',
      'Personal liability coverage',
      'Natural disaster protection',
      'Home systems coverage',
    ],
  },
  life: {
    title: 'Life Insurance',
    description: 'Secure your family\'s future with our life insurance plans.',
    benefits: [
      'Flexible coverage options',
      'Cash value accumulation',
      'Death benefit protection',
      'Living benefits',
    ],
  },
  term: {
    title: 'Term Life Insurance',
    description: 'Affordable term life insurance for your family\'s protection.',
    benefits: [
      'Fixed premium rates',
      'Simple coverage options',
      'Convertible policies',
      'Family protection',
    ],
  },
  whole: {
    title: 'Whole Life Insurance',
    description: 'Permanent life insurance with guaranteed benefits.',
    benefits: [
      'Lifetime coverage',
      'Cash value growth',
      'Fixed premiums',
      'Death benefit guarantee',
    ],
  },
  disability: {
    title: 'Disability Insurance',
    description: 'Protect your income if you're unable to work.',
    benefits: [
      'Income replacement',
      'Flexible coverage options',
      'Short and long-term plans',
      'Return to work assistance',
    ],
  },
  supplemental: {
    title: 'Supplemental Insurance',
    description: 'Additional coverage to fill gaps in your primary insurance.',
    benefits: [
      'Critical illness coverage',
      'Accident insurance',
      'Hospital indemnity',
      'Cancer insurance',
    ],
  },
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const type = params.type as keyof typeof productInfo;
  const info = productInfo[type];

  return {
    title: `${info.title} | QuoteLinker`,
    description: info.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const type = params.type as keyof typeof productInfo;
  const info = productInfo[type];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product Information */}
          <div className="mb-8 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-4xl mb-3 sm:mb-4">
              {info.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              {info.description}
            </p>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Key Benefits
              </h2>
              <ul className="space-y-3">
                {info.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Get Your Quote
            </h2>
            <QuoteForm type={type} />
          </div>
        </div>
      </main>
    </div>
  );
} 