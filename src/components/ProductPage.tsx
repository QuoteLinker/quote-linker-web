import React from 'react';
import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustSection from '@/components/TrustSection';
import StickyCTA from '@/components/StickyCTA';
import { InsuranceType } from '@/utils/insuranceCopy';

interface ProductPageProps {
  insuranceType: InsuranceType;
  product: {
    title: string;
    subtitle: string;
    benefits: string[];
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

export default function ProductPage({ insuranceType, product }: ProductPageProps) {
  return (
    <div className="bg-white">
      <HeroSection
        title={product.title}
        subtitle={product.subtitle}
        ctaText={`Get My ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Quote`}
        ctaLink="#quote-form"
        insuranceType={insuranceType}
      />

      {/* Benefits Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#00e8ff] font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose {insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance Through QuoteLinker
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#00e8ff] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <p className="text-lg leading-6 font-medium text-gray-900">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <TrustSection />

      {/* Quote Form Section */}
      <div id="quote-form" className="bg-blue-50 py-12 sm:py-16 -mt-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative mb-8 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Ready to find your perfect {insuranceType} insurance match?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Get started with our simple quote form. It only takes a few minutes to find the coverage you need.
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Powered by a licensed insurance agent based in Minnesota
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <QuoteForm insuranceType={insuranceType} className="transform translate-y-0" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#00e8ff] font-semibold tracking-wide uppercase">FAQs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions About {insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-8 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-x-8 md:gap-y-8">
              {product.faqs.map((faq, index) => (
                <div key={index} className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <dt>
                    <div className="absolute flex items-center justify-center h-8 w-8 rounded-full bg-brand-primary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-12 text-lg font-medium text-gray-900">{faq.question}</p>
                  </dt>
                  <dd className="mt-3 ml-12 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <StickyCTA insuranceType={insuranceType} />
    </div>
  );
} 