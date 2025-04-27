'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

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
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
    { name: 'vehicleYear', label: 'Vehicle Year', type: 'number', required: true },
    { name: 'vehicleMake', label: 'Vehicle Make', type: 'text', required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'text', required: true }
  ],
  'HOME': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'propertyType', label: 'Property Type', type: 'select', required: true, options: [
      { value: 'single', label: 'Single Family Home' },
      { value: 'multi', label: 'Multi-Family Home' },
      { value: 'condo', label: 'Condo/Townhouse' }
    ]},
    { name: 'yearBuilt', label: 'Year Built', type: 'number', required: true }
  ],
  'TERM_LIFE': [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      required: true,
    },
    {
      name: 'zipCode',
      label: 'ZIP Code',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
    },
    {
      name: 'coverageAmount',
      label: 'Coverage Amount',
      type: 'select',
      required: true,
      options: [
        { value: '100000', label: '$100,000' },
        { value: '250000', label: '$250,000' },
        { value: '500000', label: '$500,000' },
        { value: '1000000', label: '$1,000,000' },
      ],
    },
    {
      name: 'termLength',
      label: 'Term Length',
      type: 'select',
      required: true,
      options: [
        { value: '10', label: '10 Years' },
        { value: '15', label: '15 Years' },
        { value: '20', label: '20 Years' },
        { value: '30', label: '30 Years' },
      ],
    },
    {
      name: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      required: false,
    },
  ],
  'PERMANENT_LIFE': [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
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
    { name: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
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
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const data: Record<string, string> = {};
    
    // Collect form data using form elements
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name && element.value) {
        data[element.name] = element.value;
      }
    }

    try {
      console.log('Submitting form data:', data);
      
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Form submission response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Log successful submission to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission_success',
          form_data: {
            ...data,
            leadId: result.leadId,
            mockMode: result.mockMode
          }
        });
      }

      setSuccess(true);
      
      // Redirect to success page after a delay
      setTimeout(() => {
        window.location.href = '/success';
      }, 2000);

    } catch (err) {
      console.error('Form submission error:', err);
      
      // Log error to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission_error',
          error: err instanceof Error ? err.message : 'Unknown error',
          form_data: data
        });
      }

      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{getFormTitle()}</h2>
          <p className="mt-2 text-sm text-gray-600">{getFormDescription()}</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your information has been submitted successfully. Redirecting...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="relative">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="mt-1 relative">
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
                    rows={3}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
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
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
                  />
                )}
                {field.tooltip && (
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md bg-[#00EEFD] px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#00EEFD]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00EEFD] ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                Submitting...
              </div>
            ) : (
              getCTAText()
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
} 