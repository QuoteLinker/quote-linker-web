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
  if (name.length < 2) return 'Name must be at least 2 characters';
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message) return 'Message is required';
  if (message.length < 10) return 'Message must be at least 10 characters';
  return null;
}

export const validateAge = (age: string | number | undefined): string | undefined => {
  if (!age) return 'Age is required';
  const numAge = Number(age);
  if (isNaN(numAge)) return 'Age must be a number';
  if (numAge < 18) return 'You must be at least 18 years old';
  if (numAge > 120) return 'Please enter a valid age';
  return undefined;
};

export const validateCoverageAmount = (amount: string | number | undefined): string | undefined => {
  if (!amount) return 'Coverage amount is required';
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return 'Coverage amount must be a number';
  if (numAmount < 0) return 'Coverage amount cannot be negative';
  if (numAmount % 1000 !== 0) return 'Coverage amount must be in increments of $1,000';
  return undefined;
}; 