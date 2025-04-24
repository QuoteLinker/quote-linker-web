import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import TrustSection from '@/components/TrustSection';
import QuoteForm from '@/components/QuoteForm';

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection
        title="Smarter Insurance Starts Here"
        subtitle="Get personalized quotes from licensed local agents"
        ctaText="Start My Free Quote"
        ctaLink="/auto"
      />

      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose QuoteLinker</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Smart Way to Find Insurance
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Save Time and Money</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Compare quotes from multiple providers in minutes, not hours.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Expert Guidance</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Work with licensed agents who understand your needs.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Secure and Private</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your information is protected with bank-level security.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Fast and Easy</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get your quotes in minutes with our simple process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Products</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Insurance Solutions for Every Need
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
              {['Auto', 'Home', 'Life', 'Disability', 'Health'].map((type) => (
                <div key={type} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <span className="text-2xl">
                      {type === 'Auto' && '🚗'}
                      {type === 'Home' && '🏠'}
                      {type === 'Life' && '❤️'}
                      {type === 'Disability' && '🛡️'}
                      {type === 'Health' && '🏥'}
                    </span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{type} Insurance</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Find the perfect {type.toLowerCase()} insurance coverage for your needs.
                    </p>
                    <div className="mt-4">
                      <a
                        href={`/${type.toLowerCase()}`}
                        className="text-base font-medium text-blue-600 hover:text-blue-500"
                      >
                        Learn more →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HowItWorks />
      <TrustSection />

      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Ready to find your perfect insurance match?
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