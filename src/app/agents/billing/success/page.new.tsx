'use client';

import { Suspense } from 'react';
import SubscriptionSuccessContent from './SubscriptionSuccessContent';

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SubscriptionSuccessContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Loading subscription details...</h2>
    </div>
  );
}
