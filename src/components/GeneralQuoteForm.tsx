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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-brand-body mb-2">
          Insurance Types*
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          multiple
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
          value={selectedTypes}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, (option) => option.value);
            setSelectedTypes(options);
          }}
        >
          {insuranceTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
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
      </div>
    </form>
  );
} 