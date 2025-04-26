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
      <Image src="/ql.png" alt="QuoteLinker" width={32} height={32} className="object-contain" />
      {!iconOnly && showText && (
        <span className="ml-2 text-[#00ECFF] font-bold text-xl tracking-tight hover:text-[#00D4E5] transition-colors">
          QuoteLinker
        </span>
      )}
    </div>
  );
} 