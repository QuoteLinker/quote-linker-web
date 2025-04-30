import React, { useState } from 'react';
import { validateName, validateEmail, validatePhone, validateZip, validateAge, validateCoverageAmount, validateSelect } from '../../utils/validation';

export interface LifeInsuranceFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: string;
  coverageAmount: string;
  termLength: string;
  healthStatus: string;
}

interface FormErrors {
  [key: string]: string;
}

export const LifeInsuranceForm: React.FC = () => {
  const [formData, setFormData] = useState<LifeInsuranceFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    gender: '',
    coverageAmount: '',
    termLength: '',
    healthStatus: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate required fields
    const firstNameError = validateName(formData.firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const zipError = validateZip(formData.zipCode);
    if (zipError) newErrors.zipCode = zipError;

    // Calculate age from date of birth
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const ageError = validateAge(age);
    if (ageError) newErrors.dateOfBirth = ageError;

    const coverageError = validateCoverageAmount(Number(formData.coverageAmount));
    if (coverageError) newErrors.coverageAmount = coverageError;

    const genderError = validateSelect(formData.gender, 'Gender');
    if (genderError) newErrors.gender = genderError;

    const termLengthError = validateSelect(formData.termLength, 'Term length');
    if (termLengthError) newErrors.termLength = termLengthError;

    const healthStatusError = validateSelect(formData.healthStatus, 'Health status');
    if (healthStatusError) newErrors.healthStatus = healthStatusError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          zipCode: formData.zipCode,
          insuranceType: 'LIFE',
          // Add any additional fields needed for the form
          coverageAmount: formData.coverageAmount,
          termLength: formData.termLength,
          healthStatus: formData.healthStatus,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address,
          city: formData.city,
          state: formData.state,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Your quote request has been submitted successfully! We will contact you shortly.',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          dateOfBirth: '',
          gender: '',
          coverageAmount: '',
          termLength: '',
          healthStatus: '',
        });
      } else {
        throw new Error(data.error || 'Failed to submit quote request');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while submitting your request',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Life Insurance Quote Request</h2>
      
      {submitStatus && (
        <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.zipCode ? 'border-red-500' : ''}`}
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>

        <div>
          <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700">Coverage Amount ($)</label>
          <input
            type="number"
            id="coverageAmount"
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleChange}
            min="10000"
            max="10000000"
            step="1000"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.coverageAmount ? 'border-red-500' : ''}`}
          />
          {errors.coverageAmount && <p className="mt-1 text-sm text-red-600">{errors.coverageAmount}</p>}
        </div>

        <div>
          <label htmlFor="termLength" className="block text-sm font-medium text-gray-700">Term Length</label>
          <select
            id="termLength"
            name="termLength"
            value={formData.termLength}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.termLength ? 'border-red-500' : ''}`}
          >
            <option value="">Select term length</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
          </select>
          {errors.termLength && <p className="mt-1 text-sm text-red-600">{errors.termLength}</p>}
        </div>

        <div>
          <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700">Health Status</label>
          <select
            id="healthStatus"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.healthStatus ? 'border-red-500' : ''}`}
          >
            <option value="">Select health status</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          {errors.healthStatus && <p className="mt-1 text-sm text-red-600">{errors.healthStatus}</p>}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          data-event="life_insurance_quote_submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </button>
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted by a licensed insurance representative. Msg & data rates may apply.
        </p>
      </div>
    </form>
  );
}; 