import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Fast Insurance Quotes | QuoteLinker for Auto, Home, Life, and Disability',
  description:
    'QuoteLinker uses AI to help you get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
  keywords: [
    'insurance quotes',
    'auto insurance',
    'home insurance',
    'life insurance',
    'health insurance',
    'disability insurance',
    'Minnesota insurance',
    'licensed insurance agent',
  ],
  openGraph: {
    title: 'Fast Insurance Quotes | QuoteLinker for Auto, Home, Life, and Disability',
    description:
      'QuoteLinker uses AI to help you get personalized insurance quotes fast and easy. Auto, Home, Life, and Disability quotes powered by AI. Trusted by families and individuals.',
    type: 'website',
    url: 'https://quotelinker.com',
  },
};

export default function Home() {
  return (
    <main>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'InsuranceLeadGenerator',
          name: 'QuoteLinker',
          description: 'Connect with licensed insurance agents and get personalized quotes.',
          url: 'https://quotelinker.com',
          areaServed: {
            '@type': 'State',
            name: 'Minnesota',
          },
          offers: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Auto Insurance',
                description: 'Comprehensive auto insurance coverage options',
                url: '/products/auto',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Home Insurance',
                description: 'Comprehensive home insurance coverage options',
                url: '/products/home',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Life Insurance',
                description: 'Comprehensive life insurance coverage options',
                url: '/term-life',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Health Insurance',
                description: 'Comprehensive health insurance coverage options',
                url: '/products/health',
              },
            },
          ],
        })}
      </Script>

      <HeroSection
        title="QuoteLinker"
        subtitle="Your Personal Connection to Trusted Insurance Agents"
        ctaText="Get My Free Quote"
        ctaLink="/term-life"
      />

      <BenefitsSection />
    </main>
  );
}
