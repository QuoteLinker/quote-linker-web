'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

interface QuoteFormProps {
  insuranceType: InsuranceType;
  className?: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  tooltip?: string;
  options?: { value: string; label: string }[];
}

const formFields: Record<InsuranceType, FormField[]> = {
  life: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    {
      name: 'tobaccoUse',
      label: 'Tobacco Use',
      type: 'select',
      required: true,
      tooltip: 'This information helps us determine the most accurate rates for your life insurance policy.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
  term: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    {
      name: 'tobaccoUse',
      label: 'Tobacco Use',
      type: 'select',
      required: true,
      tooltip: 'This information helps us determine the most accurate rates for your term life insurance policy.',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      name: 'termLength',
      label: 'Term Length',
      type: 'select',
      required: true,
      tooltip: 'Choose the length of coverage you need.',
      options: [
        { value: '10', label: '10 Years' },
        { value: '20', label: '20 Years' },
        { value: '30', label: '30 Years' },
      ],
    },
    {
      name: 'coverageAmount',
      label: 'Coverage Amount',
      type: 'select',
      required: true,
      tooltip: 'Select your desired coverage amount.',
      options: [
        { value: '100000', label: '$100,000' },
        { value: '250000', label: '$250,000' },
        { value: '500000', label: '$500,000' },
        { value: '1000000', label: '$1,000,000' },
        { value: '2000000', label: '$2,000,000' },
      ],
    },
  ],
  auto: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'vehicleYear', label: 'Vehicle Year', type: 'number', required: true },
    { name: 'vehicleMake', label: 'Vehicle Make', type: 'text', required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'text', required: true },
  ],
  home: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'address', label: 'Property Address', type: 'text', required: true },
    { name: 'propertyType', label: 'Property Type', type: 'select', required: true, options: [
      { value: 'single', label: 'Single Family Home' },
      { value: 'multi', label: 'Multi-Family Home' },
      { value: 'condo', label: 'Condo/Townhouse' },
    ]},
    { name: 'yearBuilt', label: 'Year Built', type: 'number', required: true },
  ],
  disability: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'occupation', label: 'Occupation', type: 'text', required: true },
    { name: 'income', label: 'Annual Income', type: 'number', required: true },
    {
      name: 'coverageType',
      label: 'Coverage Type',
      type: 'select',
      required: true,
      tooltip: 'Short-term disability provides coverage for a limited time, while long-term disability provides extended coverage.',
      options: [
        { value: 'short', label: 'Short-term Disability' },
        { value: 'long', label: 'Long-term Disability' },
        { value: 'both', label: 'Both' },
      ],
    },
  ],
  health: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    {
      name: 'coverageType',
      label: 'Coverage Type',
      type: 'select',
      required: true,
      tooltip: 'Choose the type of health insurance coverage you\'re looking for.',
      options: [
        { value: 'individual', label: 'Individual' },
        { value: 'family', label: 'Family' },
        { value: 'medicare', label: 'Medicare' },
      ],
    },
    {
      name: 'preExistingConditions',
      label: 'Pre-existing Conditions',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
  ],
};

export default function QuoteForm({ insuranceType, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Scroll to form when component mounts if it's in the URL hash
    if (window.location.hash === '#quote-form') {
      const element = document.getElementById('quote-form');
      if (element) {
        const yOffset = -80; // Account for fixed header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          insuranceType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Track form submission in Google Tag Manager
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Quote',
          event_label: insuranceType,
          value: 1
        });
      }

      setSubmitStatus('success');
      e.currentTarget.reset();
      
      // Redirect to thank you page after successful submission
      router.push(`/${insuranceType}/thank-you`);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fields = formFields[insuranceType] || [];

  return (
    <div className={`bg-white rounded-xl shadow-xl p-6 sm:p-8 ${className}`} id="quote-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from real users */}
        <div className="hidden">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {fields.map((field) => (
            <div 
              key={field.name} 
              className={field.type === 'select' ? 'col-span-1 sm:col-span-2' : undefined}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {field.tooltip && (
                  <div className="inline-block ml-1 group relative">
                    <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400 inline" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg -right-1 transform translate-x-full">
                      {field.tooltip}
                    </div>
                  </div>
                )}
              </label>
              {field.type === 'select' ? (
                <select
                  required={field.required}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00e8ff] focus:ring-[#00e8ff] text-base"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  data-gtm-field={field.name}
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
                  required={field.required}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00e8ff] focus:ring-[#00e8ff] text-base"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  data-gtm-field={field.name}
                />
              )}
            </div>
          ))}
        </div>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">
            <p className="font-medium">Thank you for your submission!</p>
            <p className="text-sm mt-1">We'll be in touch with you shortly.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 text-red-800 rounded-lg">
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00e8ff] text-black font-semibold px-6 py-3 sm:py-4 rounded-xl shadow-brand hover:bg-[#00cce6] transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed text-base sm:text-lg"
            data-gtm-event="quote_submission"
            aria-busy={isSubmitting}
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
              'Get My Free Quote'
            )}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-[#00e8ff] hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </form>
    </div>
  );
} 