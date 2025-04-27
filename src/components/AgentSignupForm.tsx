'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentSignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    
    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!data.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.agencyName?.trim()) {
      errors.agencyName = 'Agency name is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setFormErrors({});

    const form = e.currentTarget;
    const data: Record<string, string> = {};
    
    // Collect form data
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name && element.value) {
        data[element.name] = element.value;
      }
    }

    // Validate form data
    if (!validateForm(data)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Log successful submission to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'agentSignup',
          form_data: {
            ...data,
            leadId: result.leadId,
            mockMode: result.mockMode
          }
        });
      }

      setSuccess(true);
      
      // Show success animation
      const formElement = document.getElementById('agent-signup-form');
      if (formElement) {
        formElement.classList.add('success-animation');
      }
      
      // Redirect to success page after animation
      setTimeout(() => {
        router.push('/success');
      }, 2000);

    } catch (err) {
      console.error('Form submission error:', err);
      
      // Log error to GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'agentSignupError',
          error: err instanceof Error ? err.message : 'Unknown error',
          form_data: data
        });
      }

      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      id="agent-signup-form"
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow sm:rounded-lg p-6"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.firstName ? 'border-red-500' : ''
            }`}
          />
          {formErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.lastName ? 'border-red-500' : ''
            }`}
          />
          {formErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.email ? 'border-red-500' : ''
            }`}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.phone ? 'border-red-500' : ''
            }`}
          />
          {formErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">
            Agency Name *
          </label>
          <input
            type="text"
            id="agencyName"
            name="agencyName"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.agencyName ? 'border-red-500' : ''
            }`}
          />
          {formErrors.agencyName && (
            <p className="mt-1 text-sm text-red-600">{formErrors.agencyName}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Success! Redirecting you to confirmation...</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Join QuoteLinker'
          )}
        </button>
      </div>
    </form>
  );
} 