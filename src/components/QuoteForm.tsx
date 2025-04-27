'use client';

import React, { useState } from 'react';
import { InsuranceType } from '@/utils/insuranceCopy';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceType: InsuranceType;
  subType?: string;
  age?: string;
  tobaccoUse?: string;
  vehicleDetails?: string;
  propertyAddress?: string;
}

interface QuoteFormProps {
  insuranceType: InsuranceType;
  productType?: InsuranceType;
  subType?: string;
}

export default function QuoteForm({ insuranceType, productType, subType }: QuoteFormProps) {
  const type = insuranceType || productType;

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    insuranceType: type,
    subType,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        insuranceType: type,
        subType,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showLifeFields = type === 'TERM_LIFE' || type === 'PERMANENT_LIFE';
  const showHealthFields = type === 'SHORT_TERM_DISABILITY' || type === 'SUPPLEMENTAL_HEALTH';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Required Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            required
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
          />
        </div>

        {/* Life Insurance Fields */}
        {showLifeFields && (
          <>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age *
              </label>
              <input
                type="number"
                name="age"
                id="age"
                required
                min="18"
                max="85"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="tobaccoUse" className="block text-sm font-medium text-gray-700">
                Tobacco Use *
              </label>
              <select
                name="tobaccoUse"
                id="tobaccoUse"
                required
                value={formData.tobaccoUse}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
              >
                <option value="">Select an option</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </>
        )}

        {/* Health Insurance Fields */}
        {showHealthFields && (
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age *
            </label>
            <input
              type="number"
              name="age"
              id="age"
              required
              min="18"
              max="85"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00EEFD] hover:bg-[#00D4E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Thank you! We'll be in touch shortly with your personalized quotes.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Sorry, there was an error submitting your form. Please try again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
} 