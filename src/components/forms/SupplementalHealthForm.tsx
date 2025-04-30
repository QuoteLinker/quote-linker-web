import React, { useState } from 'react';
import { validateName, validateEmail, validatePhone, validateSelect } from '../../utils/validation';

export interface SupplementalHealthFormData {
  hasHealthInsurance: string;
  needsHospitalCostCoverage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

export const SupplementalHealthForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SupplementalHealthFormData>({
    hasHealthInsurance: '',
    needsHospitalCostCoverage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    const hasHealthInsuranceError = validateSelect(formData.hasHealthInsurance, 'Health insurance status');
    if (hasHealthInsuranceError) newErrors.hasHealthInsurance = hasHealthInsuranceError;

    const needsHospitalCostCoverageError = validateSelect(formData.needsHospitalCostCoverage, 'Hospital cost coverage');
    if (needsHospitalCostCoverageError) newErrors.needsHospitalCostCoverage = needsHospitalCostCoverageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    const firstNameError = validateName(formData.firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(formData.lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 2 && !validateStep2()) {
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
          zipCode: '00000', // Default value since this form doesn't collect zip
          insuranceType: 'HEALTH',
          // Add any additional fields needed for the form
          hasHealthInsurance: formData.hasHealthInsurance,
          needsHospitalCostCoverage: formData.needsHospitalCostCoverage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Your quote request has been submitted successfully! We will contact you shortly.',
        });
        setFormData({
          hasHealthInsurance: '',
          needsHospitalCostCoverage: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        setCurrentStep(1);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplemental Health Insurance Quote Request</h2>
      
      {submitStatus && (
        <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {submitStatus.message}
        </div>
      )}

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className={`h-2 rounded-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: '48%' }}></div>
          <div className={`h-2 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: '48%' }}></div>
        </div>
        <div className="text-center text-sm text-gray-500">
          Step {currentStep} of 2
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <label htmlFor="hasHealthInsurance" className="block text-sm font-medium text-gray-700">Do you currently have health insurance?</label>
            <select
              id="hasHealthInsurance"
              name="hasHealthInsurance"
              value={formData.hasHealthInsurance}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.hasHealthInsurance ? 'border-red-500' : ''}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.hasHealthInsurance && <p className="mt-1 text-sm text-red-600">{errors.hasHealthInsurance}</p>}
          </div>

          <div>
            <label htmlFor="needsHospitalCostCoverage" className="block text-sm font-medium text-gray-700">Would you like help covering unexpected hospital costs?</label>
            <select
              id="needsHospitalCostCoverage"
              name="needsHospitalCostCoverage"
              value={formData.needsHospitalCostCoverage}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.needsHospitalCostCoverage ? 'border-red-500' : ''}`}
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.needsHospitalCostCoverage && <p className="mt-1 text-sm text-red-600">{errors.needsHospitalCostCoverage}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
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
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              data-event="supplemental_health_quote_submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by a licensed insurance representative. Msg & data rates may apply.
      </div>
    </form>
  );
}; 