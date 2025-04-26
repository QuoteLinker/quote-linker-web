'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function CalendlyWidget() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget min-w-[320px] h-[700px]"
      data-url={process.env.NEXT_PUBLIC_CALENDLY_URL}
    />
  );
} 