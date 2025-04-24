'use client';

import { useState } from 'react';

const insuranceTypes = [
  { id: 'auto', label: 'Auto Insurance' },
  { id: 'home', label: 'Home Insurance' },
  { id: 'life', label: 'Life Insurance' },
  { id: 'disability', label: 'Disability Insurance' },
];

export default function GeneralQuoteForm() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const toggleInsuranceType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full bg-brand-primary text-black font-semibold py-3 px-6 rounded-xl hover:bg-brand-primary-dark transition-colors shadow-brand"
        >
          Get My Free Quote
        </button>
        <p className="mt-3 text-xs text-brand-body text-center">
          By submitting this form, you agree to our <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a> and consent to being contacted by our insurance partners.
        </p>
      </div>
    </form>
  );
} 