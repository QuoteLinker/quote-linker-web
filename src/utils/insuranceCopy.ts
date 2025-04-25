export type InsuranceType = 'auto' | 'home' | 'life' | 'disability' | 'health' | 'term';

export const insuranceProducts = {
  auto: {
    title: 'Auto Insurance',
    subtitle: 'Find the perfect auto insurance coverage for your needs',
    benefits: [
      'Compare quotes from multiple providers',
      'Save time and money on your auto insurance',
      'Get personalized coverage recommendations',
      'Easy online quote process',
      'Expert guidance from licensed agents',
      'Flexible payment options'
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
        answer: 'Most policies can be activated within 24 hours of approval. Some providers even offer instant coverage options.'
      }
    ]
  },
  home: {
    title: 'Home Insurance',
    subtitle: 'Protect your home with the right insurance coverage',
    benefits: [
      'Comprehensive home protection',
      'Competitive rates from top providers',
      'Customizable coverage options',
      'Quick and easy quote process',
      'Expert guidance from licensed agents',
      '24/7 claims support'
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
  life: {
    title: 'Life Insurance',
    subtitle: 'Secure your family\'s future with the right life insurance',
    benefits: [
      'Financial protection for your loved ones',
      'Flexible policy options',
      'Competitive rates from top providers',
      'Simple application process',
      'Expert guidance from licensed agents',
      'Peace of mind for your family'
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
        answer: 'Some policies offer instant coverage, while others may require a medical exam. We\'ll help you find the right option for your needs.'
      },
      {
        question: 'What factors affect life insurance rates?',
        answer: 'Factors include your age, health, lifestyle, and the type and amount of coverage you select.'
      }
    ]
  },
  disability: {
    title: 'Disability Insurance',
    subtitle: 'Protect your income with disability insurance',
    benefits: [
      'Income protection if you can\'t work',
      'Flexible coverage options',
      'Competitive rates from top providers',
      'Simple application process',
      'Expert guidance from licensed agents',
      'Peace of mind for your future'
    ],
    faqs: [
      {
        question: 'What does disability insurance cover?',
        answer: 'Disability insurance provides income replacement if you become unable to work due to illness or injury.'
      },
      {
        question: 'How much disability insurance do I need?',
        answer: 'Typically, you should aim to replace 60-70% of your income. We\'ll help you determine the right amount for your situation.'
      },
      {
        question: 'What\'s the difference between short-term and long-term disability?',
        answer: 'Short-term disability covers shorter periods (typically 3-6 months), while long-term disability can cover extended periods or until retirement.'
      },
      {
        question: 'How quickly can I get coverage?',
        answer: 'Some policies offer quick approval, while others may require a medical review. We\'ll help you find the right option for your needs.'
      }
    ]
  },
  health: {
    title: 'Health Insurance',
    subtitle: 'Find the right health insurance coverage for you and your family',
    benefits: [
      'Comprehensive health coverage',
      'Access to quality healthcare providers',
      'Prescription drug coverage',
      'Preventive care services',
      'Expert guidance from licensed agents',
      'Flexible plan options'
    ],
    faqs: [
      {
        question: 'What types of health insurance plans are available?',
        answer: 'Common types include HMO, PPO, EPO, and POS plans. Each has different networks and coverage options.'
      },
      {
        question: 'When can I enroll in health insurance?',
        answer: 'You can enroll during the annual Open Enrollment period or if you qualify for a Special Enrollment Period due to life changes.'
      },
      {
        question: 'What\'s the difference between individual and group health insurance?',
        answer: 'Individual plans are purchased directly, while group plans are typically offered through employers or organizations.'
      },
      {
        question: 'What factors affect health insurance rates?',
        answer: 'Factors include your age, location, tobacco use, and the type of plan you select.'
      }
    ]
  }
}; 