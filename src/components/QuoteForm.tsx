'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuoteFormProps { 
  insuranceType: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  zip: string;
  insuranceType: string;
  message: string;
}

export default function QuoteForm({ insuranceType, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zip: '',
    insuranceType: insuranceType || 'auto',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track form submission in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Quote',
          event_label: insuranceType,
          value: 1
        });
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        zip: '',
        insuranceType: insuranceType || 'auto',
        message: '',
      });
    } catch (err) {
      setSubmitStatus('error');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`bg-brand-card p-10 rounded-2xl shadow-brand ${className}`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-headline mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white text-brand-body"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-headline mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white text-brand-body"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-brand-headline mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white text-brand-body"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-brand-headline mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white text-brand-body"
              placeholder="12345"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-brand-headline mb-2">
            Additional Information (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-white text-brand-body"
            placeholder="Tell us about your specific insurance needs..."
          />
        </div>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">
            <p className="font-medium">Thank you for your submission!</p>
            <p className="text-sm mt-1">We'll be in touch with you shortly.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 text-red-800 rounded-lg">
            <p className="font-medium">There was an error submitting your form.</p>
            <p className="text-sm mt-1">Please try again or contact us directly.</p>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary text-white font-semibold px-6 py-4 rounded-xl shadow-brand hover:bg-brand-secondary transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
          </button>
        </div>
        
        <p className="text-xs text-brand-body opacity-60 text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </div>
    </form>
  );
} 