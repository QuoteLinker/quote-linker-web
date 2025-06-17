'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { CheckCircle, Car, Home, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import FieldWithTooltip from '@/components/FieldWithTooltip';
import Link from 'next/link';

// Define schema for validation
const leadSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "A valid phone number is required.").regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid phone number format."),
  zip: z.string().regex(/^\d{5}$/, "A valid 5-digit ZIP code is required."),
  insuranceType: z.string().min(1, "Please select an insurance type."),
  additionalInfo: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
});

type FormState = Omit<z.infer<typeof leadSchema>, 'consent'> & { consent: boolean };
type FormErrors = z.ZodError<FormState>['formErrors']['fieldErrors'];

// Define the insurance types with labels and detailed descriptions
const insuranceOptions = [
  { 
    id: 'auto', 
    label: 'Auto Insurance', 
    description: 'Coverage for your vehicles, protecting against accidents, theft, and damage.',
    icon: Car
  },
  { 
    id: 'home', 
    label: 'Home Insurance', 
    description: 'Protection for your home and personal belongings against damage, theft, and liability.',
    icon: Home
  },
  { 
    id: 'life', 
    label: 'Life Insurance', 
    description: 'Financial protection for your loved ones in the event of your death.',
    icon: Heart
  },
  { 
    id: 'health', 
    label: 'Health Insurance', 
    description: 'Coverage for medical expenses, providing access to quality healthcare services.',
    icon: Activity
  },
];

interface MultiStepQuoteFormProps {
  productType?: string;
}

