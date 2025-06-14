'use client';

import { useEffect, useState } from 'react';
import { insuranceTips } from '@/data/insuranceTips';
import { Lightbulb } from 'lucide-react';

interface InsuranceTipProps {
  productType: string;
}

export default function InsuranceTip({ productType }: InsuranceTipProps) {
  const [currentTip, setCurrentTip] = useState<{ text: string; source: string } | null>(null);

  useEffect(() => {
    if (!productType || !insuranceTips[productType]) return;

    const tips = insuranceTips[productType];
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  }, [productType]);

  if (!currentTip) return null;

  return (
    <div className="bg-[#FFF3CD] border border-[#FFEEBA] rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-[#856404] mt-1" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#856404] mb-1">Insurance Insight</h4>
          <p className="text-[#856404] mb-1">{currentTip.text}</p>
          <p className="text-xs text-[#856404] opacity-75">Source: {currentTip.source}</p>
        </div>
      </div>
    </div>
  );
}
