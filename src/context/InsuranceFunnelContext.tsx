'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, InsuranceType } from '@/types/insurance';

type InsuranceFunnelContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
};

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zip: '',
  additionalInfo: '',
};

const InsuranceFunnelContext = createContext<InsuranceFunnelContextType | undefined>(undefined);

export const useInsuranceFunnel = () => {
  const context = useContext(InsuranceFunnelContext);
  if (context === undefined) {
    throw new Error('useInsuranceFunnel must be used within an InsuranceFunnelProvider');
  }
  return context;
};

interface InsuranceFunnelProviderProps {
  children: ReactNode;
  insuranceType?: InsuranceType;
  steps?: number;
}

export const InsuranceFunnelProvider: React.FC<InsuranceFunnelProviderProps> = ({ 
  children, 
  insuranceType, 
  steps = 5 
}) => {
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
    insuranceType: insuranceType,
  });
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const resetForm = () => {
    setFormData({
      ...defaultFormData,
      insuranceType: insuranceType,
    });
    setCurrentStep(1);
  };

  return (
    <InsuranceFunnelContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        totalSteps: steps,
        setCurrentStep,
        resetForm,
      }}
    >
      {children}
    </InsuranceFunnelContext.Provider>
  );
};
