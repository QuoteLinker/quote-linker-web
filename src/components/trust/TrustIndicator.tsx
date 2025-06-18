import React from 'react';
import { useTrust } from './TrustProvider';
import { ShieldCheckIcon, UserGroupIcon, LightBulbIcon, EyeIcon } from '@heroicons/react/24/outline';

interface TrustIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export const TrustIndicator: React.FC<TrustIndicatorProps> = ({ 
  className = '',
  showDetails = false 
}) => {
  const { score } = useTrust();
  
  const getTrustLevel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const trustLevel = getTrustLevel(score.overall);
  const trustColor = {
    High: 'text-green-600',
    Medium: 'text-yellow-600',
    Low: 'text-red-600',
  }[trustLevel];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Trust Score</h3>
        <div className={`text-2xl font-bold ${trustColor}`}>
          {Math.round(score.overall)}%
        </div>
      </div>

      {showDetails && (
        <div className="space-y-3">
          <div className="flex items-center">
            <UserGroupIcon className="h-5 w-5 text-blue-500 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Social Proof</span>
                <span className="font-medium">{Math.round(score.components.socialProof * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${score.components.socialProof * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Security</span>
                <span className="font-medium">{Math.round(score.components.security * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${score.components.security * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <LightBulbIcon className="h-5 w-5 text-purple-500 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expertise</span>
                <span className="font-medium">{Math.round(score.components.expertise * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${score.components.expertise * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <EyeIcon className="h-5 w-5 text-orange-500 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transparency</span>
                <span className="font-medium">{Math.round(score.components.transparency * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${score.components.transparency * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Last updated: {new Date(score.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );
};