import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Life Insurance Quotes | Protect Your Family | QuoteLinker',
  description: 'Get competitive life insurance quotes from top-rated carriers. Compare term and permanent life insurance options to protect your loved ones.',
  openGraph: {
    title: 'Life Insurance Quotes | QuoteLinker',
    description: 'Get competitive life insurance quotes from top-rated carriers. Compare term and permanent life insurance options to protect your loved ones.',
    url: 'https://www.quotelinker.com/life',
    images: [
      {
        url: '/images/life-insurance-og.png',
        width: 1200,
        height: 630,
        alt: 'Life Insurance Quotes',
      },
    ],
  },
};

function InsuranceProductSchema() {
  return (
    <Script
      id="insurance-product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Life Insurance',
          description: 'Get competitive life insurance quotes from top-rated carriers.',
          provider: {
            '@type': 'Organization',
            name: 'QuoteLinker',
            url: 'https://www.quotelinker.com',
          },
          areaServed: 'US',
          serviceType: 'Insurance',
        }),
      }}
    />
  );
}

export default function LifeInsurancePage() {
  return <ProductPage params={{ type: 'life' }} />;
} 