import { Metadata } from 'next';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import { QuoteFlow } from '@/components/QuoteFlow';
import InsuranceProductSchema from '@/components/seo/InsuranceProductSchema';

export const metadata: Metadata = {
  title: 'Disability Insurance Quotes | Protect Your Income | QuoteLinker',
  description: 'Get competitive disability insurance quotes to protect your income. Compare rates and coverage options from top-rated carriers.',
  openGraph: {
    title: 'Disability Insurance Quotes | QuoteLinker',
    description: 'Get competitive disability insurance quotes to protect your income. Compare rates and coverage options from top-rated carriers.',
    url: 'https://www.quotelinker.com/disability',
    images: [
      {
        url: '/images/disability-insurance-og.png',
        width: 1200,
        height: 630,
        alt: 'Disability Insurance Quotes',
      },
    ],
  },
};

export default function DisabilityInsurancePage() {
  const content = getProductContent('DISABILITY');

  return (
    <>
      <InsuranceProductSchema insuranceType="DISABILITY" />
      <QuoteFlow 
        type="DISABILITY"
        title="Disability Insurance Quotes"
        description="Protect your income with comprehensive disability coverage."
        hero={{
          heading: "Protect Your Income and Financial Security",
          subheading: "Compare disability insurance quotes from top-rated carriers and secure your future.",
          image: "/images/disability-insurance-hero.jpg"
        }}
      />
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </>
  );
}