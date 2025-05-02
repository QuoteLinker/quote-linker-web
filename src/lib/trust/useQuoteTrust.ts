import { useTrust } from '@/components/trust/TrustProvider';
import { TrustSignal } from '@/types/trust';
import { useEffect } from 'react';

interface QuoteTrustOptions {
  formId: string;
  productType: string;
  initialTrustLevel?: number;
}

export const useQuoteTrust = ({
  formId,
  productType,
  initialTrustLevel = 0.3,
}: QuoteTrustOptions) => {
  const { addSignal, updateUserTrustLevel } = useTrust();

  // Add initial trust signals based on product type
  useEffect(() => {
    const initialSignals: TrustSignal[] = [
      {
        id: `${formId}-security`,
        type: 'security',
        weight: 0.9,
        source: 'system',
        timestamp: new Date(),
        metadata: {
          formId,
          productType,
        },
      },
      {
        id: `${formId}-expertise`,
        type: 'expertise',
        weight: 0.8,
        source: 'system',
        timestamp: new Date(),
        metadata: {
          formId,
          productType,
        },
      },
    ];

    initialSignals.forEach(signal => addSignal(signal));
    updateUserTrustLevel(initialTrustLevel);
  }, [formId, productType, addSignal, updateUserTrustLevel]);

  const addFormInteractionSignal = (interactionType: string, weight: number) => {
    const signal: TrustSignal = {
      id: `${formId}-${interactionType}-${Date.now()}`,
      type: 'transparency',
      weight,
      source: 'user',
      timestamp: new Date(),
      metadata: {
        formId,
        productType,
        interactionType,
      },
    };

    addSignal(signal);
  };

  const addSocialProofSignal = (source: string, weight: number) => {
    const signal: TrustSignal = {
      id: `${formId}-social-${Date.now()}`,
      type: 'social_proof',
      weight,
      source,
      timestamp: new Date(),
      metadata: {
        formId,
        productType,
        source,
      },
    };

    addSignal(signal);
  };

  return {
    addFormInteractionSignal,
    addSocialProofSignal,
  };
}; 