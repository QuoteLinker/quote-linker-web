'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';
import Image from 'next/image';

type ProductType = 'auto' | 'home' | 'life' | 'health';
type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

interface QuoteFormProps {
  productType: ProductType;
  subType?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  age: string;
  coverageAmount: string;
  notes: string;
  [key: string]: any; // Allow for dynamic fields
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  tooltip?: string;
  options?: { value: string; label: string; }[];
}

// Helper function to convert ProductType to InsuranceType
function getInsuranceType(productType: ProductType, subType?: string): InsuranceType {
  switch (productType) {
    case 'auto':
      return 'AUTO';
    case 'home':
      return 'HOME';
    case 'life':
      return subType === 'permanent' ? 'PERMANENT_LIFE' : 'TERM_LIFE';
    case 'health':
      return subType === 'supplemental' ? 'SUPPLEMENTAL_HEALTH' : 'SHORT_TERM_DISABILITY';
    default:
      return 'AUTO';
  }
}

const formFields: Record<InsuranceType, FormField[]> = {
  'AUTO': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'vehicleYear', label: 'Vehicle Year', type: 'number', required: true },
    { name: 'vehicleMake', label: 'Vehicle Make', type: 'text', required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'text', required: true }
  ],
  'HOME': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'propertyType', label: 'Property Type', type: 'select', required: true, options: [
      { value: 'single', label: 'Single Family Home' },
      { value: 'multi', label: 'Multi-Family Home' },
      { value: 'condo', label: 'Condo/Townhouse' }
    ]},
    { name: 'yearBuilt', label: 'Year Built', type: 'number', required: true }
  ],
  'TERM_LIFE': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'termLength', label: 'Term Length', type: 'select', required: true, options: [
      { value: '10', label: '10 Years' },
      { value: '20', label: '20 Years' },
      { value: '30', label: '30 Years' }
    ]},
    { name: 'coverageAmount', label: 'Coverage Amount', type: 'select', required: true, options: [
      { value: '100000', label: '$100,000' },
      { value: '250000', label: '$250,000' },
      { value: '500000', label: '$500,000' },
      { value: '1000000', label: '$1,000,000' }
    ]}
  ],
  'PERMANENT_LIFE': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'coverageAmount', label: 'Coverage Amount', type: 'select', required: true, options: [
      { value: '100000', label: '$100,000' },
      { value: '250000', label: '$250,000' },
      { value: '500000', label: '$500,000' },
      { value: '1000000', label: '$1,000,000' }
    ]}
  ],
  'SHORT_TERM_DISABILITY': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
    { name: 'occupation', label: 'Occupation', type: 'text', required: true },
    { name: 'income', label: 'Annual Income', type: 'number', required: true },
    { name: 'coverageType', label: 'Coverage Type', type: 'select', required: true, options: [
      { value: 'short', label: 'Short-term Disability' }
    ]}
  ],
  'SUPPLEMENTAL_HEALTH': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'coverageType', label: 'Coverage Type', type: 'select', required: true, options: [
      { value: 'individual', label: 'Individual' },
      { value: 'family', label: 'Family' }
    ]},
    { name: 'preExistingConditions', label: 'Pre-existing Conditions', type: 'select', required: true, options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]}
  ]
};

export default function QuoteForm({ productType, subType = productType }: QuoteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    age: '',
    coverageAmount: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get form title based on product and subType
  function getFormTitle(): string {
    switch (productType) {
      case 'life':
        return `${subType === 'term' ? 'Term' : 'Permanent'} Life Insurance Quote`;
      case 'health':
        return `${subType === 'std' ? 'Short-Term Disability' : 'Supplemental Health'} Insurance Quote`;
      case 'auto':
        return 'Auto Insurance Quote';
      case 'home':
        return 'Home Insurance Quote';
      default:
        return 'Insurance Quote';
    }
  }

  // Get form description based on product and subType
  function getFormDescription(): string {
    switch (productType) {
      case 'life':
        return subType === 'term' 
          ? 'Protect your loved ones with affordable term life coverage.'
          : 'Secure lifelong protection and build cash value with permanent life insurance.';
      case 'health':
        return subType === 'std'
          ? "Protect your income when you're unable to work due to illness or injury."
          : 'Add extra protection to your primary health insurance coverage.';
      case 'auto':
        return 'Protect your vehicle with comprehensive coverage tailored to your needs.';
      case 'home':
        return 'Protect your home and belongings with comprehensive coverage.';
      default:
        return 'Get the coverage you need at a price you can afford.';
    }
  }

  // Get CTA text based on product and subType
  function getCTAText(): string {
    if (isSubmitting) return 'Submitting...';
    return 'Get My Free Quote';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productType,
          subType,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Push GTM event
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'leadSubmit',
          productType,
          subType,
        });
      }

      // Redirect to success page
      router.push('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const insuranceType = getInsuranceType(productType, subType);
  const fields = formFields[insuranceType] || [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto pb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{getFormTitle()}</h2>
          <p className="text-sm sm:text-base text-gray-600">{getFormDescription()}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.name === 'zipCode' ? 'sm:col-span-2' : ''}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-[#00EEFD]">*</span>}
                  {field.tooltip && (
                    <QuestionMarkCircleIcon className="inline-block w-4 h-4 ml-1 text-gray-400" />
                  )}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] text-sm sm:text-base"
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] text-sm sm:text-base"
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    pattern={field.name === 'zipCode' ? '[0-9]{5}' : undefined}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00EEFD] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          {getCTAText()}
        </button>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
} 