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
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  zipCode: string | null;
  insuranceType: MainInsuranceType;
  age?: string | null;
  coverageAmount?: string | null;
  website?: string | null;
  honeypot?: string | null;
  propertyType?: string | null;
  propertyValue?: string | null;
  vehicleUse?: string | null;
  coverageType?: string | null;
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
  propertyType?: string;
  propertyValue?: string;
  vehicleUse?: string;
  coverageType?: string;
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
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      zipCode: null,
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

  const validateField = (name: string, value: string | null | undefined): string | undefined => {
    if (value === null || value === undefined) {
      if (['firstName', 'lastName', 'email', 'phone', 'zipCode', 'insuranceType'].includes(name)) {
        return 'This field is required';
      }
      return undefined;
    }
    
    switch (name) {
      case 'firstName':
      case 'lastName': {
        if (value.length < 2) return 'Must be at least 2 characters';
        return undefined;
      }
      case 'email': {
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email';
        return undefined;
      }
      case 'phone': {
        if (!value.match(/^\d{10}$/)) return 'Please enter a valid 10-digit phone number';
        return undefined;
      }
      case 'zipCode': {
        if (!value.match(/^\d{5}$/)) return 'Please enter a valid 5-digit ZIP code';
        return undefined;
      }
      case 'age': {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 18 || numValue > 120) {
          return 'Please enter a valid age between 18 and 120';
        }
        return undefined;
      }
      case 'coverageAmount': {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
          return 'Please enter a valid coverage amount';
        }
        return undefined;
      }
      case 'propertyValue': {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
          return 'Property value must be non-negative';
        }
        return undefined;
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
      const error = validateField(name, value);
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
      const value = formData[name as keyof FormData] as string | null | undefined;
      const error = validateField(name, value);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [formData]
  );

  const handleSelectBlur = useCallback(
    (name: string) => {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
      const value = formData[name as keyof FormData] as string | null | undefined;
      const error = validateField(name, value);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [formData]
  );

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value as string | null | undefined);
      if (error) {
        errors[name as keyof FormErrors] = error;
      }
    });
    
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
                  value={formData.firstName || ''}
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
                  value={formData.lastName || ''}
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

            {/* Email and Phone/Zip section */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={formData.email || ''}
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
                  value={formData.phone || ''}
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
                  value={formData.zipCode || ''}
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

            {/* Honeypot field */}
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

            {/* Conditional Fields Based on Insurance Type */}
            {formData.insuranceType === 'LIFE' && (
              <>
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
              </>
            )}

            {formData.insuranceType === 'HOME' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.propertyType || ''}
                    onValueChange={value =>
                      handleChange({
                        target: { name: 'propertyType', value },
                      } as ChangeEvent<HTMLInputElement>)
                    }
                    onOpenChange={() => handleSelectBlur('propertyType')}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condo/Townhouse</SelectItem>
                      <SelectItem value="multi_family">Multi-Family Home</SelectItem>
                      <SelectItem value="mobile_home">Mobile Home</SelectItem>
                    </SelectContent>
                  </Select>
                  {touchedFields.propertyType && formErrors.propertyType && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.propertyType}</p>
                  )}
                </div>

                <FieldWithTooltip
                  label="Property Value"
                  name="propertyValue"
                  tooltip="Estimated value of your property."
                  required
                  type="number"
                  min={0}
                  step={1000}
                  placeholder="Enter property value"
                  value={formData.propertyValue || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-11"
                />
              </div>
            )}

            {formData.insuranceType === 'AUTO' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="vehicleUse" className="block text-sm font-medium text-gray-700">
                    Vehicle Use <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.vehicleUse || ''}
                    onValueChange={value =>
                      handleChange({
                        target: { name: 'vehicleUse', value },
                      } as ChangeEvent<HTMLInputElement>)
                    }
                    onOpenChange={() => handleSelectBlur('vehicleUse')}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Select vehicle use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Use</SelectItem>
                      <SelectItem value="commute">Commuting</SelectItem>
                      <SelectItem value="business">Business Use</SelectItem>
                    </SelectContent>
                  </Select>
                  {touchedFields.vehicleUse && formErrors.vehicleUse && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.vehicleUse}</p>
                  )}
                </div>
              </div>
            )}

            {formData.insuranceType === 'HEALTH' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="coverageType" className="block text-sm font-medium text-gray-700">
                    Coverage Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.coverageType || ''}
                    onValueChange={value =>
                      handleChange({
                        target: { name: 'coverageType', value },
                      } as ChangeEvent<HTMLInputElement>)
                    }
                    onOpenChange={() => handleSelectBlur('coverageType')}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Coverage</SelectItem>
                      <SelectItem value="family">Family Coverage</SelectItem>
                      <SelectItem value="medicare_supplement">Medicare Supplement</SelectItem>
                    </SelectContent>
                  </Select>
                  {touchedFields.coverageType && formErrors.coverageType && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.coverageType}</p>
                  )}
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium bg-[#1D4ED8] hover:bg-[#1e40af] active:bg-[#1e3a8a] text-white rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Get My Free Quote'
                )}
              </Button>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Your privacy is our priority. Your information is encrypted and securely transmitted. We never share your data without your consent.
            </p>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="rounded-lg bg-green-50 p-4 mt-4 border border-green-100">
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
                    <p className="text-sm font-medium text-green-800">
                      Thank you! Your quote request has been received. A licensed insurance agent will contact you within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-lg bg-red-50 p-4 mt-4 border border-red-100">
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
                    <div className="text-sm font-medium text-red-800">
                      We encountered an issue while submitting your form. This could be due to:
                    </div>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      <li>A temporary connection issue</li>
                      <li>High server traffic</li>
                    </ul>
                    <div className="mt-2 text-sm text-red-800">
                      Please try again or call us directly at (888) 123-4567 for immediate assistance.
                    </div>
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
