import { notFound } from 'next/navigation';
import ProductPage from '@/components/ProductPage';
import { getProductContent, InsuranceType } from '@/utils/insuranceCopy';

export async function generateStaticParams() {
  return [
    { insuranceType: 'auto' },
    { insuranceType: 'home' },
    { insuranceType: 'term-life' },
    { insuranceType: 'permanent-life' },
    { insuranceType: 'short-term-disability' },
    { insuranceType: 'supplemental-health' },
  ];
}

export default function Page({ params }: { params: { insuranceType: string } }) {
  // Convert URL-friendly format to InsuranceType
  let insuranceType: InsuranceType;
  switch (params.insuranceType) {
    case 'auto':
      insuranceType = 'AUTO';
      break;
    case 'home':
      insuranceType = 'HOME';
      break;
    case 'term-life':
      insuranceType = 'TERM_LIFE';
      break;
    case 'permanent-life':
      insuranceType = 'PERMANENT_LIFE';
      break;
    case 'short-term-disability':
      insuranceType = 'SHORT_TERM_DISABILITY';
      break;
    case 'supplemental-health':
      insuranceType = 'SUPPLEMENTAL_HEALTH';
      break;
    default:
      return notFound();
  }

  return <ProductPage insuranceType={insuranceType} />;
} 