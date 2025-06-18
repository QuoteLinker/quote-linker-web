'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import FieldWithTooltip from '@/components/FieldWithTooltip'; 
import Link from 'next/link';

// Define schema for validation including the consent checkbox
const leadSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "A valid phone number is required.").regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid phone number format."),
  zip: z.string().regex(/^\d{5}$/, "A valid 5-digit ZIP code is required."),
  insuranceTypes: z.array(z.string()).min(1, "Please select at least one insurance type."),
  additionalInfo: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted." }),
  }),
});

type FormState = Omit<z.infer<typeof leadSchema>, 'consent'> & { consent: boolean };
type FormErrors = z.ZodError<FormState>['formErrors']['fieldErrors'];

const insuranceOptions = ['Auto', 'Home', 'Life', 'Health']; // Simplified options

interface QuoteFormProps {
  productType?: string;
}

const QuoteFormComponent: React.FC<QuoteFormProps> = ({ productType }) => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    insuranceTypes: [],
    additionalInfo: '',
    consent: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const typeToSet = productType || searchParams.get('type');
    // Ensure typeToSet is one of the simplified options
    if (typeToSet && insuranceOptions.map(o => o.toLowerCase()).includes(typeToSet.toLowerCase())) {
      const formattedType = insuranceOptions.find(opt => opt.toLowerCase() === typeToSet.toLowerCase());
      if (formattedType) {
        setFormData(prev => ({...prev, insuranceTypes: [formattedType]}));
      }
    }
  }, [searchParams, productType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && name === 'consent') {
      setFormData(prev => ({ ...prev, consent: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      insuranceTypes: prev.insuranceTypes.includes(type)
        ? prev.insuranceTypes.filter(t => t !== type)
        : [...prev.insuranceTypes, type],
    }));
  };

  const validate = () => {
    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    
    setIsLoading(true);
    const toastId = toast.loading('Submitting your information...');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error || 'Submission failed. Please try again.', { id: toastId });
      } else {
        toast.success('Quote request submitted successfully!', { id: toastId });
        // Reset form or redirect user
        setFormData({ 
          firstName: '', lastName: '', email: '', phone: '', zip: '', 
          insuranceTypes: [], additionalInfo: '', consent: false 
        });
      }
    } catch (error) {
      toast.error('An error occurred while submitting your information.');
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('QuoteForm submission error:', error);
      }
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">Get Your Free Quote</h2>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">      <FieldWithTooltip
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName?.[0]}
        tooltip="Please enter your first name."
        required
        className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <FieldWithTooltip
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName?.[0]}
        tooltip="Please enter your last name."
        required
        className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      </div>

      <FieldWithTooltip
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email?.[0]}
        tooltip="We'll use this to send your quote details."
        required
        className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <FieldWithTooltip
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone?.[0]}
          tooltip="A valid phone number where we can reach you."
          required
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FieldWithTooltip
          label="ZIP Code"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          error={errors.zip?.[0]}
          tooltip="Your 5-digit ZIP code helps us find local rates."
          required
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">What type(s) of insurance are you interested in? <span className="text-red-500">*</span></legend>
          <div className="flex flex-wrap gap-4">
            {insuranceOptions.map(type => (
              <div key={type} className="flex items-center">
                <input
                  id={`insurance-${type}`}
                  name="insuranceTypes"
                  type="checkbox"
                  value={type}
                  checked={formData.insuranceTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  aria-invalid={!!errors.insuranceTypes}
                  aria-describedby={errors.insuranceTypes ? "insuranceTypes-error" : undefined}
                  className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor={`insurance-${type}`} className="ml-2 block text-sm text-gray-900">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        {errors.insuranceTypes && (
          <p 
            id="insuranceTypes-error"
            className="mt-2 text-sm text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {errors.insuranceTypes[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
          Additional Information (Optional)
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={3}
          value={formData.additionalInfo}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Any specific needs or questions?"
        />
      </div>

      <div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent" className="text-xs text-gray-600">
              By checking this box and submitting your information, you agree to our <Link href="/terms" className="text-cyan-600 hover:text-cyan-700 underline">Terms of Use</Link> and <Link href="/privacy" className="text-cyan-600 hover:text-cyan-700 underline">Privacy Policy</Link>, and you provide express written consent for QuoteLinker and its <Link href="/partners" className="text-cyan-600 hover:text-cyan-700 underline">partners</Link> to contact you at the number and email address you provided (including through automated means, such as autodialers, pre-recorded messages, and text messages) about insurance products and services, even if your number is on a Do Not Call list. You understand that your consent is not a condition of any purchase. Message and data rates may apply. You may revoke your consent at any time. TCPA Compliance: You agree to receive recurring automated promotional and personalized marketing text messages (e.g., cart reminders) from QuoteLinker at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Message frequency varies. Message and data rates may apply. View Terms & Privacy. <span className="text-red-500">*</span>
            </label>
          </div>
        </div>
        {errors.consent && (
          <p 
            id="consent-error"
            className="mt-2 text-sm text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {errors.consent[0]}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Get My Free Quote'}
        </button>
      </div>
    </form>
  );
};

// Wrap QuoteFormComponent with Suspense for useSearchParams
const QuoteForm: React.FC<QuoteFormProps> = (props) => (
  <Suspense fallback={<div>Loading form...</div>}>
    <QuoteFormComponent {...props} />
  </Suspense>
);

export default QuoteForm;