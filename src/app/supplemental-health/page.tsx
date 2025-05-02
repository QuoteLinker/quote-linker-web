import ProductPage from '@/components/ProductPage';

export default function SupplementalHealthPage() {
  return <ProductPage params={{ type: 'supplemental-health' }} />;
}

export const metadata = {
  title: 'Supplemental Health Insurance | QuoteLinker',
  description: 'Get supplemental health insurance coverage from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 