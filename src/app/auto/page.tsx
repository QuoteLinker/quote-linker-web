import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustSection from '@/components/TrustSection';
import { insuranceProducts } from '@/utils/insuranceCopy';

export default function AutoInsurancePage() {
  const product = insuranceProducts.auto;

  return (
    <div className="bg-white">
      <HeroSection
        title={product.title}
        subtitle={product.subtitle}
        ctaText="Get My Auto Quote"
        ctaLink="#quote-form"
        insuranceType="auto"
      />

      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Auto Insurance Through QuoteLinker
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <span className="text-2xl">✓</span>
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

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">FAQs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions About Auto Insurance
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {product.faqs.map((faq, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <span className="text-2xl">?</span>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{faq.question}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <TrustSection />

      <div id="quote-form" className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Ready to find your perfect auto insurance match?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Get started with our simple quote form. It only takes a few minutes to find the coverage you need.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <QuoteForm insuranceType="auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 