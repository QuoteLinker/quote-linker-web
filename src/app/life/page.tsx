import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'life',
  'Life Insurance Quotes | QuoteLinker',
  'Get personalized life insurance quotes from licensed agents in Minnesota. Secure your family\'s future with the right coverage for your needs.',
  ['life insurance', 'term life insurance', 'whole life insurance', 'Minnesota life insurance', 'insurance quotes']
);

export default function LifeInsurancePage() {
  const product = insuranceProducts.life;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'life',
          'Comprehensive life insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="life" product={product} />
    </div>
  );
} 