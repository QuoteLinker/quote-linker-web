import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/types/insurance';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Disability Insurance Quotes | Protect Your Income | QuoteLinker',
  description: 'Get competitive disability insurance quotes to protect your income. Compare rates and coverage options from top-rated carriers.',
  openGraph: {
    title: 'Disability Insurance Quotes | QuoteLinker',
    description: 'Get competitive disability insurance quotes to protect your income. Compare rates and coverage options from top-rated carriers.',
    url: 'https://www.quotelinker.com/disability',
    images: [
      {
        url: '/images/disability-insurance-og.png',
        width: 1200,
        height: 630,
        alt: 'Disability Insurance Quotes',
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
          name: 'Disability Insurance',
          description: 'Get competitive disability insurance quotes to protect your income.',
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

export default function DisabilityInsurancePage() {
  return (
    <>
      <InsuranceProductSchema />
      <ProductPage params={{ type: 'DISABILITY' as InsuranceType }} />
    </>
  );
} 