'use client';

import React from 'react';
import { TrustProvider } from './trust/TrustProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TrustProvider>
      {children}
    </TrustProvider>
  );
}
