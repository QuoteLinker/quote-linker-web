'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define question types for each insurance type
export type LifeInsuranceFormData = {
  age?: string;
  gender?: 'male' | 'female' | 'other';
  tobaccoUse?: 'yes' | 'no';
  healthStatus?: 'excellent' | 'good' | 'fair' | 'poor';
  coverageAmount?: string;
  beneficiaries?: string;
  term?: string; // For term life
  cashValuePreference?: 'high' | 'medium' | 'low'; // For cash-value
  finalExpenseAmount?: string; // For final expense
};

export type InsuranceFormDataType = {
  // Common fields for all insurance types
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  zip?: string;
  
  // Type-specific data
  lifeInsurance?: LifeInsuranceFormData;
};

interface InsuranceContextType {
  formData: InsuranceFormDataType;
  updateForm: (data: Partial<InsuranceFormDataType>) => void;
  updateLifeInsuranceData: (data: Partial<LifeInsuranceFormData>) => void;
  resetForm: () => void;
}

const initialFormData: InsuranceFormDataType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zip: '',
  lifeInsurance: {
    age: '',
    gender: undefined,
    tobaccoUse: undefined,
    healthStatus: undefined,
    coverageAmount: '',
    beneficiaries: '',
    term: '', 
    cashValuePreference: undefined,
    finalExpenseAmount: '',
  },
};

const InsuranceContext = createContext<InsuranceContextType>({
  formData: initialFormData,
  updateForm: () => {},
  updateLifeInsuranceData: () => {},
  resetForm: () => {},
});

export function InsuranceProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<InsuranceFormDataType>(initialFormData);

  const updateForm = (data: Partial<InsuranceFormDataType>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updateLifeInsuranceData = (data: Partial<LifeInsuranceFormData>) => {
    setFormData(prev => ({
      ...prev,
      lifeInsurance: {
        ...prev.lifeInsurance,
        ...data,
      },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <InsuranceContext.Provider value={{ formData, updateForm, updateLifeInsuranceData, resetForm }}>
      {children}
    </InsuranceContext.Provider>
  );
}

export const useInsurance = () => useContext(InsuranceContext);
