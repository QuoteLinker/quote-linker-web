'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
}

export default function Logo({ className = '', showText = true, iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/quotelinker_logo.png" alt="QuoteLinker" width={150} height={40} className="object-contain" />
    </div>
  );
}