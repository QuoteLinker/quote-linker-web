import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'home',
  'Home Insurance Quotes | QuoteLinker',
  'Get personalized home insurance quotes from a licensed agent. Protect your home with comprehensive coverage tailored to your needs.',
  ['home insurance', 'property insurance', 'house insurance', 'Minnesota home insurance', 'insurance quotes']
);

export default function HomeInsurancePage() {
  const product = insuranceProducts.home;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'home',
          'Comprehensive home insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="home" product={product} />
    </div>
  );
} 