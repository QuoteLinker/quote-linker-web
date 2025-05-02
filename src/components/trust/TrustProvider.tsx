'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TrustContext, TrustSignal, TrustScore, TrustConfig, TrustAction } from '@/types/trust';

const defaultConfig: TrustConfig = {
  weights: {
    social_proof: 0.3,
    security: 0.25,
    expertise: 0.25,
    transparency: 0.2,
    social_media: 0.15,
    customer_review: 0.2,
    industry_certification: 0.25,
    partnership: 0.15,
  },
  thresholds: {
    highTrust: 80,
    mediumTrust: 60,
    lowTrust: 40,
  },
  refreshInterval: 300000, // 5 minutes
};

const defaultContext: TrustContext = {
  signals: [],
  score: {
    overall: 0,
    components: {
      socialProof: 0,
      security: 0,
      expertise: 0,
      transparency: 0,
    },
    lastUpdated: new Date(),
  },
  userTrustLevel: 0,
  lastInteraction: new Date(),
};

interface TrustProviderProps {
  children: React.ReactNode;
  config?: Partial<TrustConfig>;
}

interface TrustContextType extends TrustContext {
  addSignal: (signal: TrustSignal) => void;
  getTrustActions: () => TrustAction[];
  updateUserTrustLevel: (level: number) => void;
  getTrustScore: () => TrustScore;
}

const TrustContext = createContext<TrustContextType>({
  ...defaultContext,
  addSignal: () => {},
  getTrustActions: () => [],
  updateUserTrustLevel: () => {},
  getTrustScore: () => defaultContext.score,
});

export const TrustProvider: React.FC<TrustProviderProps> = ({ 
  children, 
  config: userConfig 
}) => {
  const [context, setContext] = useState<TrustContext>(defaultContext);
  const [config] = useState<TrustConfig>({
    ...defaultConfig,
    ...userConfig,
  });

  const calculateTrustScore = (signals: TrustSignal[]): TrustScore => {
    const components = {
      socialProof: 0,
      security: 0,
      expertise: 0,
      transparency: 0,
    };

    signals.forEach(signal => {
      const weight = config.weights[signal.type];
      switch (signal.type) {
        case 'social_proof':
        case 'social_media':
        case 'customer_review':
          components.socialProof += signal.weight * weight;
          break;
        case 'security':
          components.security += signal.weight * weight;
          break;
        case 'expertise':
        case 'industry_certification':
          components.expertise += signal.weight * weight;
          break;
        case 'transparency':
        case 'partnership':
          components.transparency += signal.weight * weight;
          break;
      }
    });

    const overall = Object.values(components).reduce((sum, score) => sum + score, 0) * 100;

    return {
      overall,
      components,
      lastUpdated: new Date(),
    };
  };

  const addSignal = (signal: TrustSignal) => {
    setContext(prev => {
      const newSignals = [...prev.signals, signal];
      return {
        ...prev,
        signals: newSignals,
        score: calculateTrustScore(newSignals),
      };
    });
  };

  const updateUserTrustLevel = (level: number) => {
    setContext(prev => ({
      ...prev,
      userTrustLevel: Math.max(0, Math.min(1, level)),
      lastInteraction: new Date(),
    }));
  };

  const getTrustActions = (): TrustAction[] => {
    const { score, userTrustLevel } = context;
    const actions: TrustAction[] = [];

    if (score.components.socialProof < 0.7) {
      actions.push({
        type: 'display',
        component: 'SocialProof',
        priority: 'high',
        impact: 0.8,
        description: 'Display more social proof to increase trust',
      });
    }

    if (score.components.security < 0.8) {
      actions.push({
        type: 'enhance',
        component: 'SecurityBadge',
        priority: 'high',
        impact: 0.9,
        description: 'Enhance security indicators',
      });
    }

    if (userTrustLevel < 0.5) {
      actions.push({
        type: 'collect',
        component: 'TrustForm',
        priority: 'medium',
        impact: 0.6,
        description: 'Collect more user information to build trust',
      });
    }

    return actions;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setContext(prev => ({
        ...prev,
        score: calculateTrustScore(prev.signals),
      }));
    }, config.refreshInterval);

    return () => clearInterval(interval);
  }, [config.refreshInterval]);

  return (
    <TrustContext.Provider
      value={{
        ...context,
        addSignal,
        getTrustActions,
        updateUserTrustLevel,
        getTrustScore: () => context.score,
      }}
    >
      {children}
    </TrustContext.Provider>
  );
};

export const useTrust = () => useContext(TrustContext); 