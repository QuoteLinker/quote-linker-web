'use client';

import QuoteForm from '@/components/QuoteForm';

export default function HomeInsurancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Home Insurance Quotes</h1>
      
      <div className="flex justify-center items-center mx-auto max-w-lg pb-8">
        <QuoteForm productType="home" subType="home" />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Home Insurance - QuoteLinker',
  description: 'Protect your home with comprehensive coverage from QuoteLinker.',
}; 