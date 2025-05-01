'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LeadForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    insuranceType: '',
    subLine: '',
    zipCode: '',
    heardAboutUs: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Scroll to form when component mounts
  useEffect(() => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const insuranceTypeOptions = [
    { value: 'Auto', label: 'Auto' },
    { value: 'Home', label: 'Home' },
    { value: 'Life', label: 'Life' },
    { value: 'Health', label: 'Health' }
  ];

  const subLineOptions = {
    Life: [
      { value: 'Term', label: 'Term' },
      { value: 'Permanent', label: 'Permanent' }
    ],
    Health: [
      { value: 'Short-Term Disability', label: 'Short-Term Disability' },
      { value: 'Supplemental Health', label: 'Supplemental Health' }
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/submit-lead', formData);
      setSuccess(true);
      
      // Scroll to form with consistent behavior
      const formElement = document.getElementById('lead-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push('/thank-you');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#00ECFF]">Get My Free Quote</h2>
      <form onSubmit={handleSubmit} id="lead-form" className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block font-semibold">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            required
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block font-semibold">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            required
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-semibold">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            placeholder="(555) 555-5555"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Insurance Type */}
        <div>
          <label htmlFor="insuranceType" className="block font-semibold">
            Insurance Type <span className="text-red-500">*</span>
          </label>
          <select
            id="insuranceType"
            name="insuranceType"
            required
            value={formData.insuranceType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select insurance type</option>
            {insuranceTypeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Line */}
        {formData.insuranceType === 'Life' || formData.insuranceType === 'Health' ? (
          <div>
            <label htmlFor="subLine" className="block font-semibold">
              Sub Type (Optional)
            </label>
            <select
              id="subLine"
              name="subLine"
              value={formData.subLine}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select sub type</option>
              {subLineOptions[formData.insuranceType as keyof typeof subLineOptions]?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {/* Zip Code */}
        <div>
          <label htmlFor="zipCode" className="block font-semibold">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            id="zipCode"
            type="text"
            name="zipCode"
            required
            placeholder="Enter your ZIP code"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* How Did You Hear About Us */}
        <div>
          <label htmlFor="heardAboutUs" className="block font-semibold">
            How Did You Hear About Us? (Optional)
          </label>
          <select
            id="heardAboutUs"
            name="heardAboutUs"
            value={formData.heardAboutUs}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select an option</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block font-semibold">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any specific requirements or questions?"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 p-3 bg-red-50 rounded">{error}</p>}
        
        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-50 text-green-800 rounded">
            Thank you! We'll be in touch shortly with your personalized quotes.
          </div>
        )}

        {/* Privacy Message */}
        <p className="text-sm text-gray-600 text-center">
          Your information is secure. We never share your data without permission.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00ECFF] text-white font-semibold py-2 px-4 rounded hover:bg-[#00d6e8] disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Get My Free Quote'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm; 