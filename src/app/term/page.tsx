import { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Term Life Insurance Quotes | Minnesota Licensed Agent',
  description: 'Get affordable term life insurance quotes from a licensed Minnesota agent. Compare rates from top providers and find the perfect coverage for your needs.',
  keywords: ['term life insurance', 'life insurance quotes', 'Minnesota life insurance', 'affordable life insurance', 'life insurance rates'],
};

const termLifeProduct = {
  title: 'Affordable Term Life Insurance for Your Family',
  subtitle: 'Protect your loved ones with flexible, budget-friendly term life insurance coverage',
  benefits: [
    'Fixed premiums for the entire term length',
    'Higher coverage amounts at lower monthly costs',
    'Flexible term lengths (10, 20, or 30 years)',
    'Convertible to permanent life insurance',
    'No medical exam options available',
    'Coverage up to $2 million',
    'Fast approval process',
    'Competitive rates from top carriers'
  ],
  faqs: [
    {
      question: 'What is term life insurance?',
      answer: 'Term life insurance provides coverage for a specific period (term) at a fixed premium. If you pass away during the term, your beneficiaries receive the death benefit. It\'s typically more affordable than permanent life insurance.'
    },
    {
      question: 'How much term life insurance do I need?',
      answer: 'The amount depends on your financial obligations, income, and family situation. A common rule of thumb is 10-15 times your annual income, but we can help you determine the right amount for your specific needs.'
    },
    {
      question: 'What term length should I choose?',
      answer: 'Consider your financial obligations and timeline. A 20-year term is popular for young families, while a 30-year term might be better for those with longer-term obligations. We can help you evaluate your options.'
    },
    {
      question: 'Will I need a medical exam?',
      answer: 'Many policies offer no-exam options for qualified applicants. However, policies with medical exams typically offer better rates. We can help you find the right balance for your situation.'
    },
    {
      question: 'Can I convert my term policy later?',
      answer: 'Many term policies offer conversion options to permanent life insurance without additional medical underwriting. This can be valuable if your needs change over time.'
    },
    {
      question: 'How quickly can I get coverage?',
      answer: 'Some policies offer instant approval and coverage within 24 hours. Traditional policies typically take 4-6 weeks for full underwriting. We can help you find the fastest option for your needs.'
    }
  ]
};

export default function TermLifePage() {
  return <ProductPage insuranceType="term" product={termLifeProduct} />;
} 