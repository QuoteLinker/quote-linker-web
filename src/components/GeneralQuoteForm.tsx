'use client';

import { useState, useEffect } from 'react';

const insuranceTypes = [
  { id: 'LIFE_TERM', label: 'Term Life Insurance' },
  { id: 'LIFE_PERMANENT', label: 'Permanent Life Insurance' },
  { id: 'HEALTH_SHORT_TERM_DISABILITY', label: 'Short Term Disability Insurance' },
  { id: 'HEALTH_SUPPLEMENTAL', label: 'Supplemental Health Insurance' },
];

export default function GeneralQuoteForm() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Scroll to form when component mounts
  useEffect(() => {
    const formElement = document.getElementById('general-quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Handle form submission
      // ... existing form submission code ...
      
      setSubmitStatus('success');
      
      // Scroll to form with consistent behavior
      const formElement = document.getElementById('general-quote-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInsuranceType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} id="general-quote-form" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-brand-body mb-4">
          What type of insurance are you interested in?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {insuranceTypes.map((type) => (
            <div key={type.id} className="flex items-center">
              <input
                type="checkbox"
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onChange={() => toggleInsuranceType(type.id)}
                className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
              />
              <label htmlFor={type.id} className="ml-2 text-brand-body">
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-brand-body mb-2">
            First Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-body mb-2">
            Last Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-body mb-2">
            Phone
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-body mb-2">
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-body mb-2">
          Additional Information (Optional)
        </label>
        <textarea
          rows={4}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          placeholder="Tell us more about your insurance needs..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00EEFD] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#00D4E5] transition-colors shadow-brand disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
        </button>
        
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
            Thank you! We'll be in touch shortly with your personalized quotes.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-md">
            There was an error submitting your form. Please try again.
          </div>
        )}
        
        <p className="mt-3 text-xs text-brand-body text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </div>
    </form>
  );
} 