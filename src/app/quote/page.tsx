'use client';
import { Suspense } from 'react';
import QuoteForm from '@/components/QuoteForm';
import { useSearchParams } from 'next/navigation';

// Wrapper component to handle useSearchParams
const QuotePageContent = () => {
  const searchParams = useSearchParams();
  const productType = searchParams.get('type') || 'general';
  return <QuoteForm productType={productType} />;
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <QuotePageContent />
      </Suspense>
    </div>
  );
}