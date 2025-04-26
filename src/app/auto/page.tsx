'use client';

import QuoteForm from '@/components/QuoteForm';
import ProductPageLayout from '@/components/ProductPageLayout';

export default function AutoInsurancePage() {
  return (
    <ProductPageLayout productType="auto">
      <QuoteForm productType="auto" subType="auto" />
    </ProductPageLayout>
  );
} 