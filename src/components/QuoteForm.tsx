'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface QuoteFormProps {
  insuranceType: 'auto' | 'home' | 'life' | 'disability';
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

const formFields: Record<string, FormField[]> = {
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
        body: JSON.stringify(formData),
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
      className={`bg-brand-card p-10 rounded-2xl shadow-brand ${className}`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'select' ? 'col-span-2' : undefined}>
              <label className="block text-sm font-medium text-brand-body mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {field.tooltip && (
                  <div className="inline-block ml-1 group relative">
                    <QuestionMarkCircleIcon className="w-4 h-4 text-brand-body inline" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg -right-1 transform translate-x-full">
                      {field.tooltip}
                    </div>
                  </div>
                )}
              </label>
              {field.type === 'select' ? (
                <select
                  required={field.required}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
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
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
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
            className="w-full bg-brand-primary text-white font-semibold px-6 py-4 rounded-xl shadow-brand hover:bg-brand-secondary transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
          </button>
        </div>
        
        <p className="text-xs text-brand-body opacity-60 text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </div>
    </form>
  );
} 