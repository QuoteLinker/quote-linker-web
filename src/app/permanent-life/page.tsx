import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function PermanentLifePage() {
  return <ProductPage params={{ type: 'LIFE_PERMANENT' as InsuranceType }} />;
}

export const metadata = {
  title: 'Permanent Life Insurance | QuoteLinker',
  description: 'Build lasting financial security with permanent life insurance from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 