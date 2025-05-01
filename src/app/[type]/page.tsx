import { notFound } from 'next/navigation';
import ProductPage from '@/components/ProductPage';
import { getProductContent, InsuranceType } from '@/utils/insuranceCopy';

export async function generateStaticParams() {
  return [
    { type: 'auto' },
    { type: 'home' },
    { type: 'term-life' },
    { type: 'permanent-life' },
    { type: 'short-term-disability' },
    { type: 'supplemental-health' },
  ];
}

export default function Page({ params }: { params: { type: string } }) {
  // Convert URL-friendly format to InsuranceType
  let insuranceType: InsuranceType;
  switch (params.type) {
    case 'auto':
      insuranceType = 'AUTO';
      break;
    case 'home':
      insuranceType = 'HOME';
      break;
    case 'term-life':
      insuranceType = 'LIFE_TERM';
      break;
    case 'permanent-life':
      insuranceType = 'LIFE_PERMANENT';
      break;
    case 'short-term-disability':
      insuranceType = 'HEALTH_SHORT_TERM_DISABILITY';
      break;
    case 'supplemental-health':
      insuranceType = 'HEALTH_SUPPLEMENTAL';
      break;
    default:
      return notFound();
  }

  return <ProductPage params={{ type: insuranceType as InsuranceType }} />;
} 