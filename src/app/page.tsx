import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import QuoteForm from '@/components/QuoteForm';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'QuoteLinker - Turn Old Leads Into New Premium',
  description:
    'Connect with qualified insurance leads and grow your business with our AI-powered platform. Trusted by agents nationwide.',
  keywords: [
    'insurance leads',
    'lead generation',
    'insurance agents',
    'lead management',
    'insurance sales',
    'lead conversion',
    'insurance marketing',
    'lead nurturing',
  ],
  openGraph: {
    title: 'QuoteLinker - Turn Old Leads Into New Premium',
    description:
      'Connect with qualified insurance leads and grow your business with our AI-powered platform. Trusted by agents nationwide.',
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
          description: 'Connect with qualified insurance leads and grow your business with our AI-powered platform.',
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
                name: 'Lead Generation',
                description: 'AI-powered lead generation and management',
                url: '/agent',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Lead Management',
                description: 'Smart lead tracking and conversion tools',
                url: '/agent/dashboard',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'InsuranceLeadGenerator',
                name: 'Analytics',
                description: 'Performance tracking and ROI optimization',
                url: '/agent/analytics',
              },
            },
          ],
        })}
      </Script>

      <HeroSection
        title="Turn Old Leads Into New Premium"
        subtitle="Connect with qualified insurance leads and grow your business with our AI-powered platform."
        ctaText="Get Started"
        ctaLink="/agent/signup"
      />

      <BenefitsSection />
    </main>
  );
}
