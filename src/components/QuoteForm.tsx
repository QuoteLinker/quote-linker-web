'use client';

import React, { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          insuranceType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track form submission in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Quote',
          event_label: insuranceType,
          value: 1
        });
      }

      setSubmitStatus('success');
      setFormData({});
      
      // Redirect to thank you page after successful submission
      router.push(`/${insuranceType}/thank-you`);
    } catch (err) {
      setSubmitStatus('error');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fields = formFields[insuranceType] || [];

  return (
    <form 
      onSubmit={handleSubmit}
      className={`bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-brand ${className}`}
      data-gtm-form="quote_form"
    >
      <div className="space-y-4 sm:space-y-6">
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
            <p className="font-medium">There was an error submitting your form.</p>
            <p className="text-sm mt-1">Please try again or contact us directly.</p>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00e8ff] text-black font-semibold px-6 py-3 sm:py-4 rounded-xl shadow-brand hover:bg-[#00cce6] transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed text-base sm:text-lg"
            data-gtm-event="quote_submission"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-[#00e8ff] hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </div>
    </form>
  );
} 