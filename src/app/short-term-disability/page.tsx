import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function ShortTermDisabilityPage() {
  return <ProductPage params={{ type: 'HEALTH_SHORT_TERM_DISABILITY' as InsuranceType }} />;
}

export const metadata = {
  title: 'Short-Term Disability Insurance | QuoteLinker',
  description: 'Protect your income with short-term disability insurance from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 