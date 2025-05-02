export type TrustSignalType = 
  | 'social_proof' 
  | 'security' 
  | 'expertise'
  | 'transparency'
  | 'social_media'
  | 'customer_review'
  | 'industry_certification'
  | 'partnership';

export interface TrustSignal {
  id: string;
  type: TrustSignalType;
  weight: number; // 0-1 scale
  source: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface TrustScore {
  overall: number; // 0-100
  components: {
    socialProof: number;
    security: number;
    expertise: number;
    transparency: number;
  };
  lastUpdated: Date;
}

export interface TrustContext {
  signals: TrustSignal[];
  score: TrustScore;
  userTrustLevel: number; // 0-1 scale
  lastInteraction: Date;
}

export interface TrustConfig {
  weights: {
    [K in TrustSignalType]: number;
  };
  thresholds: {
    highTrust: number;
    mediumTrust: number;
    lowTrust: number;
  };
  refreshInterval: number; // in milliseconds
}

// Trust-building actions that can be taken
export interface TrustAction {
  type: 'display' | 'collect' | 'verify' | 'enhance';
  component: string;
  priority: 'high' | 'medium' | 'low';
  impact: number; // 0-1 scale
  description: string;
} 