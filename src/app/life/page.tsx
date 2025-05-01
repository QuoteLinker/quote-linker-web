import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function LifeInsurancePage() {
  return <ProductPage params={{ type: 'LIFE' as InsuranceType }} />;
}

export const metadata = {
  title: 'Life Insurance | QuoteLinker',
  description: 'Protect your family\'s future with customized life insurance from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 