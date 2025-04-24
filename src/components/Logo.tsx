'use client';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-brand-primary rounded-full opacity-75 animate-pulse shadow-glow"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          Q
        </div>
      </div>
      {showText && (
        <span className="ml-2 text-brand-primary font-bold">
          QuoteLinker
        </span>
      )}
    </div>
  );
} 