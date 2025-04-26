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
  subType?: SubType;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
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
function getInsuranceType(productType: ProductType, subType?: SubType): InsuranceType {
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
    { name: 'occupation', label: 'Occupation', type: 'text', required: true },
    { name: 'income', label: 'Annual Income', type: 'number', required: true },
    { name: 'coverageType', label: 'Coverage Type', type: 'select', required: true, options: [
      { value: 'short', label: 'Short-term Disability' },
      { value: 'long', label: 'Long-term Disability' },
      { value: 'both', label: 'Both' }
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
      { value: 'family', label: 'Family' },
      { value: 'medicare', label: 'Medicare' }
    ]},
    { name: 'preExistingConditions', label: 'Pre-existing Conditions', type: 'select', required: true, options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]}
  ]
};

export default function QuoteForm({ productType, subType }: QuoteFormProps) {
  const router = useRouter();
  const [selectedSubType, setSelectedSubType] = useState<SubType>(
    subType || getDefaultSubType(productType)
  );
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the default subType based on productType
  function getDefaultSubType(type: ProductType): SubType {
    switch (type) {
      case 'life':
        return 'term';
      case 'health':
        return 'std';
      case 'auto':
        return 'auto';
      case 'home':
        return 'home';
      default:
        return 'auto';
    }
  }

  // Get form title based on product and subType
  function getFormTitle(): string {
    switch (productType) {
      case 'life':
        return `Get Your ${selectedSubType === 'term' ? 'Term' : 'Permanent'} Life Insurance Quote`;
      case 'health':
        return `Get Your ${selectedSubType === 'std' ? 'Short-Term Disability' : 'Supplemental Health'} Insurance Quote`;
      case 'auto':
        return 'Get Your Auto Insurance Quote';
      case 'home':
        return 'Get Your Home Insurance Quote';
      default:
        return 'Get Your Insurance Quote';
    }
  }

  // Get form description based on product and subType
  function getFormDescription(): string {
    switch (productType) {
      case 'life':
        return selectedSubType === 'term' 
          ? 'Protect your loved ones with affordable term life coverage.'
          : 'Secure lifelong protection and build cash value with permanent life insurance.';
      case 'health':
        return selectedSubType === 'std'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Submit form data to API
      const response = await fetch('/api/submitLead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productType,
          subType: selectedSubType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Push GTM event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'leadSubmit',
          productType,
          subType: selectedSubType,
        });
      }

      // Redirect to success page
      router.push('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const insuranceType = getInsuranceType(productType, selectedSubType);
  const fields = formFields[insuranceType] || [];

  return (
    <div className="flex justify-center items-center mx-auto max-w-lg pb-8">
      <form onSubmit={handleSubmit} className="w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getFormTitle()}</h2>
          <p className="text-gray-600">{getFormDescription()}</p>
        </div>

        {/* Hidden inputs for productType and subType */}
        <input type="hidden" name="productType" value={productType} />
        <input type="hidden" name="subType" value={selectedSubType} />

        {/* SubType Toggle for Life and Health */}
        {(productType === 'life' || productType === 'health') && (
          <div className="flex justify-center space-x-4 mb-6">
            {productType === 'life' ? (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedSubType('term')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedSubType === 'term'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Term Life
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSubType('permanent')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedSubType === 'permanent'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Permanent Life
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedSubType('std')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedSubType === 'std'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Short-Term Disability
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSubType('supplemental')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedSubType === 'supplemental'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Supplemental Health
                </button>
              </>
            )}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              pattern="[0-9]{5}"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Get Your Quote'}
        </button>
      </form>
    </div>
  );
} 