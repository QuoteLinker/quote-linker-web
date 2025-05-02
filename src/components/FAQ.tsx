'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface FAQProps {
  insuranceType: InsuranceType;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqContent: Record<InsuranceType, FAQItem[]> = {
  AUTO: [
    {
      question: 'How does auto insurance work?',
      answer: 'Auto insurance provides financial protection in case of accidents, theft, or damage to your vehicle. It typically includes liability coverage (for damage you cause to others) and comprehensive/collision coverage (for damage to your own vehicle).',
    },
    {
      question: 'What factors affect my auto insurance rates?',
      answer: 'Several factors influence your rates, including your driving history, age, location, vehicle type, credit score, and coverage options selected. Safe drivers with good credit typically receive better rates.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  HOME: [
    {
      question: 'How does home insurance work?',
      answer: 'Home insurance protects your property and belongings against damage or loss. It typically covers the structure, personal property, liability, and additional living expenses if your home becomes uninhabitable.',
    },
    {
      question: 'What does home insurance cover?',
      answer: 'Home insurance typically covers damage from fire, wind, hail, theft, and certain natural disasters. It also provides liability protection if someone is injured on your property. Flood and earthquake coverage usually require separate policies.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  LIFE_TERM: [
    {
      question: 'How does term life insurance work?',
      answer: 'Term life insurance provides a death benefit to your beneficiaries when you pass away. You pay regular premiums, and in exchange, your loved ones receive financial protection to help cover expenses, debts, and future needs.',
    },
    {
      question: 'What type of term life insurance is right for me?',
      answer: 'Term life insurance is typically more affordable and straightforward, covering you for a specific period. The right choice depends on your needs, budget, and long-term goals.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  LIFE_PERMANENT: [
    {
      question: 'How does permanent life insurance work?',
      answer: 'Permanent life insurance provides lifelong coverage and includes a cash value component. You pay regular premiums, and in exchange, your loved ones receive financial protection to help cover expenses, debts, and future needs.',
    },
    {
      question: 'What type of permanent life insurance is right for me?',
      answer: 'Permanent life insurance provides lifelong coverage and includes a cash value component. The right choice depends on your needs, budget, and long-term goals.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  HEALTH_SHORT_TERM_DISABILITY: [
    {
      question: 'How does short-term disability insurance work?',
      answer: 'Short-term disability insurance provides income replacement if you become unable to work due to illness or injury. It typically covers a portion of your salary for a limited period.',
    },
    {
      question: 'What does short-term disability insurance cover?',
      answer: 'Short-term disability insurance typically covers a portion of your salary if you become unable to work due to illness or injury. The coverage period is usually limited to a few months.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  HEALTH_SUPPLEMENTAL: [
    {
      question: 'How does supplemental health insurance work?',
      answer: 'Supplemental health insurance helps cover medical expenses not covered by your primary health insurance, including deductibles, copayments, and coinsurance.',
    },
    {
      question: 'What type of supplemental health coverage do I need?',
      answer: 'The right coverage depends on your health needs, budget, and circumstances. Options include individual plans, family plans, and supplemental plans. A licensed agent can help you find the best fit.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  LIFE: [
    {
      question: 'How does life insurance work?',
      answer: 'Life insurance provides a death benefit to your beneficiaries when you pass away. You pay regular premiums, and in exchange, your loved ones receive financial protection to help cover expenses, debts, and future needs.',
    },
    {
      question: 'What type of life insurance is right for me?',
      answer: 'The right choice depends on your needs, budget, and long-term goals. Term life is typically more affordable and straightforward, while permanent life provides lifelong coverage with a cash value component.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  HEALTH: [
    {
      question: 'How does health insurance work?',
      answer: 'Health insurance helps cover medical expenses, including doctor visits, hospital stays, and prescription medications. It provides financial protection against high healthcare costs.',
    },
    {
      question: 'What type of health coverage do I need?',
      answer: 'The right coverage depends on your health needs, budget, and circumstances. Options include individual plans, family plans, and supplemental plans. A licensed agent can help you find the best fit.',
    },
    {
      question: 'How fast will I hear back?',
      answer: 'Most customers receive a response from a licensed agent within 24 hours. During business hours, you may hear back within just a few hours.',
    },
  ],
  DISABILITY: [
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
  ],
};

export default function FAQ({ insuranceType }: FAQProps) {
  if (!insuranceType || !faqContent[insuranceType]) {
    console.error('FAQ: Invalid or missing insuranceType:', insuranceType);
    return (
      <section className="py-16 bg-gray-50 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-2">FAQ Error</h2>
        <p>Sorry, we couldn't load FAQs for this insurance type.</p>
      </section>
    );
  }
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = faqContent[insuranceType];

  const displayTitle = insuranceType.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B0B45] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about {displayTitle} Insurance
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-sm"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-[#0B0B45]">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 