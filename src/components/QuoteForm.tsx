'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';
import Image from 'next/image';

type LifeType = 'Term Life' | 'Permanent Life';
type HealthType = 'Short-Term Disability' | 'Supplemental Health';

interface FormData {
  zipCode: string;
  insuranceType: InsuranceType | '';
  lifeType: LifeType | '';
  healthType: HealthType | '';
  homeownership: boolean;
  age: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface QuoteFormProps {
  insuranceType?: InsuranceType;
  className?: string;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  tooltip?: string;
  options?: { value: string; label: string; }[];
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

export default function QuoteForm({ insuranceType, className }: QuoteFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    insuranceType: insuranceType || '',
    lifeType: '',
    healthType: '',
    homeownership: false,
    age: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to /api/ping
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement actual API calls
    // 1. Save to internal DB
    // 2. POST to Salesforce
    // 3. Trigger GTM event
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to success page
    window.location.href = '/success';
  };

  const fields = formFields[formData.insuranceType as InsuranceType] || [];

  return (
    <form onSubmit={handleStep1Submit} className={`bg-white p-8 rounded-2xl ${className}`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Get Your {insuranceType ? `${insuranceType.charAt(0).toUpperCase()}${insuranceType.slice(1)}` : ''} Insurance Quote
          </h3>
          <p className="text-gray-500 text-sm">Fill out this quick form to get started</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00ECFF] focus:ring-[#00ECFF] transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00ECFF] focus:ring-[#00ECFF] transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00ECFF] focus:ring-[#00ECFF] transition-colors"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Additional Details (Optional)
            </label>
            <div className="mt-1">
              <textarea
                name="message"
                id="message"
                rows={3}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00ECFF] focus:ring-[#00ECFF] transition-colors"
                placeholder="Tell us more about your insurance needs..."
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#00ECFF] hover:bg-[#00ECFF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ECFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Get My Quote'
            )}
          </button>
        </div>

        {/* Rest of the component code remains unchanged */}
      </div>
    </form>
  );
} 