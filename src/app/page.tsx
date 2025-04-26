import QuoteForm from '@/components/QuoteForm';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Fast Insurance Quotes Auto, Home, Life, and Disability | QuoteLinker',
  description: 'QuoteLinker uses AI to help you get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
  keywords: ['insurance quotes', 'auto insurance', 'home insurance', 'life insurance', 'health insurance', 'disability insurance', 'Minnesota insurance', 'licensed insurance agent'],
  openGraph: {
    title: 'Fast Insurance Quotes Auto, Home, Life, and Disability | QuoteLinker',
    description: 'QuoteLinker uses AI to help you get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
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
          "description": "Connect with licensed insurance agents and get personalized quotes for various insurance types.",
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

      <QuoteForm />
    </div>
  );
} 