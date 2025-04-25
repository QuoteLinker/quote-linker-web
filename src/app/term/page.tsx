import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustSection from '@/components/TrustSection';
import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'term',
  'Term Life Insurance Quotes | QuoteLinker',
  'Get personalized term life insurance quotes from licensed agents in Minnesota. Affordable coverage for a specific period to protect your loved ones.',
  ['term life insurance', 'temporary life insurance', 'affordable life insurance', 'Minnesota term insurance', 'insurance quotes']
);

export default function TermInsurancePage() {
  const product = insuranceProducts.term;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'term',
          'Comprehensive term life insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="term" product={product} />
    </div>
  );
} 