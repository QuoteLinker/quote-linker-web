import { Metadata } from 'next';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import { QuoteFlow } from '@/components/QuoteFlow';

export const metadata: Metadata = {
  title: 'Auto Insurance Quotes | QuoteLinker',
  description: 'Get competitive auto insurance quotes from top-rated carriers. Compare rates and coverage options to find the best auto policy for your needs.',
};

export default function AutoInsurancePage() {
  const content = getProductContent('AUTO');

  return (
    <>
      <QuoteFlow 
        type="AUTO"
        title="Auto Insurance Quotes"
        description="Get competitive auto insurance quotes from top-rated carriers."
        hero={{
          heading: "Find the Best Auto Insurance Rates",
          subheading: "Compare quotes from top insurers and save on your car insurance.",
          image: "/images/auto-insurance-hero.jpg"
        }}
      />
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </>
  );
}