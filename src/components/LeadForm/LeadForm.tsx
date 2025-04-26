'use client';

import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/submit-lead', formData);
      router.push('/thank-you');
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block font-semibold">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Insurance Type */}
        <div>
          <label className="block font-semibold">
            Insurance Type <span className="text-red-500">*</span>
          </label>
          <select
            name="insuranceType"
            required
            value={formData.insuranceType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
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
            <label className="block font-semibold">
              Sub Type (Optional)
            </label>
            <select
              name="subLine"
              value={formData.subLine}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
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
          <label className="block font-semibold">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="zipCode"
            required
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* How Did You Hear About Us */}
        <div>
          <label className="block font-semibold">
            How Did You Hear About Us? (Optional)
          </label>
          <select
            name="heardAboutUs"
            value={formData.heardAboutUs}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block font-semibold">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00ECFF] text-white font-semibold py-2 px-4 rounded hover:bg-[#00d6e8]"
        >
          {loading ? 'Submitting...' : 'Get My Free Quote'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm; 