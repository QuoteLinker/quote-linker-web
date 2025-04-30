import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

interface Step {
  title: string;
  description: string;
  fields: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (formData: any) => Promise<void>;
  initialData?: any;
  insuranceType: string;
  onStepChange?: (currentStep: number) => void;
}

export default function MultiStepForm({
  steps,
  onSubmit,
  initialData = {},
  insuranceType,
  onStepChange,
}: MultiStepFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load saved form data from localStorage
  const loadSavedFormData = useCallback((): any => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem(`quoteFormData_${insuranceType}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
    return null;
  }, [insuranceType]);

  // Initialize form data from localStorage or props
  useEffect(() => {
    const saved = loadSavedFormData();
    if (saved) {
      setFormData(saved);
    }
  }, [loadSavedFormData]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((data: any) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`quoteFormData_${insuranceType}`, JSON.stringify(data));
      }
    }, 1000),
    [insuranceType]
  );

  // Save form data whenever it changes
  useEffect(() => {
    debouncedSave(formData);
    return () => {
      debouncedSave.cancel();
    };
  }, [formData, debouncedSave]);

  // Notify parent component when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev: any) => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = (): boolean => {
    // This should be implemented by the parent component
    // and passed as a prop if needed
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      
      // Clear saved form data on successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`quoteFormData_${insuranceType}`);
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

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full ${
                  index <= currentStep ? 'bg-[#00EEFD]' : 'bg-gray-200'
                }`}
                style={{ width: `${100 / steps.length - 2}%` }}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step title and description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
          <p className="mt-1 text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Form fields for current step */}
        <div className="space-y-4">
          {steps[currentStep].fields}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-[#00EEFD] bg-white border border-[#00EEFD] rounded-md shadow-sm hover:bg-[#00EEFD] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD]"
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}
          
          {isLastStep ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-[#00EEFD] border border-transparent rounded-md shadow-sm hover:bg-[#00D4E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD] disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm font-medium text-white bg-[#00EEFD] border border-transparent rounded-md shadow-sm hover:bg-[#00D4E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD]"
            >
              Next
            </button>
          )}
        </div>

        {/* Status messages */}
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

        {/* Privacy disclosure */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this form, you agree to our <a href="/privacy" className="text-[#00EEFD] hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </form>
    </div>
  );
} 