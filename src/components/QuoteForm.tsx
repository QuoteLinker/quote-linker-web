'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FocusEvent, useRef, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import { TrustIndicator } from './trust/TrustIndicator';
import { useQuoteTrust } from '@/lib/trust/useQuoteTrust';
import { FormData, FormErrors, FIELD_CONFIG, InsuranceType } from '@/types/insurance';
import { 
  trackFormFieldInteraction, 
  trackFormStart, 
  trackFormValidation,
  trackTrustSignal
} from '@/utils/gtm';

interface QuoteFormProps {
  intent?: string;
  className?: string;
}

const FORM_KEY = 'savedQuoteForm';

function QuoteFormContent({ intent = 'general', className = '' }: QuoteFormProps) {
  // Map intent to insuranceType
  let insuranceType = (intent || 'general').toUpperCase() as InsuranceType;
  if (!insuranceType || !FIELD_CONFIG[insuranceType]) {
    // Fallback to AUTO if invalid
    insuranceType = 'AUTO';
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize trust system
  const { addFormInteractionSignal, addSocialProofSignal } = useQuoteTrust({
    formId: 'quote-form',
    productType: insuranceType as InsuranceType,
  });

  // Track UTM parameters and referrer
  const [attributionData, setAttributionData] = useState({
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    referrer: '',
  });

  // Capture UTM parameters and referrer on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttributionData({
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmTerm: params.get('utm_term') || '',
      referrer: document.referrer || '',
    });
  }, []);

  // Determine if we're on a product-specific page
  const isProductSpecificPage = pathname?.startsWith('/') && 
    ['/home', '/life', '/health', '/auto'].includes(pathname);

  // Auto-scroll to form on product-specific pages
  useEffect(() => {
    // Small delay to ensure DOM is ready and any animations have completed
    const timer = setTimeout(() => {
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Default to the first main insurance type if none provided
  const defaultType: InsuranceType = 'AUTO';
  const initialType = insuranceType ? insuranceType : defaultType;

  // Convert to main insurance type if it's a subtype
  const getMainType = (type: InsuranceType): InsuranceType => {
    return type;
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
      zip: '',
      insuranceType: insuranceType,
    };
  });

  // Reset form state on intent/insuranceType change
  useEffect(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zip: '',
      insuranceType: insuranceType,
    });
    setFormErrors({});
    setTouchedFields({});
    setIsSubmitting(false);
    setSubmitStatus('idle');
  }, [insuranceType]);

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

  // Track form start when component mounts
  useEffect(() => {
    trackFormStart('quote-form', insuranceType);
  }, [insuranceType]);

  const validateField = (name: string, value: string | null | undefined): string | undefined => {
    if (value === null || value === undefined) {
      if (['firstName', 'lastName', 'email', 'phone', 'zip', 'insuranceType'].includes(name)) {
        return 'This field is required';
      }
      return undefined;
    }
    
    switch (name) {
      case 'firstName':
      case 'lastName': {
        if (value.length < 2) return 'Please enter a valid name (minimum 2 characters)';
        if (value.length > 50) return 'Name is too long (maximum 50 characters)';
        if (!/^[a-zA-Z\s-']+$/.test(value)) return 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
        return undefined;
      }
      case 'email': {
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email address';
        if (value.length > 100) return 'Email address is too long';
        return undefined;
      }
      case 'phone': {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 10) return 'Please enter a valid 10-digit phone number';
        return undefined;
      }
      case 'zip': {
        if (!value.match(/^\d{5}$/)) return 'Please enter a valid 5-digit ZIP code';
        return undefined;
      }
      case 'age': {
        const numValue = Number(value);
        if (isNaN(numValue)) return 'Please enter a valid age';
        if (numValue < 18) return 'You must be at least 18 years old';
        if (numValue > 120) return 'Please enter a valid age';
        return undefined;
      }
      case 'coverageAmount': {
        const numValue = Number(value.replace(/[^0-9]/g, ''));
        if (isNaN(numValue)) return 'Please enter a valid coverage amount';
        if (numValue < 10000) return 'Coverage amount must be at least $10,000';
        if (numValue > 10000000) return 'Coverage amount cannot exceed $10,000,000';
        return undefined;
      }
      case 'propertyValue': {
        const numValue = Number(value.replace(/[^0-9]/g, ''));
        if (isNaN(numValue)) return 'Please enter a valid property value';
        if (numValue < 10000) return 'Property value must be at least $10,000';
        if (numValue > 10000000) return 'Property value cannot exceed $10,000,000';
        return undefined;
      }
      case 'insuranceType': {
        if (!value) return 'Please select an insurance type';
        return undefined;
      }
      default:
        return undefined;
    }
  };

  // Add real-time validation feedback
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Track field interaction
    trackFormFieldInteraction(name, value, 'change');
    
    // Add trust signal for valid input
    if (!error) {
      addFormInteractionSignal('valid_input', 1);
    }
  };

  // Add trust signals for form interactions
  const handleFieldInteraction = (fieldName: string, value: string | null) => {
    addFormInteractionSignal(`field_${fieldName}`, value ? 0.1 : 0);
  };

  const handleFieldValidation = (fieldName: string, isValid: boolean) => {
    addFormInteractionSignal(`validation_${fieldName}`, isValid ? 0.2 : -0.1);
  };

  // Update the handleChange function to include trust signals and field interaction tracking
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    handleFieldInteraction(name, value);
    
    // Track field interaction
    trackFormFieldInteraction('quote-form', name, 'change');
    
    // Validate the field and update trust
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
    handleFieldValidation(name, !error);
    
    // Track validation result
    trackFormValidation('quote-form', name, !error, error);
  };

  // Update handleBlur to include field interaction tracking
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouchedFields(prev => ({ ...prev, [name]: true }));
      
      // Track field interaction
      trackFormFieldInteraction('quote-form', name, 'blur');
      
      const value = formData[name as keyof FormData] as string | null | undefined;
      const error = validateField(name, value);
      if (error) {
        setFormErrors(prev => ({ ...prev, [name]: error }));
        // Track validation error
        trackFormValidation('quote-form', name, false, error);
      } else {
        // Track validation success
        trackFormValidation('quote-form', name, true);
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

  // Update handleSubmit to include trust signal tracking
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    if (!isValid) {
      // Mark all fields as touched to show errors
      const allFields = Object.keys(formData);
      const touchedFields = allFields.reduce((acc, field) => ({
        ...acc,
        [field]: true
      }), {});
      setTouchedFields(touchedFields);
      
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Add trust signal for form submission
      addFormInteractionSignal('form_submit', 1);
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        ...attributionData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer,
      };
      
      // Submit form data
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Track successful submission
      trackFormValidation('quote-form', 'submission', true);
      
      // Clear form data from localStorage
      localStorage.removeItem(FORM_KEY);
      
      // Show success message
      toast.success('Thank you! We\'ll be in touch shortly.');
      
      // Redirect to thank you page
      router.push(`/thank-you?type=${insuranceType.toLowerCase()}`);
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track failed submission
      trackFormValidation('quote-form', 'submission', false, 'Submission failed');
      
      // Show error message
      toast.error('Sorry, something went wrong. Please try again or contact support.');
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add loading state component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="ml-2">Processing...</span>
    </div>
  );

  const fields = FIELD_CONFIG[insuranceType];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TrustIndicator className="mb-6" showDetails={true} />
          
          <InsuranceTip productType={insuranceType.toLowerCase()} />

          <div className="flex justify-center items-center py-4 sm:py-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id="quote-form"
              className={`w-full max-w-md bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-100 relative ${className}`}
              aria-label="Insurance Quote Request Form"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
                Get Your Free {insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Insurance Quote
              </h2>

              {/* Trust Indicators */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Secure & Private</h3>
                    <p className="text-sm text-gray-500">Your information is encrypted and never shared with third parties</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Quick Process</h3>
                    <p className="text-sm text-gray-500">Get matched with licensed agents in your area in minutes</p>
                  </div>
                </div>
              </div>

              {/* Form Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Form Progress</span>
                  <span className="text-sm text-gray-500">
                    {Object.keys(touchedFields).length} of {Object.keys(formData).length} fields completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(touchedFields).length / Object.keys(formData).length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Required Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="Enter your first name"
                      value={formData.firstName || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`h-11 ${touchedFields.firstName && formErrors.firstName ? 'border-red-500' : ''}`}
                      aria-required="true"
                      aria-invalid={!!formErrors.firstName}
                      aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                    />
                    {touchedFields.firstName && formErrors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      placeholder="Enter your last name"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`h-11 ${touchedFields.lastName && formErrors.lastName ? 'border-red-500' : ''}`}
                      aria-required="true"
                      aria-invalid={!!formErrors.lastName}
                      aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                    />
                    {touchedFields.lastName && formErrors.lastName && (
                      <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Phone/Zip section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`h-11 ${touchedFields.email && formErrors.email ? 'border-red-500' : ''}`}
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {touchedFields.email && formErrors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`h-11 ${touchedFields.phone && formErrors.phone ? 'border-red-500' : ''}`}
                        aria-required="true"
                        aria-invalid={!!formErrors.phone}
                        aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                      />
                      {touchedFields.phone && formErrors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="zip"
                        id="zip"
                        required
                        placeholder="Enter your ZIP code"
                        value={formData.zip || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`h-11 ${touchedFields.zip && formErrors.zip ? 'border-red-500' : ''}`}
                        aria-required="true"
                        aria-invalid={!!formErrors.zip}
                        aria-describedby={formErrors.zip ? 'zip-error' : undefined}
                      />
                      {touchedFields.zip && formErrors.zip && (
                        <p id="zip-error" className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.zip}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product-specific fields */}
                {fields.includes('age') && (
                  <div className="space-y-6">
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
                  </div>
                )}

                {fields.includes('tobaccoUse') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Tobacco Use"
                      name="tobaccoUse"
                      tooltip="Tobacco use can affect your health insurance rates. Please be honest in your response."
                      required
                      type="text"
                      placeholder="Enter your tobacco use"
                      value={formData.tobaccoUse || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.tobaccoUse ? formErrors.tobaccoUse : undefined}
                      aria-invalid={!!formErrors.tobaccoUse}
                      aria-describedby={formErrors.tobaccoUse ? 'tobaccoUse-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('employmentStatus') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Employment Status"
                      name="employmentStatus"
                      tooltip="Your employment status can affect your insurance rates. Please be honest in your response."
                      required
                      type="text"
                      placeholder="Enter your employment status"
                      value={formData.employmentStatus || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.employmentStatus ? formErrors.employmentStatus : undefined}
                      aria-invalid={!!formErrors.employmentStatus}
                      aria-describedby={formErrors.employmentStatus ? 'employmentStatus-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('streetAddress') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Street Address"
                      name="streetAddress"
                      tooltip="Your street address can affect your insurance rates. Please be honest in your response."
                      required
                      type="text"
                      placeholder="Enter your street address"
                      value={formData.streetAddress || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.streetAddress ? formErrors.streetAddress : undefined}
                      aria-invalid={!!formErrors.streetAddress}
                      aria-describedby={formErrors.streetAddress ? 'streetAddress-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('vehicleUse') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Vehicle Use"
                      name="vehicleUse"
                      tooltip="Your vehicle use can affect your insurance rates. Please be honest in your response."
                      required
                      type="text"
                      placeholder="Enter your vehicle use"
                      value={formData.vehicleUse || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.vehicleUse ? formErrors.vehicleUse : undefined}
                      aria-invalid={!!formErrors.vehicleUse}
                      aria-describedby={formErrors.vehicleUse ? 'vehicleUse-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('coverageAmount') && (
                  <div className="space-y-6">
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
                  </div>
                )}

                {fields.includes('propertyType') && (
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
                        <SelectTrigger className="w-full h-11" aria-label="Select property type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-h-[200px] overflow-y-auto">
                          <SelectItem value="single_family">Single Family Home</SelectItem>
                          <SelectItem value="condo">Condo/Townhouse</SelectItem>
                          <SelectItem value="multi_family">Multi-Family Home</SelectItem>
                          <SelectItem value="mobile_home">Mobile Home</SelectItem>
                        </SelectContent>
                      </Select>
                      {touchedFields.propertyType && formErrors.propertyType && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.propertyType}
                        </p>
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

                {fields.includes('coverageType') && (
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
                        <SelectTrigger className="w-full h-11" aria-label="Select coverage type">
                          <SelectValue placeholder="Select coverage type" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] max-h-[200px] overflow-y-auto">
                          <SelectItem value="individual">Individual Coverage</SelectItem>
                          <SelectItem value="family">Family Coverage</SelectItem>
                          <SelectItem value="medicare_supplement">Medicare Supplement</SelectItem>
                        </SelectContent>
                      </Select>
                      {touchedFields.coverageType && formErrors.coverageType && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.coverageType}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {fields.includes('monthlyIncome') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Monthly Income"
                      name="monthlyIncome"
                      tooltip="Your current monthly income helps us determine appropriate coverage amounts."
                      required
                      type="number"
                      min="0"
                      step="100"
                      placeholder="Enter your monthly income"
                      value={formData.monthlyIncome || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.monthlyIncome ? formErrors.monthlyIncome : undefined}
                      aria-invalid={!!formErrors.monthlyIncome}
                      aria-describedby={formErrors.monthlyIncome ? 'monthlyIncome-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('occupation') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Occupation"
                      name="occupation"
                      tooltip="Your occupation helps us assess risk factors and determine appropriate coverage."
                      required
                      type="text"
                      placeholder="Enter your occupation"
                      value={formData.occupation || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.occupation ? formErrors.occupation : undefined}
                      aria-invalid={!!formErrors.occupation}
                      aria-describedby={formErrors.occupation ? 'occupation-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {fields.includes('currentCoverage') && (
                  <div className="space-y-6">
                    <FieldWithTooltip
                      label="Current Coverage"
                      name="currentCoverage"
                      tooltip="Tell us about your current insurance coverage to help us recommend appropriate supplemental options."
                      required
                      type="text"
                      placeholder="Describe your current coverage"
                      value={formData.currentCoverage || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touchedFields.currentCoverage ? formErrors.currentCoverage : undefined}
                      aria-invalid={!!formErrors.currentCoverage}
                      aria-describedby={formErrors.currentCoverage ? 'currentCoverage-error' : undefined}
                      className="h-11"
                    />
                  </div>
                )}

                {/* Hidden attribution fields */}
                <div className="hidden">
                  <input type="hidden" name="utmSource" value={attributionData.utmSource} />
                  <input type="hidden" name="utmMedium" value={attributionData.utmMedium} />
                  <input type="hidden" name="utmCampaign" value={attributionData.utmCampaign} />
                  <input type="hidden" name="utmTerm" value={attributionData.utmTerm} />
                  <input type="hidden" name="referrer" value={attributionData.referrer} />
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

                {/* Social Proof */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">4.8/5</div>
                      <div className="text-sm text-gray-500">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10k+</div>
                      <div className="text-sm text-gray-500">Quotes Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">98%</div>
                      <div className="text-sm text-gray-500">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-12 text-base font-medium text-white bg-[#007BFF] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label={isSubmitting ? 'Submitting quote request...' : 'Submit quote request'}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner />
                    ) : (
                      'Get My Free Quote'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Additional trust-building content can go here */}
        </div>
      </div>
    </div>
  );
}

export default function QuoteForm({ intent = 'general', className, }: QuoteFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuoteFormContent intent={intent} className={className} />
    </Suspense>
  );
}
