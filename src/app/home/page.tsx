'use client';

import QuoteForm from '@/components/QuoteForm';
import ProductPageLayout from '@/components/ProductPageLayout';

export default function HomeInsurancePage() {
  return (
    <ProductPageLayout productType="home">
      <QuoteForm productType="home" subType="home" />
    </ProductPageLayout>
  );
} 