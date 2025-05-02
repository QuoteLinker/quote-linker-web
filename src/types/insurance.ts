export type InsuranceType = 
  | 'AUTO' 
  | 'HOME' 
  | 'LIFE' 
  | 'HEALTH'
  | 'LIFE_TERM'
  | 'LIFE_PERMANENT'
  | 'HEALTH_SHORT_TERM_DISABILITY'
  | 'HEALTH_SUPPLEMENTAL'
  | 'DISABILITY';

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
  website?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export const FIELD_CONFIG: Record<InsuranceType, FormField[]> = {
  LIFE: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'tobaccoUse'],
  DISABILITY: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'employmentStatus'],
  HOME: ['firstName', 'lastName', 'email', 'phone', 'zip', 'streetAddress'],
  AUTO: ['firstName', 'lastName', 'email', 'phone', 'zip', 'vehicleUse'],
  HEALTH: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age'],
  LIFE_TERM: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'tobaccoUse'],
  LIFE_PERMANENT: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'tobaccoUse'],
  HEALTH_SHORT_TERM_DISABILITY: ['firstName', 'lastName', 'email', 'phone', 'zip', 'age', 'employmentStatus'],
  HEALTH_SUPPLEMENTAL: ['firstName', 'lastName', 'email', 'phone', 'zip', 'currentCoverage'],
}; 