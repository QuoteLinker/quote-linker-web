'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { InsuranceType, MainInsuranceType } from '@/utils/insuranceCopy';
import { useRouter } from 'next/navigation';
import LoadingButton from './LoadingButton';
import { validateEmail, validateName, validatePhone, validateZip, validateAge, validateCoverageAmount } from '@/utils/validation';
import debounce from 'lodash/debounce';
import FieldWithTooltip from './FieldWithTooltip';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceType: MainInsuranceType;
  age?: number;
  coverageAmount?: number;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  age?: string;
  coverageAmount?: string;
}

interface QuoteFormProps {
  insuranceType?: InsuranceType;
  productType?: InsuranceType;
  subType?: string;
}

export default function QuoteForm({ insuranceType, productType, subType }: QuoteFormProps) {
  const router = useRouter();
  
  // Default to the first main insurance type if none provided
  const defaultType: MainInsuranceType = 'AUTO';
  const initialType = insuranceType || productType || defaultType;
  
  // Convert to main insurance type if it's a subtype
  const getMainType = (type: InsuranceType): MainInsuranceType => {
    if (type === 'AUTO' || type === 'HOME' || type === 'LIFE' || type === 'HEALTH') {
      return type;
    }
    if (type.startsWith('LIFE_')) return 'LIFE';
    if (type.startsWith('HEALTH_')) return 'HEALTH';
    return defaultType;
  };

  // Load saved form data from localStorage
  const loadSavedFormData = (): FormData | null => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('quoteFormData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if the saved data is for the same insurance type
        if (parsed.insuranceType === getMainType(initialType)) {
          return parsed as FormData;
        }
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
    return null;
  };

  const [formData, setFormData] = useState<FormData>(() => {
    const saved = loadSavedFormData();
    if (saved) {
      return saved;
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      insuranceType: getMainType(initialType),
    };
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data: FormData) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('quoteFormData', JSON.stringify(data));
      }
    }, 1000),
    []
  );

  // Save form data whenever it changes
  useEffect(() => {
    debouncedSave(formData);
    return () => {
      debouncedSave.cancel();
    };
  }, [formData, debouncedSave]);

  // Scroll to form when component mounts
  useEffect(() => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []); // Only run once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    const firstNameError = validateName(formData.firstName);
    if (firstNameError) errors.firstName = firstNameError;
    
    const lastNameError = validateName(formData.lastName);
    if (lastNameError) errors.lastName = lastNameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    const zipError = validateZip(formData.zipCode);
    if (zipError) errors.zipCode = zipError;

    const ageError = validateAge(formData.age);
    if (ageError) errors.age = ageError;

    const coverageAmountError = validateCoverageAmount(formData.coverageAmount);
    if (coverageAmountError) errors.coverageAmount = coverageAmountError;
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
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
      
      // Clear saved form data on successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quoteFormData');
      }
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form onSubmit={handleSubmit} id="quote-form" className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Get Your Free Quote</h2>
        
        <div className="space-y-5">
          {/* Insurance Type Selection */}
          <div>
            <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Type <span className="text-red-500">*</span>
            </label>
            <select
              name="insuranceType"
              id="insuranceType"
              required
              value={formData.insuranceType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors"
            >
              <option value="AUTO">Auto Insurance</option>
              <option value="HOME">Home Insurance</option>
              <option value="LIFE">Life Insurance</option>
              <option value="HEALTH">Health Insurance</option>
            </select>
          </div>

          {/* Required Fields */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
                formErrors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
                formErrors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
                formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
                formErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>

          <FieldWithTooltip
            label="ZIP Code"
            name="zipCode"
            tooltip="5-digit USPS ZIP code helps us match you with local agents in your area."
            required
            value={formData.zipCode}
            onChange={handleChange}
            error={formErrors.zipCode}
          />

          <FieldWithTooltip
            label="Age"
            name="age"
            tooltip="Your age helps us determine the most appropriate coverage options and rates for you."
            required
            type="number"
            min="18"
            max="120"
            value={formData.age || ''}
            onChange={handleChange}
            error={formErrors.age}
          />

          <FieldWithTooltip
            label="Coverage Amount"
            name="coverageAmount"
            tooltip="The amount of coverage you need. This helps us calculate your premium and ensure adequate protection."
            required
            type="number"
            min="0"
            step="1000"
            value={formData.coverageAmount || ''}
            onChange={handleChange}
            error={formErrors.coverageAmount}
          />

          <div className="pt-2">
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#00EEFD] hover:bg-[#00D4E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD] transition-all duration-200 transform hover:scale-[1.02]"
            >
              Get Your Free Quote
            </LoadingButton>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Your information is secure.
          </p>

          {submitStatus === 'success' && (
            <div className="rounded-lg bg-green-50 p-4 mt-4 border border-green-100">
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
                    Thank you! We'll reach out to you shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="rounded-lg bg-red-50 p-4 mt-4 border border-red-100">
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
    </div>
  );
} 