'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';
import Image from 'next/image';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

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
  productType: ProductType;
  subType: SubType;
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
    notes: '',
    productType,
    subType: subType as SubType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [sfStatus, setSfStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  
  // Check Salesforce connection status
  useEffect(() => {
    const checkSalesforceStatus = async () => {
      try {
        const response = await fetch('/api/ping');
        const data = await response.json();
        if (data.salesforceConnected) {
          setSfStatus('connected');
        } else {
          setSfStatus('disconnected');
        }
      } catch (error) {
        console.error('Error checking Salesforce status:', error);
        setSfStatus('disconnected');
      }
    };
    
    checkSalesforceStatus();
  }, []);

  const validateForm = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    
    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!data.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.zipCode?.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(data.zipCode)) {
      errors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }
    
    if (!data.productType?.trim()) {
      errors.productType = 'Product type is required';
    }
    
    if (!data.subType?.trim()) {
      errors.subType = 'Sub type is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setFormErrors({});

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

    // Validate form data
    if (!validateForm(data)) {
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data to Zapier:', data);
      
      const response = await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/22689304/2phdsmv/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'quotelinker.com'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead to Zapier');
      }

      console.log('Lead successfully submitted to Zapier');

      // Log successful submission to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'leadSubmit',
          form_data: {
            ...data,
            leadId: 'ZAPIER-' + Math.random().toString(36).substr(2, 9),
            mockMode: false
          }
        });
      }

      setSuccess(true);
      
      // Show success animation
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.classList.add('success-animation');
      }
      
      // Redirect to success page after animation
      setTimeout(() => {
        router.push('/success');
      }, 2000);

    } catch (err) {
      console.error('Form submission error:', err);
      
      // Log error to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'leadSubmitError',
          error: err instanceof Error ? err.message : 'Unknown error',
          form_data: data
        });
      }

      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const insuranceType = getInsuranceType(productType, subType);
  const fields = formFields[insuranceType] || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Get Your {productType.charAt(0).toUpperCase() + productType.slice(1)} Insurance Quote</h2>
      
      {/* Salesforce Status Indicator */}
      <div className="mb-4 flex items-center justify-end">
        <div className="flex items-center text-sm">
          {sfStatus === 'checking' && (
            <>
              <ArrowPathIcon className="h-4 w-4 mr-1 text-gray-500 animate-spin" />
              <span className="text-gray-500">Checking Salesforce connection...</span>
            </>
          )}
          {sfStatus === 'connected' && (
            <>
              <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500">Salesforce connected</span>
            </>
          )}
          {sfStatus === 'disconnected' && (
            <>
              <ExclamationCircleIcon className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-amber-500">Salesforce disconnected (using mock mode)</span>
            </>
          )}
        </div>
      </div>
      
      <form 
        id="quote-form"
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              disabled={isSubmitting}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.firstName ? 'border-red-500' : ''
              } ${isSubmitting ? 'bg-gray-100' : ''}`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              disabled={isSubmitting}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.lastName ? 'border-red-500' : ''
              } ${isSubmitting ? 'bg-gray-100' : ''}`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isSubmitting}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.email ? 'border-red-500' : ''
              } ${isSubmitting ? 'bg-gray-100' : ''}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              disabled={isSubmitting}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.phone ? 'border-red-500' : ''
              } ${isSubmitting ? 'bg-gray-100' : ''}`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              pattern="\d{5}"
              maxLength={5}
              disabled={isSubmitting}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                formErrors.zipCode ? 'border-red-500' : ''
              } ${isSubmitting ? 'bg-gray-100' : ''}`}
            />
            {formErrors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{formErrors.zipCode}</p>
            )}
          </div>

          <input type="hidden" name="productType" value={productType} />
          <input type="hidden" name="subType" value={subType} />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Your quote request has been submitted successfully! Redirecting you to confirmation...</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Get Your Quote'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 