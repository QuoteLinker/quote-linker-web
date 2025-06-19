import { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';

export const metadata: Metadata = {
  title: 'Auto Insurance Quotes | QuoteLinker',
  description: 'Get competitive auto insurance quotes from top-rated carriers. Compare rates and coverage options to find the best auto policy for your needs.',
};

export default function AutoInsurancePage() {
  const content = getProductContent('AUTO');

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero insuranceType="AUTO" />
      <div id="quote-form" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Get Your Free Auto Insurance Quote</h2>
          <QuoteForm productType="Auto" />
        </div>
      </div>
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </main>
  );
}