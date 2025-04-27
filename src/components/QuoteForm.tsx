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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    setShowSuccessMessage(false);

    try {
      // Validate required fields before submission
      const missingFields = fields
        .filter(field => field.required)
        .filter(field => !formData[field.name] || formData[field.name].trim() === '')
        .map(field => field.label);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate ZIP Code format
      if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
        throw new Error('ZIP Code must be exactly 5 digits');
      }

      // Log submission attempt with full form data
      console.log('Submitting form:', {
        productType,
        subType,
        formData,
        timestamp: new Date().toISOString()
      });

      // Use the correct API endpoint based on the environment
      const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/submit-lead`
        : '/api/submit-lead';

      const response = await fetch(apiUrl, {
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

      if (!response.ok) {
        let errorMessage = 'Failed to submit form. ';
        
        if (data.details && Array.isArray(data.details)) {
          // Handle validation errors from the API
          const fieldErrors = data.details.map((err: any) => `${err.field}: ${err.message}`).join(', ');
          errorMessage += `Please check the following fields: ${fieldErrors}`;
        } else {
          // Handle other types of errors
          switch (response.status) {
            case 400:
              errorMessage += data.error || 'Please check your information and try again.';
              break;
            case 429:
              errorMessage += 'Too many requests. Please wait a moment and try again.';
              break;
            case 503:
              errorMessage += 'Service temporarily unavailable. Please try again in a few minutes.';
              break;
            default:
              errorMessage += `Error (${response.status}): ${data.error || 'Please try again or contact support.'}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      // Push GTM event with enhanced data
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'leadSubmit',
          productType,
          subType,
          mockMode: data.mockMode || false,
          leadId: data.leadId || null,
          formFields: Object.keys(formData).length,
          submissionTime: new Date().toISOString(),
          successStatus: true
        });
      }

      // Log success with detailed information
      console.log('Form submitted successfully:', {
        productType,
        subType,
        mockMode: data.mockMode,
        leadId: data.leadId,
        timestamp: new Date().toISOString()
      });

      // Show success message before redirecting
      setShowSuccessMessage(true);
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push('/success');
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again or contact support if the issue persists.';
      
      setError(errorMessage);

      // Track form error in GTM with enhanced error tracking
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'leadSubmitError',
          productType,
          subType,
          errorType: error instanceof Error ? error.name : 'Unknown',
          errorMessage: errorMessage,
          formFields: Object.keys(formData).length,
          timestamp: new Date().toISOString()
        });
      }
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
        {showSuccessMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 animate-slide-up">
            <div className="flex items-center justify-center animate-pulse-success">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-medium">Quote Request Submitted!</span>
            </div>
            <p className="text-center mt-2 text-green-600">
              We'll be in touch with you shortly.
            </p>
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
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00EEFD] hover:bg-[#00d4e1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD] transition-all duration-200 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                {getCTAText()}
              </>
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