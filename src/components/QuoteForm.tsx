'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InsuranceType } from '@/utils/insuranceCopy';

interface QuoteFormProps {
  insuranceType: InsuranceType;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
}

const inputClasses = "w-full rounded-lg border border-gray-300 px-4 py-3 text-[#1A1A1A] placeholder-gray-400 focus:border-[#00F6FF] focus:ring-1 focus:ring-[#00F6FF] transition-shadow";
const labelClasses = "block text-sm font-medium text-[#0A0A0A] mb-2";

export default function QuoteForm({ insuranceType, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    insuranceType: 'auto',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-4">Thank You!</h3>
        <p className="text-lg text-[#1A1A1A] opacity-80">
          We've received your request and will connect you with a licensed agent shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-10">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label htmlFor="insuranceType" className={labelClasses}>
            Insurance Type
          </label>
          <select
            id="insuranceType"
            name="insuranceType"
            required
            value={formData.insuranceType}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="auto">Auto Insurance</option>
            <option value="home">Home Insurance</option>
            <option value="life">Life Insurance</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Tell us about your insurance needs..."
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#00F6FF] text-black font-semibold px-8 py-4 rounded-xl shadow-[0_8px_16px_rgba(0,246,255,0.25)] hover:bg-[#4DF9FF] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? 'animate-pulse' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Get My Quote'}
        </button>
      </div>
    </form>
  );
} 