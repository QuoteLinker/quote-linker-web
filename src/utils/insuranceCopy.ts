export type InsuranceType = 'auto' | 'home' | 'life' | 'disability' | 'health' | 'term';

export const insuranceProducts = {
  auto: {
    title: 'Auto Insurance',
    subtitle: 'Find the perfect auto insurance coverage for your needs',
    benefits: [
      'Compare quotes and coverage options provided by licensed agents',
      'Save time and money on your auto insurance',
      'Get personalized coverage recommendations',
      'Easy online quote process',
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
        answer: 'Most policies can be bound within a few hours of working with a licensed agent. Some providers even offer instant coverage options.'
      }
    ]
  },
  home: {
    title: 'Home Insurance',
    subtitle: 'Protect your home with the right insurance coverage',
    benefits: [
      'Comprehensive home protection',
      'Competitive rates from licensed agents',
      'Customizable coverage options',
      'Quick and easy quote process',
      'Expert guidance from licensed agents'
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
      'Competitive rates that are tailored to your needs',
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
        answer: 'Some policies offer instant coverage, while others may require a simple questionaire and sometimes a basic medical exam. We\'ll help you find the right option for your needs.'
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
      'Cash benefits to help you cover living expenses',
      'Simple application process',
      'Benefits paid directly to you',
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
        answer: 'Short-term disability covers shorter periods (typically 1-3 years), while long-term disability can cover extended periods or until retirement.'
      },
      {
        question: 'How quickly can I get coverage?',
        answer: 'Some policies, such as short-term disability, offer quick approval, while long-term disability may require a medical review. We\'ll help you find the right option for your needs.'
      }
    ]
  },
  health: {
    title: 'Health Insurance',
    subtitle: 'Find the right health insurance coverage for you and your family',
    benefits: [
      'Supplemental health coverage',
      'Prepare for unexpected medical expenses',
      'Benefits paid directly to you',
      'Coverage for unexpected stays in the hospital',
    ],
    faqs: [
      {
        question: 'What types of supplemental health insurance are available?',
        answer: 'The supplemental health insurance includes coverage for unexpected medical expenses, hospital stays, and other gaps that arise from medical costs.'
      },
      {
        question: 'When can I sign up for supplental health insurance?',
        answer: 'You can apply anytime, given you are between the ages of 16 and 64.'
      },
      {
        question: 'What\'s the difference between supplemental health insurance and group health insurance?',
        answer: 'Supplemental health insurance plans are purchased directly and owned by you, while group plans are typically offered through employers or organizations.'
      },
      {
        question: 'What factors affect supplemental health insurance rates?',
        answer: 'Factors include your age, location, overall health, and the type of plan you select.'
      }
    ]
  },
  term: {
    title: 'Term Life Insurance',
    subtitle: 'Affordable term life insurance for your family\'s protection',
    benefits: [
      'Fixed rates that are affordable',
      'Simple coverage options',
      'Convertible policies',
      'Family protection',
      'Flexible term lengths',
      'Competitive rates'
    ],
    faqs: [
      {
        question: 'What is term life insurance?',
        answer: 'Term life insurance provides coverage for a specific period (term) in exchange for regular premium payments. If you pass away during the term, your beneficiaries receive a death benefit.'
      },
      {
        question: 'How long should my term be?',
        answer: 'The length of your term should align with your financial obligations and goals. Common terms are 10, 20, or 30 years, depending on your needs.'
      },
      {
        question: 'Can I convert my term policy later?',
        answer: 'Many term policies offer conversion options to permanent life insurance without requiring a new medical exam, though this varies by provider. This is a great way to lock in a low rate and protect your family.'
      },
      {
        question: 'How quickly can I get coverage?',
        answer: 'Some policies offer instant approval and coverage within 24 hours. Traditional policies typically take 4-6 weeks for full underwriting. We can help you find the fastest option for your needs.'
      }
    ]
  }
}; 