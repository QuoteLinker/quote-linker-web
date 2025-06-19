'use client';

import React from 'react';
import Providers from './Providers';

interface ClientProvidersProps {
  children: React.ReactNode;
}

// This component is just a client boundary wrapper for our providers
export default function ClientProviders({ children }: ClientProvidersProps) {
  return <Providers>{children}</Providers>;
}
