export type InsuranceType = 'life' | 'disability' | 'home' | 'auto' | 'health';

export type FormField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'zip'
  | 'age'
  | 'tobaccoUse'
  | 'employmentStatus'
  | 'streetAddress'
  | 'vehicleUse'
  | 'additionalInfo'
  | 'coverageAmount'
  | 'propertyType'
  | 'propertyValue'
  | 'coverageType'
  | 'monthlyIncome'
  | 'occupation'
  | 'currentCoverage';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  insuranceType?: InsuranceType;
  age?: string;
  tobaccoUse?: 'yes' | 'no';
  employmentStatus?: 'employed' | 'self-employed' | 'unemployed';
  streetAddress?: string;
  vehicleUse?: 'personal' | 'business' | 'both';
  additionalInfo?: string;
  coverageAmount?: string;
  propertyType?: string;
  propertyValue?: string;
  coverageType?: string;
  monthlyIncome?: string;
  occupation?: string;
  currentCoverage?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export const FIELD_CONFIG: Record<InsuranceType, FormField[]> = {
  life: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'tobaccoUse'],
  disability: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'employmentStatus'],
  home: ['firstName', 'lastName', 'email', 'phone', 'zip', 'streetAddress'],
  auto: ['firstName', 'lastName', 'email', 'phone', 'zip', 'vehicleUse'],
  health: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age'],
}; 