'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import FormField from '@/components/FormField'; // Import the new FormField
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName?.[0]}
          required
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName?.[0]}
          required
        />
      </div>
      <FormField
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email?.[0]}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone?.[0]}
          required
        />
        <FormField
          label="ZIP Code"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          error={errors.zip?.[0]}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Types</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insuranceOptions.map(type => (
            <div key={type} className="flex items-center">
              <input
                id={`insurance-${type}`}
                name="insuranceTypes"
                type="checkbox"
                value={type}
                checked={formData.insuranceTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
              />
              <label htmlFor={`insurance-${type}`} className="ml-3 block text-sm text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
        {errors.insuranceTypes && <p className="mt-2 text-xs text-red-500">{errors.insuranceTypes[0]}</p>}
      </div>

      <FormField
        as="textarea"
        label="Additional Information (Optional)"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        error={errors.additionalInfo?.[0]}
        className="min-h-[100px]"
      />

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={handleChange}
            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="consent" className="font-medium text-gray-700">
            Consent to be contacted
          </label>
          <p className="text-gray-500">
            By checking this box, you consent to be contacted by our agents via phone, text, or email. You can opt out at any time. For more details, please review our{' '}
            <Link href="/privacy-policy" className="text-cyan-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      {errors.consent && <p className="mt-2 text-xs text-red-500">{errors.consent[0]}</p>}


      <button 
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Submitting...' : 'Get My Free Quote'}
      </button>
    </form>
  );
};

const QuoteForm: React.FC<QuoteFormProps> = (props) => (
  <Suspense fallback={<div>Loading form...</div>}>
    <QuoteFormComponent {...props} />
  </Suspense>
);

export default QuoteForm;