'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FocusEvent } from 'react';
import { InsuranceType, MainInsuranceType } from '@/utils/insuranceCopy';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import FieldWithTooltip from '@/components/FieldWithTooltip';
import {
  validateEmail,
  validateName,
  validatePhone,
  validateZip,
  validateAge,
  validateCoverageAmount,
} from '@/utils/validation';
import { debounce } from 'lodash';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import InsuranceTip from './InsuranceTip';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceType: MainInsuranceType;
  age?: number;
  coverageAmount?: number;
  website?: string;
  honeypot?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  age?: string;
  coverageAmount?: string;
  insuranceType?: string;
}

interface QuoteFormProps {
  insuranceType?: InsuranceType;
  productType?: InsuranceType;
  _subType?: string;
}

const INSURANCE_OPTIONS = [
  { value: 'AUTO', label: 'Auto Insurance' },
  { value: 'HOME', label: 'Home Insurance' },
  { value: 'LIFE', label: 'Life Insurance' },
  { value: 'HEALTH', label: 'Health Insurance' },
];

const FORM_KEY = 'savedQuoteForm';

export default function QuoteForm({ insuranceType, productType, _subType }: QuoteFormProps) {
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
    const saved = localStorage.getItem(FORM_KEY);
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
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Debounced save function
  const debouncedSave = useCallback((data: FormData) => {
    const saveToLocalStorage = debounce((formData: FormData) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(FORM_KEY, JSON.stringify(formData));
      }
    }, 1000);
    saveToLocalStorage(data);
    return saveToLocalStorage;
  }, []); // No dependencies needed as the function is self-contained

  // Save form data whenever it changes
  useEffect(() => {
    const saveFunction = debouncedSave(formData);
    return () => {
      saveFunction.cancel();
    };
  }, [formData, debouncedSave]);

  // Scroll to form when component mounts
  useEffect(() => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []); // Only run once on mount

  const validateField = (
    name: keyof FormData,
    value: FormData[keyof FormData]
  ): string | undefined => {
    switch (name) {
      case 'firstName': {
        const error = validateName(value as string);
        return error || undefined;
      }
      case 'lastName': {
        const error = validateName(value as string);
        return error || undefined;
      }
      case 'email': {
        const error = validateEmail(value as string);
        return error || undefined;
      }
      case 'phone': {
        const error = validatePhone(value as string);
        return error || undefined;
      }
      case 'zipCode': {
        const error = validateZip(value as string);
        return error || undefined;
      }
      case 'age': {
        const error = validateAge(value as number);
        return error || undefined;
      }
      case 'coverageAmount': {
        const error = validateCoverageAmount(value as number);
        return error || undefined;
      }
      case 'insuranceType': {
        if (!value) {
          return 'Please select an insurance type';
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      // Handle checkbox inputs
      if (type === 'checkbox') {
        const checkbox = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }

      // Clear error when user starts typing
      if (formErrors[name as keyof FormErrors]) {
        setFormErrors(prev => ({ ...prev, [name]: undefined }));
      }

      // Validate on change
      const error = validateField(name as keyof FormData, value);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [formErrors]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouchedFields(prev => ({ ...prev, [name]: true }));

      // Validate on blur
      const error = validateField(name as keyof FormData, formData[name as keyof FormData]);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [formData]
  );

  const handleSelectBlur = useCallback(
    (name: string) => {
      setTouchedFields(prev => ({ ...prev, [name]: true }));

      // Validate on blur
      const error = validateField(name as keyof FormData, formData[name as keyof FormData]);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [formData]
  );

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    {
      const firstNameError = validateName(formData.firstName);
      if (firstNameError) errors.firstName = firstNameError;
    }

    {
      const lastNameError = validateName(formData.lastName);
      if (lastNameError) errors.lastName = lastNameError;
    }

    {
      const emailError = validateEmail(formData.email);
      if (emailError) errors.email = emailError;
    }

    {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) errors.phone = phoneError;
    }

    {
      const zipError = validateZip(formData.zipCode);
      if (zipError) errors.zipCode = zipError;
    }

    if (formData.age) {
      const ageError = validateAge(formData.age);
      if (ageError) errors.age = ageError;
    }

    if (formData.coverageAmount) {
      const coverageError = validateCoverageAmount(formData.coverageAmount);
      if (coverageError) errors.coverageAmount = coverageError;
    }

    if (!formData.insuranceType) {
      errors.insuranceType = 'Please select an insurance type';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
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
        localStorage.removeItem(FORM_KEY);
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
    <div className="w-full">
      <InsuranceTip productType={formData.insuranceType.toLowerCase()} />

      <div className="flex justify-center items-center py-4 sm:py-8">
        <form
          onSubmit={handleSubmit}
          id="quote-form"
          className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
            Get Your Free Quote
          </h2>

          <div className="space-y-6">
            {/* Insurance Type Selection */}
            <div className="space-y-2">
              <label
                htmlFor="insuranceType"
                className="block text-sm font-medium text-gray-700"
              >
                Insurance Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Select
                  value={formData.insuranceType}
                  onValueChange={value =>
                    handleChange({
                      target: { name: 'insuranceType', value },
                    } as ChangeEvent<HTMLInputElement>)
                  }
                  onOpenChange={() => handleSelectBlur('insuranceType')}
                >
                  <SelectTrigger 
                    className="w-full h-11 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                  >
                    <SelectValue placeholder="Select insurance type" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent 
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    position="popper"
                    sideOffset={5}
                  >
                    <div className="py-1">
                      {INSURANCE_OPTIONS.map(type => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150 focus:bg-blue-50 focus:text-blue-600 outline-none"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
              {touchedFields.insuranceType && formErrors.insuranceType && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.insuranceType}
                </p>
              )}
            </div>

            {/* Required Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-11 ${touchedFields.firstName && formErrors.firstName ? 'border-red-500 dark:border-red-400' : ''}`}
                />
                {touchedFields.firstName && formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-11 ${touchedFields.lastName && formErrors.lastName ? 'border-red-500 dark:border-red-400' : ''}`}
                />
                {touchedFields.lastName && formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-11 ${touchedFields.email && formErrors.email ? 'border-red-500 dark:border-red-400' : ''}`}
              />
              {touchedFields.email && formErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-11 ${touchedFields.phone && formErrors.phone ? 'border-red-500 dark:border-red-400' : ''}`}
                />
                {touchedFields.phone && formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="zipCode"
                  required
                  placeholder="Enter your ZIP code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-11 ${touchedFields.zipCode && formErrors.zipCode ? 'border-red-500 dark:border-red-400' : ''}`}
                />
                {touchedFields.zipCode && formErrors.zipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.zipCode}
                  </p>
                )}
              </div>
            </div>

            {/* Honeypot field - hidden from users but visible to bots */}
            <div className="hidden">
              <label htmlFor="website">Website</label>
              <Input
                type="text"
                name="website"
                id="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website || ''}
                onChange={handleChange}
              />
            </div>

            <FieldWithTooltip
              label="Age"
              name="age"
              tooltip="Your age helps us determine the most appropriate coverage options and rates for you."
              required
              type="number"
              min="18"
              max="120"
              placeholder="Enter your age"
              value={formData.age || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.age ? formErrors.age : undefined}
              aria-invalid={!!formErrors.age}
              aria-describedby={formErrors.age ? 'age-error' : undefined}
              className="h-11"
            />

            <FieldWithTooltip
              label="Coverage Amount"
              name="coverageAmount"
              tooltip="The amount of coverage you need. This helps us calculate your premium and ensure adequate protection."
              required
              type="number"
              min="0"
              step="1000"
              placeholder="Enter coverage amount"
              value={formData.coverageAmount || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.coverageAmount ? formErrors.coverageAmount : undefined}
              aria-invalid={!!formErrors.coverageAmount}
              aria-describedby={formErrors.coverageAmount ? 'coverageAmount-error' : undefined}
              className="h-11"
            />

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
              </Button>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              We respect your privacy. Your information is secure.
            </p>

            {submitStatus === 'success' && (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-4 mt-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center">
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
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Thank you! We&apos;ll reach out to you shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 mt-4 border border-red-100 dark:border-red-800">
                <div className="flex items-center">
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
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Sorry, there was an error submitting your form. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
