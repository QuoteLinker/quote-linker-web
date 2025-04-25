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