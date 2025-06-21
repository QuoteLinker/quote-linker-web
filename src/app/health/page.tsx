import { Metadata } from 'next';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import { QuoteFlow } from '@/components/QuoteFlow';

export const metadata: Metadata = {
  title: 'Health Insurance | QuoteLinker',
  description: 'Find the right health insurance coverage for your needs with QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
};

export default function HealthInsurancePage() {
  const content = getProductContent('HEALTH');

  return (
    <>
      <QuoteFlow 
        type="HEALTH"
        title="Health Insurance Quotes"
        description="Find the right health insurance coverage for your needs."
        hero={{
          heading: "Get the Health Coverage You Need",
          subheading: "Compare health insurance quotes and find the right plan for you and your family.",
          image: "/images/health-insurance-hero.jpg"
        }}
      />
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </>
  );
}