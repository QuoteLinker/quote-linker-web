import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function TermLifePage() {
  return <ProductPage params={{ type: 'LIFE_TERM' as InsuranceType }} />;
}

export const metadata = {
  title: 'Term Life Insurance | QuoteLinker',
  description: 'Get affordable term life insurance coverage from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 