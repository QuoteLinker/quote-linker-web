import Link from 'next/link';

interface StickyCTAProps {
  insuranceType: string;
}

export default function StickyCTA({ insuranceType }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-lg">
      <Link
        href="#quote-form"
        className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Get My Free {insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} Quote
      </Link>
    </div>
  );
} 