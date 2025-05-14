'use client';
import { TrustIndicator } from '@/components/trust/TrustIndicator';
import InsuranceTip from '@/components/InsuranceTip';
import QuoteForm from '@/components/QuoteForm';
import TestimonialCard from '@/components/TestimonialCard';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Trust + Testimonial */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <TrustIndicator showDetails className="mb-2" />
          <div className="text-sm text-gray-500 text-center md:text-left">Trusted by 10,000+ users</div>
          <InsuranceTip productType="auto" />
          <TestimonialCard text="“Saved $412/year!” — Jane D." />
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">📈 150 quotes requested today</span>
          </div>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
} 