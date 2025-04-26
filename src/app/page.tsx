import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustIndicators from '@/components/TrustIndicators';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Fast Auto, Home, Life, and Disability Insurance Quotes | QuoteLinker',
  description: 'Get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
  keywords: ['insurance quotes', 'auto insurance', 'home insurance', 'life insurance', 'health insurance', 'disability insurance', 'Minnesota insurance', 'licensed insurance agent'],
  openGraph: {
    title: 'Fast Auto, Home, Life, and Disability Insurance Quotes | QuoteLinker',
    description: 'Get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
    type: 'website',
    url: 'https://quotelinker.com',
  },
};

export default function Home() {
  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          "name": "QuoteLinker",
          "description": "Connect with licensed insurance agents in Minnesota and get personalized quotes for various insurance types.",
          "url": "https://quotelinker.com",
          "areaServed": {
            "@type": "State",
            "name": "Minnesota"
          },
          "offers": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "InsuranceAgency",
                "name": "Auto Insurance",
                "description": "Comprehensive auto insurance coverage options"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "InsuranceAgency",
                "name": "Home Insurance",
                "description": "Comprehensive home insurance coverage options"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "InsuranceAgency",
                "name": "Life Insurance",
                "description": "Comprehensive life insurance coverage options"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "InsuranceAgency",
                "name": "Health Insurance",
                "description": "Comprehensive health insurance coverage options"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "InsuranceAgency",
                "name": "Disability Insurance",
                "description": "Comprehensive disability insurance coverage options"
              }
            }
          ]
        })}
      </Script>

      <HeroSection
        title="Save Time and Money on Your Insurance Coverage"
        subtitle="Get personalized quotes from licensed agents in minutes. Simple, fast, and trusted insurance quotes tailored to your needs."
        ctaText="Get Started"
        ctaLink="#quote-form"
        insuranceType="auto"
      />
      
      <TrustIndicators />

      <div id="quote-form" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Get Your Free Quote</h2>
            <QuoteForm insuranceType="auto" />
            <p className="mt-4 text-sm text-gray-600 text-center">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 