import { ReactNode } from 'react';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  UserIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export type MainInsuranceType = 'AUTO' | 'HOME' | 'LIFE' | 'HEALTH' | 'DISABILITY' | 'SUPPLEMENTAL';
export type LifeSubType = 'TERM' | 'PERMANENT';
export type HealthSubType = 'SHORT_TERM_DISABILITY' | 'SUPPLEMENTAL';
export type InsuranceType = 
  | 'AUTO' 
  | 'HOME' 
  | 'LIFE' 
  | 'HEALTH'
  | 'LIFE_TERM'
  | 'LIFE_PERMANENT'
  | 'HEALTH_SHORT_TERM_DISABILITY'
  | 'HEALTH_SUPPLEMENTAL'
  | 'DISABILITY';

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
  metaDescription: string;
  benefits: Benefit[];
  faqs: FAQ[];
}

export const insuranceProducts: Record<InsuranceType, InsuranceProduct> = {
  AUTO: {
    title: 'Auto Insurance',
    subtitle: 'Get the right auto coverage for Minnesota drivers',
    metaDescription: 'Protect your vehicle with our comprehensive auto insurance plans, tailored for Minnesota drivers. Get a quote today!',
    benefits: [
      {
        title: 'Adequate Liability',
        description: 'Protect your assets with proper liability limits',
      },
      {
        title: 'PIP Coverage',
        description: 'Essential medical coverage for Minnesota drivers',
      },
      {
        title: 'Uninsured Protection',
        description: 'Coverage when others lack insurance',
      },
      {
        title: 'Comprehensive',
        description: 'Protection against Minnesota weather and theft',
      },
      {
        title: 'Local Support',
        description: 'Work with licensed Minnesota agents',
      }
    ],
    faqs: [
      {
        question: 'Why are higher liability limits important?',
        answer: 'Minnesota\'s minimum liability limits ($30,000/$60,000) may not be enough to protect your assets in a serious accident. Higher limits help protect your savings, home, and future earnings from lawsuits. We recommend at least $100,000/$300,000 in liability coverage.'
      },
      {
        question: 'What is PIP coverage and why is it important?',
        answer: 'Personal Injury Protection (PIP) is required in Minnesota and covers medical expenses, lost wages, and other costs regardless of fault. It works with your health insurance and disability coverage to provide comprehensive protection.'
      },
      {
        question: 'How does auto insurance connect to disability coverage?',
        answer: 'While PIP provides immediate coverage after an accident, short-term disability insurance (STDI) provides longer-term income protection. Having both ensures you\'re covered from the moment of injury through recovery.'
      },
      {
        question: 'What discounts are available?',
        answer: 'Save through multi-policy discounts, safe driver discounts, good student discounts, and by choosing appropriate deductibles. We\'ll help you find all available savings opportunities.'
      }
    ]
  },
  HOME: {
    title: 'Home Insurance',
    subtitle: 'Protect your Minnesota home with comprehensive coverage',
    metaDescription: 'Secure your home with our reliable home insurance policies. Get comprehensive coverage and peace of mind today!',
    benefits: [
      {
        title: 'Adequate Liability',
        description: 'Protect your assets with proper liability limits',
      },
      {
        title: 'Property Coverage',
        description: 'Full replacement cost for your home',
      },
      {
        title: 'Weather Protection',
        description: 'Coverage for Minnesota weather-related damage',
      },
      {
        title: 'Additional Living',
        description: 'Coverage for temporary housing if needed',
      },
      {
        title: 'Local Expertise',
        description: 'Minnesota agents who know your area',
      }
    ],
    faqs: [
      {
        question: 'Why are higher liability limits important for homeowners?',
        answer: 'Standard liability limits may not be enough to protect your assets if someone is injured on your property. Higher limits help protect your savings, investments, and future earnings from lawsuits. We recommend at least $300,000 in liability coverage.'
      },
      {
        question: 'How does home insurance connect to disability coverage?',
        answer: 'If you become disabled and can\'t work, maintaining your home insurance is crucial. Having your own STDI policy ensures you can keep your coverage even if you lose employer benefits.'
      },
      {
        question: 'What special coverage do Minnesota homes need?',
        answer: 'Minnesota homes need protection against ice dams, frozen pipes, and winter storm damage. We recommend comprehensive coverage that includes these specific risks.'
      },
      {
        question: 'What discounts are available?',
        answer: 'Save through multi-policy discounts, home security systems, impact-resistant roofing, and new home discounts. We\'ll help you find all eligible discounts.'
      }
    ]
  },
  LIFE: {
    title: 'Life Insurance',
    subtitle: 'Protect your family\'s future with customized life insurance',
    metaDescription: 'Ensure your family\'s financial security with our tailored life insurance policies. Get started with a free quote!',
    benefits: [
      {
        title: 'Term Options',
        description: 'Affordable term life coverage options',
      },
      {
        title: 'Permanent Coverage',
        description: 'Whole life insurance with cash value',
      },
      {
        title: 'Flexible Solutions',
        description: 'Coverage tailored to your needs',
      },
      {
        title: 'Quick Application',
        description: 'Streamlined application process',
      },
      {
        title: 'Expert Guidance',
        description: 'Professional insurance guidance',
      }
    ],
    faqs: [
      {
        question: 'What types of life insurance are available?',
        answer: 'We offer both term life insurance for temporary needs and whole life insurance for permanent coverage. Term life provides affordable protection for specific periods, while whole life offers lifetime coverage with cash value growth.'
      },
      {
        question: 'How much life insurance do I need?',
        answer: 'Coverage needs vary based on your income, debts, family size, and long-term goals. We typically recommend 10-15 times your annual income, but we\'ll help you calculate the right amount for your situation.'
      },
      {
        question: 'What are the advantages of term vs. whole life?',
        answer: 'Term life offers affordable coverage for specific periods, ideal for temporary needs like mortgage protection or children\'s education. Whole life provides lifetime coverage and builds cash value you can access, making it suitable for long-term needs and estate planning.'
      },
      {
        question: 'How do I choose the right policy?',
        answer: 'We\'ll help you evaluate factors like your budget, coverage needs, and long-term goals to find the right policy. We can explain the features of each option and help you make an informed decision.'
      }
    ]
  },
  HEALTH: {
    title: 'Health Insurance',
    subtitle: 'Find the right health insurance coverage for your needs',
    metaDescription: 'Explore our health insurance options to find the perfect coverage for your medical needs and budget. Get a quote now!',
    benefits: [
      {
        title: 'Comprehensive Coverage',
        description: 'Comprehensive health coverage',
      },
      {
        title: 'Flexible Options',
        description: 'Flexible plan options',
      },
      {
        title: 'Competitive Rates',
        description: 'Competitive rates from licensed agents',
      },
      {
        title: 'Simple Process',
        description: 'Simple application process',
      },
      {
        title: 'Expert Guidance',
        description: 'Expert guidance from licensed agents',
      }
    ],
    faqs: [
      {
        question: 'What types of health insurance are available?',
        answer: 'Common types include individual health plans, short-term disability, and supplemental health insurance. Each has different benefits and costs.'
      },
      {
        question: 'How much health insurance do I need?',
        answer: 'The amount depends on your health needs, budget, and risk tolerance. We\'ll help you find the right coverage for your situation.'
      },
      {
        question: 'Can I get coverage if I have pre-existing conditions?',
        answer: 'Yes, under the Affordable Care Act, insurance companies cannot deny coverage or charge more for pre-existing conditions.'
      },
      {
        question: 'When can I enroll in health insurance?',
        answer: 'You can enroll during the annual Open Enrollment Period, or you may qualify for a Special Enrollment Period if you experience certain life events.'
      }
    ]
  },
  LIFE_TERM: {
    title: 'Term Life Insurance',
    subtitle: 'Affordable protection for your family\'s needs',
    metaDescription: 'Get affordable term life insurance to protect your family\'s financial future. Choose from flexible terms and coverage amounts.',
    benefits: [
      {
        title: 'Flexible Terms',
        description: '10, 20, or 30-year terms available',
      },
      {
        title: 'Level Premiums',
        description: 'Rates stay the same for your term',
      },
      {
        title: 'High Coverage',
        description: 'More coverage for your money',
      },
      {
        title: 'Conversion Option',
        description: 'Convert to permanent coverage later',
      },
      {
        title: 'Simple Process',
        description: 'Easy application and approval',
      }
    ],
    faqs: [
      {
        question: 'What term lengths are available?',
        answer: 'We offer 10, 20, and 30-year terms to match your specific needs. Choose a term that aligns with your financial obligations, such as a mortgage or children\'s education.'
      },
      {
        question: 'Can I convert my term policy to permanent insurance?',
        answer: 'Yes, our term policies include a conversion option that allows you to convert to permanent coverage without a new medical exam, regardless of changes in your health.'
      },
      {
        question: 'How much term life insurance should I get?',
        answer: 'Coverage amounts typically range from $100,000 to over $1 million. We recommend considering your income, debts, and family\'s future needs when determining the right amount.'
      },
      {
        question: 'What happens when my term expires?',
        answer: 'When your term ends, you can convert to permanent insurance, renew the term policy (usually at a higher rate), or let the coverage end. We\'ll help you plan ahead for this decision.'
      }
    ]
  },
  LIFE_PERMANENT: {
    title: 'Whole Life Insurance',
    subtitle: 'Lifetime protection with guaranteed cash value growth',
    metaDescription: 'Secure lifetime coverage with our whole life insurance. Enjoy guaranteed cash value growth and peace of mind.',
    benefits: [
      {
        title: 'Lifetime Coverage',
        description: 'Protection that never expires',
      },
      {
        title: 'Guaranteed Cash Value',
        description: 'Tax-deferred growth you can access',
      },
      {
        title: 'Level Premiums',
        description: 'Premiums never increase',
      },
      {
        title: 'Dividend Potential',
        description: 'Opportunity for additional benefits',
      },
      {
        title: 'Living Benefits',
        description: 'Access your policy\'s cash value',
      }
    ],
    faqs: [
      {
        question: 'How does the cash value in whole life insurance work?',
        answer: 'Your whole life policy builds guaranteed cash value that grows tax-deferred. You can access this value through policy loans or withdrawals for any purpose, such as supplementing retirement income, funding education, or handling emergencies. The cash value continues to grow even when you borrow against it.'
      },
      {
        question: 'What are the advantages of cash value growth?',
        answer: 'The cash value grows at a guaranteed rate and is not subject to market fluctuations. You can use it to supplement retirement income, fund major expenses, or as an emergency fund. The growth is tax-deferred, and loans against the cash value are tax-free.'
      },
      {
        question: 'How do dividends work with whole life insurance?',
        answer: 'While not guaranteed, our whole life policies are eligible for dividend payments. Dividends can be taken in cash, used to reduce premiums, purchase additional coverage, or left to accumulate interest. This can significantly enhance the policy\'s value over time.'
      },
      {
        question: 'How does whole life insurance complement disability coverage?',
        answer: 'Whole life insurance provides a stable financial foundation that can help during disability. The cash value can be accessed tax-free to supplement disability benefits, and the death benefit ensures your family is protected regardless of your health status.'
      }
    ]
  },
  HEALTH_SHORT_TERM_DISABILITY: {
    title: 'Short-Term Disability Insurance',
    subtitle: 'Protect your income during recovery',
    metaDescription: 'Get short-term disability insurance to replace lost income and cover expenses during your recovery. Apply now for peace of mind.',
    benefits: [
      {
        title: 'Income Protection',
        description: 'Replace up to 60% of your income',
      },
      {
        title: 'Quick Benefits',
        description: 'Benefits start after short waiting period',
      },
      {
        title: 'Flexible Coverage',
        description: 'Choose 3, 6, or 12-month terms',
      },
      {
        title: 'Guaranteed Renewable',
        description: 'Cannot be cancelled if you pay premiums',
      },
      {
        title: 'Portable Coverage',
        description: 'Keep your coverage when changing jobs',
      }
    ],
    faqs: [
      {
        question: 'Why do I need my own STDI if I have coverage through work?',
        answer: 'Employer-provided STDI may not be enough to cover your expenses, and you lose it if you change jobs. Having your own policy ensures continuous coverage, higher benefit amounts, and protection regardless of employment status.'
      },
      {
        question: 'How does STDI work with auto insurance PIP?',
        answer: 'While PIP provides immediate coverage after an accident, STDI provides longer-term income protection. Having both ensures you\'re covered from the moment of injury through recovery, with STDI kicking in as PIP benefits end.'
      },
      {
        question: 'What conditions does STDI cover?',
        answer: 'STDI covers both illness and injury that prevent you from working. This includes accidents, surgeries, pregnancy, and serious illnesses. Benefits typically last 3-6 months, depending on your policy.'
      },
      {
        question: 'How much coverage do I need?',
        answer: 'We recommend coverage that replaces 60% of your income. This helps maintain your standard of living while allowing for other income sources and savings.'
      }
    ]
  },
  HEALTH_SUPPLEMENTAL: {
    title: 'Supplemental Health Insurance',
    subtitle: 'Extra protection for unexpected medical expenses',
    metaDescription: 'Enhance your health coverage with supplemental insurance for unexpected medical expenses. Get a free quote today!',
    benefits: [
      {
        title: 'Fixed Benefits',
        description: 'Cash payments directly to you',
      },
      {
        title: 'No Network Restrictions',
        description: 'Use any healthcare provider',
      },
      {
        title: 'Guaranteed Renewable',
        description: 'Keep your coverage as long as you pay',
      },
      {
        title: 'Critical Illness',
        description: 'Lump sum payments for serious conditions',
      },
      {
        title: 'Accident Coverage',
        description: 'Emergency and follow-up care benefits',
      }
    ],
    faqs: [
      {
        question: 'Why do I need supplemental health insurance?',
        answer: 'Supplemental health insurance provides cash benefits to help with out-of-pocket costs, lost income, and other expenses during illness or injury. It works alongside your primary health insurance to provide comprehensive protection.'
      },
      {
        question: 'How does supplemental health work with disability coverage?',
        answer: 'Supplemental health insurance provides immediate cash benefits for medical expenses, while disability insurance replaces lost income. Together, they provide complete financial protection during illness or injury.'
      },
      {
        question: 'What types of supplemental plans are available?',
        answer: 'We offer critical illness, accident, hospital indemnity, and specified disease coverage. These plans provide cash benefits for specific medical events, helping you focus on recovery rather than finances.'
      },
      {
        question: 'Can I have multiple supplemental plans?',
        answer: 'Yes, you can combine different types of supplemental coverage to create a comprehensive protection plan. We\'ll help you design a package that meets your specific needs and budget.'
      }
    ]
  },
  DISABILITY: {
    title: 'Disability Insurance',
    subtitle: 'Protect your income with comprehensive disability coverage',
    metaDescription: 'Safeguard your income with our disability insurance. Get comprehensive coverage and support for a secure financial future.',
    benefits: [
      {
        title: 'Income Protection',
        description: 'Replace your income if you become disabled',
      },
      {
        title: 'Flexible Coverage',
        description: 'Choose the coverage that fits your needs',
      },
      {
        title: 'Quick Benefits',
        description: 'Get benefits when you need them most',
      },
      {
        title: 'Easy Application',
        description: 'Simple application process',
      },
      {
        title: 'Expert Support',
        description: 'Guidance from licensed agents',
      }
    ],
    faqs: [
      {
        question: 'What does disability insurance cover?',
        answer: 'Disability insurance provides income replacement if you become unable to work due to illness or injury. It helps protect your financial stability during recovery.'
      },
      {
        question: 'How much disability coverage do I need?',
        answer: 'Generally, you should aim to cover 60-70% of your gross monthly income. We\'ll help you calculate the right amount based on your situation.'
      },
      {
        question: 'How long do benefits last?',
        answer: 'Benefit periods can range from a few months to several years, or even until retirement age, depending on the policy you choose.'
      },
      {
        question: 'Is disability insurance worth it?',
        answer: 'If you rely on your income to support yourself or your family, disability insurance is crucial protection against unexpected illness or injury.'
      }
    ]
  }
};

export function getProductContent(type: InsuranceType): InsuranceProduct {
  return insuranceProducts[type];
}