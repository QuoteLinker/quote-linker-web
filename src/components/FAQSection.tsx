
'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800"
              >
                {faq.question}
                {openIndex === index ? (
                  <MinusIcon className="h-6 w-6 text-primary-600" />
                ) : (
                  <PlusIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
