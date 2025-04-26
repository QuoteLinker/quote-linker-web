export type InsuranceType = 'AUTO' | 'HOME' | 'TERM_LIFE' | 'PERMANENT_LIFE' | 'SHORT_TERM_DISABILITY' | 'SUPPLEMENTAL_HEALTH';

interface Benefit {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InsuranceProduct {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  faqs: FAQ[];
}

export const insuranceProducts: Record<InsuranceType, InsuranceProduct> = {
  AUTO: {
    title: 'Auto Insurance',
    subtitle: 'Find the perfect auto insurance coverage for your needs',
    benefits: [
      {
        title: 'Compare Quotes',
        description: 'Compare quotes and coverage options provided by licensed agents'
      },
      {
        title: 'Save Time & Money',
        description: 'Save time and money on your auto insurance'
      },
      {
        title: 'Personalized Coverage',
        description: 'Get personalized coverage recommendations'
      },
      {
        title: 'Easy Process',
        description: 'Easy online quote process'
      },
      {
        title: 'Flexible Payments',
        description: 'Flexible payment options'
      }
    ],
    faqs: [
      {
        question: 'What factors affect my auto insurance rates?',
        answer: 'Several factors can affect your auto insurance rates, including your driving history, age, location, type of vehicle, and coverage options selected.'
      },
      {
        question: 'How much auto insurance coverage do I need?',
        answer: 'The amount of coverage you need depends on your state\'s requirements, your assets, and your risk tolerance. We\'ll help you determine the right coverage for your situation.'
      },
      {
        question: 'Can I get a quote without my driver\'s license?',
        answer: 'While you can start the quote process without your license, you\'ll need it to finalize your policy. Have your license ready for the most accurate quote.'
      },
      {
        question: 'How quickly can I get coverage?',
        answer: 'Most policies can be bound within a few hours of working with a licensed agent. Some providers even offer instant coverage options.'
      }
    ]
  },
  HOME: {
    title: 'Home Insurance',
    subtitle: 'Protect your home with the right insurance coverage',
    benefits: [
      {
        title: 'Comprehensive Protection',
        description: 'Comprehensive home protection'
      },
      {
        title: 'Competitive Rates',
        description: 'Competitive rates from licensed agents'
      },
      {
        title: 'Customizable Coverage',
        description: 'Customizable coverage options'
      },
      {
        title: 'Quick Process',
        description: 'Quick and easy quote process'
      },
      {
        title: 'Expert Guidance',
        description: 'Expert guidance from licensed agents'
      }
    ],
    faqs: [
      {
        question: 'What does home insurance cover?',
        answer: 'Home insurance typically covers damage to your home\'s structure, personal property, liability protection, and additional living expenses if your home becomes uninhabitable.'
      },
      {
        question: 'How much home insurance do I need?',
        answer: 'The amount of coverage you need depends on your home\'s value, location, and your personal property. We\'ll help you assess your needs accurately.'
      },
      {
        question: 'What factors affect home insurance rates?',
        answer: 'Factors include your home\'s age, location, construction type, claims history, and the coverage options you select.'
      },
      {
        question: 'Can I bundle home and auto insurance?',
        answer: 'Yes, many providers offer discounts for bundling multiple insurance policies together.'
      }
    ]
  },
  TERM_LIFE: {
    title: 'Term Life Insurance',
    subtitle: 'Secure your family\'s future with the right life insurance',
    benefits: [
      {
        title: 'Financial Protection',
        description: 'Financial protection for your loved ones'
      },
      {
        title: 'Flexible Options',
        description: 'Flexible policy options'
      },
      {
        title: 'Competitive Rates',
        description: 'Competitive rates that are tailored to your needs'
      },
      {
        title: 'Simple Process',
        description: 'Simple application process'
      },
      {
        title: 'Expert Guidance',
        description: 'Expert guidance from licensed agents'
      },
      {
        title: 'Peace of Mind',
        description: 'Peace of mind for your family'
      }
    ],
    faqs: [
      {
        question: 'How much life insurance do I need?',
        answer: 'The amount depends on your income, debts, and your family\'s needs. We\'ll help you calculate the right coverage amount.'
      },
      {
        question: 'What types of life insurance are available?',
        answer: 'Common types include term life, whole life, and universal life insurance. Each has different benefits and costs.'
      },
      {
        question: 'How quickly can I get coverage?',
        answer: 'Some policies offer instant coverage, while others may require a simple questionaire and sometimes a basic medical exam. We\'ll help you find the right option for your needs.'
      },
      {
        question: 'What factors affect life insurance rates?',
        answer: 'Factors include your age, health, lifestyle, and the type and amount of coverage you select.'
      }
    ]
  },
  PERMANENT_LIFE: {
    title: 'Permanent Life Insurance',
    subtitle: 'Lifetime protection with cash value growth',
    benefits: [
      {
        title: 'Lifetime Coverage',
        description: 'Lifetime coverage'
      },
      {
        title: 'Cash Value',
        description: 'Cash value accumulation'
      },
      {
        title: 'Tax Benefits',
        description: 'Tax-deferred growth'
      },
      {
        title: 'Flexible Payments',
        description: 'Flexible premium payments'
      },
      {
        title: 'Policy Loans',
        description: 'Borrow against your policy'
      },
      {
        title: 'Legacy Planning',
        description: 'Leave a legacy for your loved ones'
      }
    ],
    faqs: [
      {
        question: 'What is permanent life insurance?',
        answer: 'Permanent life insurance provides coverage for your entire life and includes a cash value component that grows over time.'
      },
      {
        question: 'How does the cash value work?',
        answer: 'A portion of your premium goes into a cash value account that grows tax-deferred. You can borrow against this value or use it to pay premiums.'
      },
      {
        question: 'What types of permanent life insurance are available?',
        answer: 'Common types include whole life, universal life, and variable universal life insurance.'
      },
      {
        question: 'Is permanent life insurance right for me?',
        answer: 'Permanent life insurance is ideal for those seeking lifetime coverage and want to build cash value. We\'ll help you determine if it\'s the right choice.'
      }
    ]
  },
  SHORT_TERM_DISABILITY: {
    title: 'Short-Term Disability Insurance',
    subtitle: 'Protect your income if you can\'t work',
    benefits: [
      {
        title: 'Income Protection',
        description: 'Income protection if you can\'t work'
      },
      {
        title: 'Flexible Coverage',
        description: 'Flexible coverage options'
      },
      {
        title: 'Cash Benefits',
        description: 'Cash benefits to help you cover living expenses'
      },
      {
        title: 'Simple Process',
        description: 'Simple application process'
      },
      {
        title: 'Direct Payment',
        description: 'Benefits paid directly to you'
      }
    ],
    faqs: [
      {
        question: 'What does short-term disability insurance cover?',
        answer: 'It provides income replacement if you become unable to work due to illness or injury for a short period, typically 3-6 months.'
      },
      {
        question: 'How much coverage do I need?',
        answer: 'Coverage amounts typically range from 40-60% of your income. We\'ll help you determine the right amount for your needs.'
      },
      {
        question: 'How long does coverage last?',
        answer: 'Short-term disability benefits typically last 3-6 months, depending on your policy.'
      },
      {
        question: 'When do benefits start?',
        answer: 'Benefits usually begin after a waiting period of 0-14 days from the start of your disability.'
      }
    ]
  },
  SUPPLEMENTAL_HEALTH: {
    title: 'Supplemental Health Insurance',
    subtitle: 'Extra coverage for your healthcare needs',
    benefits: [
      {
        title: 'Additional Coverage',
        description: 'Additional coverage beyond your primary health insurance'
      },
      {
        title: 'Cost Help',
        description: 'Help with out-of-pocket costs'
      },
      {
        title: 'Specific Coverage',
        description: 'Coverage for specific health conditions'
      },
      {
        title: 'Flexible Plans',
        description: 'Flexible plan options'
      },
      {
        title: 'No Restrictions',
        description: 'No network restrictions'
      }
    ],
    faqs: [
      {
        question: 'What is supplemental health insurance?',
        answer: 'It\'s additional coverage that helps pay for costs not covered by your primary health insurance, such as deductibles, copayments, and specific medical conditions.'
      },
      {
        question: 'Do I need supplemental health insurance?',
        answer: 'It depends on your healthcare needs and financial situation. We\'ll help you evaluate if it\'s right for you.'
      },
      {
        question: 'What types of supplemental plans are available?',
        answer: 'Common types include critical illness, accident, hospital indemnity, and dental/vision plans.'
      },
      {
        question: 'Can I have multiple supplemental plans?',
        answer: 'Yes, you can have multiple supplemental plans to cover different healthcare needs.'
      }
    ]
  }
};

export function getProductContent(type: InsuranceType): InsuranceProduct {
  return insuranceProducts[type];
}