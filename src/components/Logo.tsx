'use client';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-[#00F6FF] rounded-full opacity-90 shadow-[0_4px_16px_rgba(0,246,255,0.25)]"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[#0A0A0A] font-bold text-xl">
          Q
        </div>
      </div>
      {showText && (
        <span className="ml-2 text-[#00F6FF] font-bold tracking-tight hover:text-[#4DF9FF] transition-colors">
          QuoteLinker
        </span>
      )}
    </div>
  );
} 