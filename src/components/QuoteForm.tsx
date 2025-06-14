'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import FieldWithTooltip from '@/components/FieldWithTooltip'; 

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

const insuranceOptions = ['Auto', 'Home', 'Life', 'Health'];

const QuoteFormComponent = () => {
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
    const typeFromURL = searchParams.get('type');
    if (typeFromURL && insuranceOptions.map(o => o.toLowerCase()).includes(typeFromURL)) {
      setFormData(prev => ({...prev, insuranceTypes: [typeFromURL.charAt(0).toUpperCase() + typeFromURL.slice(1)]}));
    }
  }, [searchParams]);

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
        // Potentially redirect to a thank you page
        // router.push('/thank-you');
        setFormData({ 
          firstName: '', lastName: '', email: '', phone: '', zip: '', 
          insuranceTypes: [], additionalInfo: '', consent: false 
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldWithTooltip 
          label="First Name" 
          tooltip="Your legal first name." 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          error={errors.firstName?.join(', ')} 
          required 
        />
        <FieldWithTooltip 
          label="Last Name" 
          tooltip="Your legal last name." 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          error={errors.lastName?.join(', ')} 
          required 
        />
      </div>

      <FieldWithTooltip 
        label="Email Address" 
        tooltip="We'll use this to send you quote information." 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        error={errors.email?.join(', ')} 
        required 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldWithTooltip 
          label="Phone Number" 
          tooltip="Agents will call this number." 
          name="phone" 
          type="tel" 
          value={formData.phone} 
          onChange={handleChange} 
          error={errors.phone?.join(', ')} 
          required 
        />
        <FieldWithTooltip 
          label="ZIP Code" 
          tooltip="Used to find local agents." 
          name="zip" 
          value={formData.zip} 
          onChange={handleChange} 
          error={errors.zip?.join(', ')} 
          pattern="\d{5}" 
          title="Enter a 5-digit ZIP code" 
          required 
        />
      </div>
      
      <div>
        <label htmlFor="insuranceTypes-label" className="block text-sm font-medium text-gray-700 mb-2">
          What type(s) of insurance are you interested in?<RequiredAsterisk />
        </label>
        <div id="insuranceTypes-label" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {insuranceOptions.map(type => (
            <label key={type} htmlFor={`insurance-${type}`} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-md hover:border-cyan-500 cursor-pointer has-[:checked]:bg-cyan-50 has-[:checked]:border-cyan-600 transition-colors">
              <input
                id={`insurance-${type}`}
                type="checkbox"
                name="insuranceTypes"
                value={type}
                checked={formData.insuranceTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
                className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
              />
              <span className="text-sm font-medium text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        {errors.insuranceTypes && <p className="text-red-500 text-sm mt-1">{errors.insuranceTypes.join(', ')}</p>}
      </div>

      <div> {/* Changed FieldWithTooltip to a simple div with label and textarea */}
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information (Optional)</label>
        <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} className="form-textarea w-full mt-1 block rounded-lg border-gray-300 shadow-sm sm:text-sm transition-colors"></textarea>
      </div>

      <div className="space-y-2">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              className={`h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 ${errors.consent ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent" className="font-medium text-gray-700">
              TCPA Consent <RequiredAsterisk />
            </label>
            <p className="text-gray-500 text-xs">
              By checking this box, you consent to QuoteLinker and its network of insurance partners contacting you about insurance quotes via call, text, or email, including automated means, at the number and email you provided. Consent is not a condition of purchase.
            </p>
          </div>
        </div>
        {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent.join(', ')}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Submitting...' : 'Get My Free Quotes'}
      </button>
    </form>
  );
};

// Wrap the component with Suspense for useSearchParams
export default function QuoteForm() {
  return (
    <Suspense fallback={<div>Loading form preferences...</div>}>
      <QuoteFormComponent />
    </Suspense>
  );
}