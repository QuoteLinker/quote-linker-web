'use client';

import React, { useState, useRef, ChangeEvent, FocusEvent, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { FormData, FormErrors, InsuranceType } from '@/types/insurance';
import {
  FaCar,
  FaHome,
  FaHeartbeat,
  FaBriefcaseMedical,
} from 'react-icons/fa';

interface QuoteFormProps {
  intent?: string;
  className?: string;
}

// Simplified insurance type icons mapping
const InsuranceIcons: Record<string, React.ReactNode> = {
  'AUTO': <FaCar className="text-primary h-6 w-6" />,
  'HOME': <FaHome className="text-primary h-6 w-6" />,
  'LIFE': <FaHeartbeat className="text-primary h-6 w-6" />,
  'HEALTH': <FaBriefcaseMedical className="text-primary h-6 w-6" />,
};

// Simplified insurance type names
const InsuranceTypeNames: Record<string, string> = {
  'AUTO': 'Auto Insurance',
  'HOME': 'Home Insurance',
  'LIFE': 'Life Insurance',
  'HEALTH': 'Health Insurance',
};

function QuoteFormContent({ intent = 'general', className = '' }: QuoteFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Map intent to insuranceType
  const insuranceType = (intent || 'general').toUpperCase() as InsuranceType;
  
  // Simplified state
  const [formData, setFormData] = useState<Partial<FormData>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    insuranceType: insuranceType || 'AUTO' as InsuranceType,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value || value.length < 2) return 'Please enter a valid name (minimum 2 characters)';
        return undefined;
      case 'email':
        if (!value || !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email address';
        return undefined;
      case 'phone': {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 10) return 'Please enter a valid 10-digit phone number';
        return undefined;
      }
      case 'zip':
        if (!value || !value.match(/^\d{5}$/)) return 'Please enter a valid 5-digit ZIP code';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    if (error) {
      setFormErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'zip'];
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof FormData] as string;
      const error = validateField(field, value || '');
      if (error) {
        errors[field as keyof FormErrors] = error;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const allFields = ['firstName', 'lastName', 'email', 'phone', 'zip'];
      const touchedFields = allFields.reduce((acc, field) => ({
        ...acc,
        [field]: true
      }), {});
      setTouchedFields(touchedFields);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      toast.success('Thank you! We\'ll be in touch shortly.');
      router.push(`/thank-you?type=${formData.insuranceType?.toLowerCase()}`);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Sorry, something went wrong. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      <span className="ml-2">Processing...</span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <div className="mr-3">
            {InsuranceIcons[formData.insuranceType || 'AUTO']}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Get Your {InsuranceTypeNames[formData.insuranceType || 'AUTO']} Quote
          </h2>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className={className}>
          {/* Insurance Type Selector */}
          <div className="mb-6">
            <div className="block text-sm font-medium text-gray-700 mb-4">
              Insurance Type <span className="text-red-500">*</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries({
                'AUTO': { icon: <FaCar className="h-5 w-5" />, name: 'Auto' },
                'HOME': { icon: <FaHome className="h-5 w-5" />, name: 'Home' },
                'LIFE': { icon: <FaHeartbeat className="h-5 w-5" />, name: 'Life' },
                'HEALTH': { icon: <FaBriefcaseMedical className="h-5 w-5" />, name: 'Health' }
              }).map(([type, { icon, name }]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, insuranceType: type as InsuranceType }))}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                    formData.insuranceType === type 
                      ? 'bg-blue-50 border-blue-500 shadow-sm' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-full mb-2 ${formData.insuranceType === type ? 'text-blue-600' : 'text-gray-500'}`}>
                    {icon}
                  </div>
                  <span className={`text-sm font-medium ${formData.insuranceType === type ? 'text-blue-700' : 'text-gray-700'}`}>
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
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
                className={touchedFields.firstName && formErrors.firstName ? 'border-red-500' : ''}
              />
              {touchedFields.firstName && formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
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
                className={touchedFields.lastName && formErrors.lastName ? 'border-red-500' : ''}
              />
              {touchedFields.lastName && formErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                value={formData.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.email && formErrors.email ? 'border-red-500' : ''}
              />
              {touchedFields.email && formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                required
                placeholder="(555) 123-4567"
                value={formData.phone || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.phone && formErrors.phone ? 'border-red-500' : ''}
              />
              {touchedFields.phone && formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="zip"
                id="zip"
                required
                placeholder="12345"
                value={formData.zip || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touchedFields.zip && formErrors.zip ? 'border-red-500' : ''}
              />
              {touchedFields.zip && formErrors.zip && (
                <p className="mt-1 text-sm text-red-600">{formErrors.zip}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              `Get My Free ${(InsuranceTypeNames[formData.insuranceType as string] || 'Insurance').split(" ")[0]} Quote`
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            No obligation • 100% free • Takes only 2 minutes
          </p>
        </form>
      </div>
    </div>
  );
}

export default function QuoteForm({ intent = 'general', className }: QuoteFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuoteFormContent intent={intent} className={className} />
    </Suspense>
  );
}
