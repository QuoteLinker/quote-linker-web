'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stepper } from '@/components/ui/stepper';
import { useInsurance } from '@/context/InsuranceContext';

// Form steps for Life Insurance
const lifeInsuranceSteps = [
  { id: 'step-1', label: 'About You' },
  { id: 'step-2', label: 'Health Profile' },
  { id: 'step-3', label: 'Coverage Needs' },
  { id: 'step-4', label: 'Summary' },
  { id: 'step-5', label: 'Contact Info' },
];

type FormStepProps = {
  onNext: () => void;
  onBack?: () => void;
};

// Age step component
function AgeStep({ onNext }: FormStepProps) {
  const { formData, updateLifeInsuranceData } = useInsurance();
  const [age, setAge] = useState(formData.lifeInsurance?.age || '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!age) {
      setError('Please select your age range');
      return;
    }
    updateLifeInsuranceData({ age });
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">How old are you?</h2>
      <p className="text-gray-600 text-center mb-6">This helps us find the right coverage options for you</p>
      
      <div className="grid grid-cols-2 gap-3">
        {['18-29', '30-39', '40-49', '50-59', '60-69', '70+'].map((ageRange) => (
          <button
            key={ageRange}
            type="button"
            className={`p-4 border rounded-lg text-center transition-all ${
              age === ageRange 
                ? 'border-primary-600 bg-primary-50 text-primary-700' 
                : 'border-gray-300 hover:border-primary-300'
            }`}
            onClick={() => {
              setAge(ageRange);
              setError('');
            }}
          >
            {ageRange}
          </button>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <div className="flex justify-center mt-8">
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Health Profile Step
function HealthStep({ onNext, onBack }: FormStepProps) {
  const { formData, updateLifeInsuranceData } = useInsurance();
  const [tobacco, setTobacco] = useState<'yes' | 'no' | undefined>(formData.lifeInsurance?.tobaccoUse);
  const [health, setHealth] = useState<'excellent' | 'good' | 'fair' | 'poor' | undefined>(
    formData.lifeInsurance?.healthStatus
  );
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (tobacco === undefined) {
      setError('Please indicate tobacco use');
      return;
    }
    if (health === undefined) {
      setError('Please select your health status');
      return;
    }
    
    updateLifeInsuranceData({ 
      tobaccoUse: tobacco,
      healthStatus: health 
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Tell us about your health</h2>
      
      <div className="space-y-4">
        <label className="block text-lg font-medium">Do you use tobacco products?</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={`p-4 border rounded-lg text-center transition-all ${
                tobacco === option.value 
                  ? 'border-primary-600 bg-primary-50 text-primary-700' 
                  : 'border-gray-300 hover:border-primary-300'
              }`}
              onClick={() => {
                setTobacco(option.value as 'yes' | 'no');
                setError('');
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="block text-lg font-medium">How would you describe your overall health?</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={`p-4 border rounded-lg text-center transition-all ${
                health === option.value 
                  ? 'border-primary-600 bg-primary-50 text-primary-700' 
                  : 'border-gray-300 hover:border-primary-300'
              }`}
              onClick={() => {
                setHealth(option.value as 'excellent' | 'good' | 'fair' | 'poor');
                setError('');
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Coverage Needs Step
function CoverageStep({ onNext, onBack }: FormStepProps) {
  const { formData, updateLifeInsuranceData } = useInsurance();
  const [coverage, setCoverage] = useState(formData.lifeInsurance?.coverageAmount || '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!coverage) {
      setError('Please select a coverage amount');
      return;
    }
    
    updateLifeInsuranceData({ coverageAmount: coverage });
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">How much coverage do you need?</h2>
      <p className="text-gray-600 text-center mb-6">Select the amount that best fits your needs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {['$100,000', '$250,000', '$500,000', '$750,000', '$1,000,000', '$2,000,000+'].map((amount) => (
          <button
            key={amount}
            type="button"
            className={`p-4 border rounded-lg text-center transition-all ${
              coverage === amount 
                ? 'border-primary-600 bg-primary-50 text-primary-700' 
                : 'border-gray-300 hover:border-primary-300'
            }`}
            onClick={() => {
              setCoverage(amount);
              setError('');
            }}
          >
            {amount}
          </button>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Summary Step
function SummaryStep({ onNext, onBack }: FormStepProps) {
  const { formData } = useInsurance();
  const lifeData = formData.lifeInsurance;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Quote Summary</h2>
      <p className="text-gray-600 text-center mb-6">Review your information before continuing</p>
      
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Age Range</h3>
            <p className="font-medium">{lifeData?.age || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Tobacco Use</h3>
            <p className="font-medium capitalize">{lifeData?.tobaccoUse || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Health Status</h3>
            <p className="font-medium capitalize">{lifeData?.healthStatus || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Coverage Amount</h3>
            <p className="font-medium">{lifeData?.coverageAmount || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
        <h3 className="font-medium text-primary-700 mb-2">Ready for your personalized quotes?</h3>
        <p className="text-gray-600">
          Complete the final step to receive quotes from top-rated carriers tailored to your needs.
        </p>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue to Final Step
        </button>
      </div>
    </div>
  );
}

// Contact Info Step
function ContactStep({ onBack }: FormStepProps) {
  const router = useRouter();
  const { formData, updateForm } = useInsurance();
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [zip, setZip] = useState(formData.zip || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!zip) {
      newErrors.zip = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(zip)) {
      newErrors.zip = 'Please enter a valid 5-digit ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Update form data
    updateForm({
      firstName,
      lastName,
      email,
      phone,
      zip
    });
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to success page
      router.push('/thank-you');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Almost Done!</h2>
      <p className="text-gray-600 text-center mb-6">Enter your contact information to receive your personalized quotes</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 555-5555"
              className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code*
            </label>
            <input
              id="zip"
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              maxLength={5}
              className={`w-full p-2 border rounded-lg ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
          </div>
        </div>
        
        <div className="flex items-start mt-4">
          <input
            id="consent"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-500">
            I agree to be contacted by phone, email, or SMS. I understand these messages may be generated using automated technology and my consent is not required as a condition to purchase insurance.*
          </label>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Quotes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function QuoteFormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, lifeInsuranceSteps.length - 1));
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <AgeStep onNext={handleNext} />;
      case 1:
        return <HealthStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <CoverageStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <SummaryStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ContactStep onBack={handleBack} onNext={() => {}} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <Stepper 
          steps={lifeInsuranceSteps} 
          activeStep={activeStep} 
          orientation="horizontal" 
        />
      </div>
      
      {renderStepContent()}
    </div>
  );
}
