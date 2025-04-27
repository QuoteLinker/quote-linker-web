import React from 'react';
import { InsuranceType, getProductContent } from '@/utils/insuranceCopy';
import QuoteForm from '@/components/QuoteForm';
import StickyCTA from '@/components/StickyCTA';

// Helper function to convert InsuranceType to ProductType and SubType
function getQuoteFormTypes(insuranceType: InsuranceType): { productType: 'auto' | 'home' | 'life' | 'health', subType?: 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home' } {
  switch (insuranceType) {
    case 'AUTO':
      return { productType: 'auto' };
    case 'HOME':
      return { productType: 'home' };
    case 'TERM_LIFE':
      return { productType: 'life', subType: 'term' };
    case 'PERMANENT_LIFE':
      return { productType: 'life', subType: 'permanent' };
    case 'SHORT_TERM_DISABILITY':
      return { productType: 'health', subType: 'std' };
    case 'SUPPLEMENTAL_HEALTH':
      return { productType: 'health', subType: 'supplemental' };
    default:
      return { productType: 'auto' }; // Default fallback
  }
}

interface ProductPageProps {
  insuranceType: InsuranceType;
}

export default function ProductPage({ insuranceType }: ProductPageProps) {
  const product = getProductContent(insuranceType);
  const { productType, subType } = getQuoteFormTypes(insuranceType);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                {product.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {product.subtitle}
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <QuoteForm productType={productType} subType={subType} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose {product.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {product.benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {product.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StickyCTA insuranceType={insuranceType} />
    </div>
  );
} 