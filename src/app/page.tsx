import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustIndicators from '@/components/TrustIndicators';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'QuoteLinker - Find Your Perfect Insurance Match',
  description: 'Connect with licensed insurance agents in Minnesota and get personalized quotes for auto, home, life, health, and disability insurance.',
  keywords: ['insurance quotes', 'auto insurance', 'home insurance', 'life insurance', 'health insurance', 'disability insurance', 'Minnesota insurance', 'licensed insurance agent'],
  openGraph: {
    title: 'QuoteLinker - Find Your Perfect Insurance Match',
    description: 'Connect with licensed insurance agents in Minnesota and get personalized quotes for auto, home, life, health, and disability insurance.',
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
        title="Find Your Perfect Insurance Match"
        subtitle="Connect with licensed insurance agents in Minnesota and get personalized quotes for your needs."
        ctaText="Get Started"
        ctaLink="#quote-form"
      />
      
      <TrustIndicators />

      <div id="quote-form" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Get Your Free Quote</h2>
            <QuoteForm insuranceType="auto" />
          </div>
        </div>
      </div>
    </div>
  );
} 