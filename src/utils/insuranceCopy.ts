export type InsuranceType = 'auto' | 'home' | 'life' | 'disability' | 'health';

export interface InsuranceProduct {
  type: InsuranceType;
  title: string;
  subtitle: string;
  benefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const insuranceProducts: Record<InsuranceType, InsuranceProduct> = {
  auto: {
    type: 'auto',
    title: 'Find Your Perfect Auto Insurance Match',
    subtitle: 'Compare rates from top providers and save on your car insurance',
    benefits: [
      'Save up to 30% on your car insurance premiums',
      'Compare quotes from multiple providers',
      'Coverage tailored to your driving habits',
      '24/7 roadside assistance options'
    ],
    faqs: [
      {
        question: 'How much can I save on car insurance?',
        answer: 'Most drivers save between 15-30% on their premiums by comparing quotes through our platform.'
      },
      {
        question: 'What factors affect my auto insurance rates?',
        answer: 'Key factors include your driving history, vehicle type, location, and coverage preferences.'
      }
    ]
  },
  home: {
    type: 'home',
    title: 'Protect Your Home with the Right Coverage',
    subtitle: 'Get comprehensive home insurance quotes from trusted providers',
    benefits: [
      'Customized coverage for your home',
      'Protection against natural disasters',
      'Liability coverage included',
      'Quick claim processing'
    ],
    faqs: [
      {
        question: 'What does home insurance typically cover?',
        answer: 'Standard coverage includes dwelling protection, personal property, liability, and additional living expenses.'
      },
      {
        question: 'How is my home insurance premium calculated?',
        answer: 'Factors include home value, location, construction type, and coverage limits.'
      }
    ]
  },
  life: {
    type: 'life',
    title: "Secure Your Family's Future",
    subtitle: 'Find the right life insurance coverage for your loved ones',
    benefits: [
      'Financial security for your family',
      'Flexible coverage options',
      'Competitive rates from top carriers',
      'Easy application process'
    ],
    faqs: [
      {
        question: 'How much life insurance do I need?',
        answer: 'A common rule of thumb is 10-15 times your annual income, but your specific needs may vary.'
      },
      {
        question: 'What types of life insurance are available?',
        answer: 'Term life, whole life, and universal life insurance are the most common options.'
      }
    ]
  },
  disability: {
    type: 'disability',
    title: 'Protect Your Income with Disability Insurance',
    subtitle: 'Ensure financial stability if you're unable to work',
    benefits: [
      'Income protection during disability',
      'Short and long-term coverage options',
      'Customizable benefit periods',
      'Coverage for self-employed individuals'
    ],
    faqs: [
      {
        question: 'What is disability insurance?',
        answer: 'Disability insurance provides income replacement if you become unable to work due to illness or injury.'
      },
      {
        question: 'How much coverage should I get?',
        answer: 'Typically 60-70% of your current income, but this can vary based on your specific needs.'
      }
    ]
  },
  health: {
    type: 'health',
    title: 'Find Your Ideal Health Insurance Plan',
    subtitle: 'Compare comprehensive health coverage options',
    benefits: [
      'Access to quality healthcare providers',
      'Prescription drug coverage',
      'Preventive care services',
      'Mental health coverage'
    ],
    faqs: [
      {
        question: 'What types of health insurance plans are available?',
        answer: 'HMO, PPO, EPO, and POS plans are common options, each with different provider networks and costs.'
      },
      {
        question: 'When can I enroll in health insurance?',
        answer: 'During open enrollment periods or if you qualify for a special enrollment period due to life events.'
      }
    ]
  }
}; 