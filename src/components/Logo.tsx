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
        <img src="/ql.png" alt="QuoteLinker" className="w-full h-full object-contain" />
      </div>
      {!iconOnly && showText && (
        <span className="ml-2 text-[#00e8ff] font-bold text-xl tracking-tight hover:text-[#00cce6] transition-colors">
          QuoteLinker
        </span>
      )}
    </div>
  );
} 