export default function MultiStepQuoteForm({ productType }: MultiStepQuoteFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Form steps
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Insurance Type', 'Personal Info', 'Review'];
  
  // Form state
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    insuranceType: productType || searchParams.get('type') || '',
    additionalInfo: '',
    consent: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with product type if provided
  useEffect(() => {
    const typeToSet = productType || searchParams.get('type');
    if (typeToSet) {
      setFormData(prev => ({ ...prev, insuranceType: typeToSet }));
      // Skip to step 1 if insurance type is already provided
      setCurrentStep(1);
    }
  }, [productType, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && name === 'consent') {
      setFormData(prev => ({ ...prev, consent: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInsuranceTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, insuranceType: type }));
    setCurrentStep(1); // Move to next step
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Insurance Type
        if (!formData.insuranceType) {
          setErrors({ insuranceType: ['Please select an insurance type.'] });
          return false;
        }
        break;
      case 1: { // Personal Info
        const personalInfoSchema = z.object({
          firstName: leadSchema.shape.firstName,
          lastName: leadSchema.shape.lastName,
          email: leadSchema.shape.email,
          phone: leadSchema.shape.phone,
          zip: leadSchema.shape.zip,
        });
        
        const result = personalInfoSchema.safeParse(formData);
        if (!result.success) {
          setErrors(result.error.formErrors.fieldErrors);
          return false;
        }
        break;
      }
      case 2: // Review
        if (!formData.consent) {
          setErrors({ consent: ['You must consent to be contacted.'] });
          return false;
        }
        break;
    }
    
    setErrors({});
    return true;
  };
  
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    
    if (currentStep !== steps.length - 1) {
      nextStep();
      return;
    }
    
    setIsLoading(true);
    const toastId = toast.loading('Submitting your quote request...');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          insuranceTypes: [formData.insuranceType]
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        toast.error(result.error || 'Submission failed. Please try again.', { id: toastId });
      } else {
        toast.success('Quote request submitted successfully!', { id: toastId });
        
        // Redirect to thank you page
        router.push(`/thank-you?type=${formData.insuranceType}`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Submission error:', error);
      }
      toast.error('An unexpected error occurred.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Progress indicator
  const ProgressBar = () => (
    <div className="w-full mb-10 max-w-md mx-auto">
      <div className="flex justify-between mb-2 relative">
        {/* Connecting line between steps */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200" />
        
        {/* Ensure equal spacing between steps with equal widths */}
        {steps.map((step, index) => (
          <div 
            key={step} 
            className={`flex flex-col items-center justify-center relative z-10 flex-1 
              ${index <= currentStep ? 'text-cyan-600' : 'text-gray-400'}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2
                ${index < currentStep ? 'bg-cyan-600' : index === currentStep ? 'bg-cyan-500' : 'bg-gray-300'}`}
            >
              {index < currentStep ? <CheckCircle size={16} /> : index + 1}
            </div>
            <span className="text-xs font-medium text-center md:text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div 
          className="bg-cyan-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Render different form steps
  const renderFormStep = () => {
    switch(currentStep) {
      case 0: // Insurance Type Selection
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">What type of insurance are you looking for?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {insuranceOptions.map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center p-6 border-2 rounded-lg shadow-sm hover:shadow-md transition-all
                    ${formData.insuranceType === option.id 
                      ? 'border-cyan-500 bg-cyan-50' 
                      : 'border-gray-200 hover:border-cyan-300'}`}
                  onClick={() => {
                    // Direct users to the specific insurance type page with the quote flow started
                    router.push(`/${option.id}?startQuote=true`);
                  }}
                >
                  <div className="text-cyan-600 mb-3">
                    {React.createElement(option.icon, { size: 48, strokeWidth: 1.5 })}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-500 text-center">{option.description}</p>
                </motion.button>
              ))}
            </div>
            {errors.insuranceType && (
              <p className="text-sm text-red-600 text-center mt-2">{errors.insuranceType[0]}</p>
            )}
          </div>
        );
      
      case 1: // Personal Information
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Tell us about yourself</h2>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mt-6">
              <FieldWithTooltip
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName?.[0]}
                tooltip="Please enter your first name."
                required
              />
              <FieldWithTooltip
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName?.[0]}
                tooltip="Please enter your last name."
                required
              />
            </div>

            <FieldWithTooltip
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email?.[0]}
              tooltip="We'll use this to send your quote details."
              required
            />

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <FieldWithTooltip
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone?.[0]}
                tooltip="A valid phone number where we can reach you."
                required
              />
              <FieldWithTooltip
                label="ZIP Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                error={errors.zip?.[0]}
                tooltip="Your 5-digit ZIP code helps us find local rates."
                required
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Information (Optional)
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                value={formData.additionalInfo}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Any specific needs or questions?"
              />
            </div>
          </div>
        );
      
      case 2: { // Review & Submit
        const selectedInsurance = insuranceOptions.find(opt => opt.id === formData.insuranceType);
        
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Review Your Information</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-medium text-lg mb-4">Quote Details</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Insurance Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedInsurance?.label || formData.insuranceType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">ZIP Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.zip}</dd>
                </div>
                {formData.additionalInfo && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Additional Information</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.additionalInfo}</dd>
                  </div>
                )}
              </dl>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="text-xs text-gray-600">
                  By checking this box and submitting your information, you agree to our <Link href="/terms" className="text-cyan-600 hover:text-cyan-700 underline">Terms of Use</Link> and <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700 underline">Privacy Policy</Link>, and you provide express written consent for QuoteLinker and its <Link href="/partners" className="text-cyan-600 hover:text-cyan-700 underline">partners</Link> to contact you at the number and email address you provided (including through automated means, such as autodialers, pre-recorded messages, and text messages) about insurance products and services, even if your number is on a Do Not Call list. You understand that your consent is not a condition of any purchase. Message and data rates may apply.
                </label>
              </div>
            </div>
            {errors.consent && <p className="mt-2 text-sm text-red-600">{errors.consent[0]}</p>}
          </div>
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <ProgressBar />
      
      <div className="min-h-[400px]">
        {renderFormStep()}
      </div>
      
      <div className="mt-10 pt-6 border-t flex justify-between items-center">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            disabled={isLoading}
            className="py-2.5 px-5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-colors duration-200"
          >
            ← Previous
          </button>
        ) : (
          <div></div>
        )}
        
        <div className="flex-1"></div>
        
        <button
          type={currentStep === steps.length - 1 ? 'submit' : 'button'}
          onClick={currentStep === steps.length - 1 ? undefined : nextStep}
          disabled={isLoading}
          className="py-2.5 px-6 border border-transparent rounded-lg text-sm font-semibold text-white bg-electric-blue hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200 shadow-sm"
        >
          {currentStep === steps.length - 1 ? (isLoading ? 'Submitting...' : 'Get My Quotes') : 'Next →'}
        </button>
      </div>
    </form>
  );
}
