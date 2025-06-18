'use client';

import React, { ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQProps {
  children: ReactNode;
}

/**
 * FAQ Container component for content MDX files
 */
export function FAQ({ children }: FAQProps) {
  return (
    <div className="my-8 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  children: ReactNode;
}

/**
 * Individual FAQ item with expandable answer
 */
export function FAQItem({ question, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <ChevronDownIcon 
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 prose max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
