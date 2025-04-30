export interface ValidationError {
  field: string;
  message: string;
}

export function validatePhone(phone: string): string | null {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
  return null;
}

export function validateZip(zip: string): string | null {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  if (!zip) return 'ZIP code is required';
  if (!zipRegex.test(zip)) return 'Please enter a valid ZIP code';
  return null;
}

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
}

export function validateName(name: string): string | null {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  if (name.length > 50) return 'Name must be less than 50 characters long';
  if (!/^[a-zA-Z\s-']+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message) return 'Message is required';
  if (message.length < 10) return 'Message must be at least 10 characters';
  return null;
}

export const validateAge = (age: number | undefined): string | null => {
  if (age === undefined || age === null) return 'Age is required';
  if (age < 18) return 'You must be at least 18 years old';
  if (age > 120) return 'Please enter a valid age';
  return null;
};

export const validateCoverageAmount = (amount: number | undefined): string | null => {
  if (amount === undefined || amount === null) return 'Coverage amount is required';
  if (amount < 10000) return 'Minimum coverage amount is $10,000';
  if (amount > 10000000) return 'Maximum coverage amount is $10,000,000';
  return null;
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateBenefitAmount = (amount: string): string | null => {
  if (!amount) return 'Benefit amount is required';
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return 'Please enter a valid number';
  
  if (numAmount < 300) return 'Minimum benefit amount is $300/month';
  if (numAmount > 3000) return 'Maximum benefit amount is $3,000/month';
  
  return null;
};

export const validateSelect = (value: string, fieldName: string): string | null => {
  if (!value) return `${fieldName} is required`;
  return null;
};

export const validateNumber = (
  value: number | undefined,
  fieldName: string,
  min?: number,
  max?: number
): string | null => {
  const requiredError = validateRequired(value, fieldName);
  if (requiredError) return requiredError;
  
  if (min !== undefined && value! < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (max !== undefined && value! > max) {
    return `${fieldName} must be less than ${max}`;
  }
  
  return null;
}; 