import React from 'react';
import { Popover } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface FieldWithTooltipProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  tooltip: string;
  error?: string;
}

export default function FieldWithTooltip({
  label,
  tooltip,
  error,
  id,
  name,
  required,
  className = '',
  ...props
}: FieldWithTooltipProps) {
  const inputId = id || name;
  const tooltipId = `${inputId}-tooltip`;

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD] rounded-full"
                aria-describedby={tooltipId}
              >
                <InformationCircleIcon
                  className={`h-5 w-5 text-gray-400 hover:text-gray-500 transition-colors ${
                    open ? 'text-[#00EEFD]' : ''
                  }`}
                />
              </Popover.Button>
              <Popover.Panel
                id={tooltipId}
                role="tooltip"
                className="absolute z-10 w-72 px-4 mt-3 transform -translate-x-1/2 left-1/2"
              >
                <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg">
                  {tooltip}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
      <input
        id={inputId}
        name={name}
        required={required}
        aria-describedby={tooltipId}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 