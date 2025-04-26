import { insuranceProducts, InsuranceType } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';
import { notFound } from 'next/navigation';

type ProductType = 'auto' | 'home' | 'life' | 'health' | 'term-life' | 'permanent-life' | 'disability' | 'supplemental-health';

interface ProductPageProps {
  params: {
    productType: ProductType;
  };
}

// Map URL product types to InsuranceType values
const productTypeMap: Record<ProductType, InsuranceType> = {
  auto: 'AUTO',
  home: 'HOME',
  life: 'TERM_LIFE',
  health: 'SUPPLEMENTAL_HEALTH',
  'term-life': 'TERM_LIFE',
  'permanent-life': 'PERMANENT_LIFE',
  disability: 'SHORT_TERM_DISABILITY',
  'supplemental-health': 'SUPPLEMENTAL_HEALTH'
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productType } = params;
  
  if (!productTypeMap[productType]) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const insuranceType = productTypeMap[productType];
  const product = insuranceProducts[insuranceType];

  return generateInsuranceMetadata(
    insuranceType,
    `${product.title} Quotes | QuoteLinker`,
    product.subtitle,
    [productType, 'insurance', 'quotes', 'Minnesota']
  );
}

export default function DynamicProductPage({ params }: ProductPageProps) {
  const { productType } = params;
  
  if (!productTypeMap[productType]) {
    notFound();
  }

  const insuranceType = productTypeMap[productType];
  const product = insuranceProducts[insuranceType];

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(generateInsuranceStructuredData(insuranceType, product.subtitle))}
      </Script>
      <ProductPage insuranceType={insuranceType} />
    </>
  );
} 