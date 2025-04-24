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
        insuranceType: 'auto',
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
    <section className="py-24 px-6 bg-gradient-to-b from-brand-background to-brand-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
      <div className="container relative mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-headline mb-4">
              Get Your Free Quote Today
            </h2>
            <p className="text-lg text-brand-body opacity-80">
              Fill out the form below and we'll get back to you with a personalized quote
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="bg-brand-card p-8 rounded-2xl shadow-brand"
          >
            <div className="space-y-6">
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
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-card focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-headline placeholder-brand-body/50"
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
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-card focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-headline placeholder-brand-body/50"
                  placeholder="john@example.com"
                />
              </div>

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
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-card focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-headline placeholder-brand-body/50"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="insuranceType" className="block text-sm font-medium text-brand-headline mb-2">
                  Insurance Type
                </label>
                <select
                  id="insuranceType"
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-card focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-headline"
                >
                  <option value="auto">Auto Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="life">Life Insurance</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-headline mb-2">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-brand-card focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-headline placeholder-brand-body/50"
                  placeholder="Tell us more about your insurance needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-all
                  ${isSubmitting 
                    ? 'bg-brand-primary/70 cursor-not-allowed' 
                    : 'bg-brand-primary hover:bg-brand-secondary shadow-brand hover:shadow-lg'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                  Thank you! We've received your request and will contact you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                  There was an error submitting your request. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 