'use client';

interface LogoProps {
  className?: string;
  showText?: boolean;
  iconOnly?: boolean;
}

export default function Logo({ className = '', showText = true, iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#00F6FF"/>
          <path d="M16.9 21.5c1.4 0 2.5833-.3667 3.55-1.1.9667-.7333 1.45-1.8167 1.45-3.25 0-1.4-.4833-2.4667-1.45-3.2-.9667-.7333-2.15-1.1-3.55-1.1h-2.1v-1.7h5.9V9.3h-5.9c-.6667 0-1.2333.2333-1.7.7-.4667.4667-.7 1.0333-.7 1.7v5.8c0 .6667.2333 1.2333.7 1.7.4667.4667 1.0333.7 1.7.7h2.1v1.7h-5.9v1.85h5.9z" fill="#0A0A0A"/>
        </svg>
      </div>
      {!iconOnly && showText && (
        <span className="ml-2 text-brand-primary font-bold text-xl tracking-tight hover:text-brand-primary-dark transition-colors">
          QuoteLinker
        </span>
      )}
    </div>
  );
} 