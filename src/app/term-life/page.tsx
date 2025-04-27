import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function TermLifeInsurancePage() {
  return <ProductPage insuranceType="TERM_LIFE" />;
}

export const metadata = {
  title: 'Term Life Insurance - QuoteLinker',
  description: 'Get affordable term life insurance coverage to protect your loved ones.',
}; 