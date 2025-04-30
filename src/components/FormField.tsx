import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  tooltip?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  tooltip,
  options,
  min,
  max,
  step,
  className = '',
  id,
}: FormFieldProps) {
  const inputId = id || name;
  const tooltipId = `${inputId}-tooltip`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value as string}
            onChange={onChange}
            required={required}
            aria-describedby={tooltip ? tooltipId : undefined}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value as string}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            aria-describedby={tooltip ? tooltipId : undefined}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            rows={4}
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              id={inputId}
              name={name}
              type="checkbox"
              checked={value as boolean}
              onChange={onChange}
              required={required}
              aria-describedby={tooltip ? tooltipId : undefined}
              className={`h-4 w-4 text-[#00EEFD] focus:ring-[#00EEFD] border-gray-300 rounded ${
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
              } ${className}`}
            />
            <label htmlFor={inputId} className="ml-2 block text-sm text-gray-700">
              {placeholder || label}
            </label>
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${inputId}-${option.value}`}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  required={required}
                  aria-describedby={tooltip ? tooltipId : undefined}
                  className={`h-4 w-4 text-[#00EEFD] focus:ring-[#00EEFD] border-gray-300 ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  } ${className}`}
                />
                <label htmlFor={`${inputId}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            id={inputId}
            name={name}
            type={type}
            value={value as string | number}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            aria-describedby={tooltip ? tooltipId : undefined}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#00EEFD] focus:ring-[#00EEFD] sm:text-sm transition-colors ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
          />
        );
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {tooltip && (
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
        )}
      </div>
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 