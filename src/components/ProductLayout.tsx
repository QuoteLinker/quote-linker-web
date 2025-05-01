'use client';

import { ReactNode } from 'react';
import QuoteForm from './QuoteForm';
import { InsuranceType } from '@/utils/insuranceCopy';

type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

interface ProductLayoutProps {
  params: {
    type: InsuranceType;
  };
  subType?: SubType;
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  heroIconItems: Array<{
    icon: ReactNode;
    text: string;
  }>;
  benefitsTitle: string;
  benefits: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  showToggle?: boolean;
  toggleOptions?: Array<{
    value: string;
    label: string;
  }>;
  onToggleChange?: (value: string) => void;
}

export default function ProductLayout({
  params,
  subType,
  heroTitle,
  heroSubtitle,
  heroCTA,
  heroIconItems,
  benefitsTitle,
  benefits,
  showToggle,
  toggleOptions,
  onToggleChange,
}: ProductLayoutProps) {
  const { type } = params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{heroTitle}</h1>
            <p className="text-xl text-gray-600 mb-8">{heroSubtitle}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {heroIconItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {item.icon}
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const formElement = document.getElementById('quote-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {heroCTA}
            </button>
          </div>
          <div>
            <QuoteForm productType={type} />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 