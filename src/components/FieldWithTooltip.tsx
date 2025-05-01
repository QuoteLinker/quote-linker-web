import React from 'react';
import { Tooltip } from './Tooltip';

interface FieldWithTooltipProps {
  label: string;
  name: string;
  tooltip: string;
  required?: boolean;
  type?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  className?: string;
  placeholder?: string;
}

export default function FieldWithTooltip({
  label,
  name,
  tooltip,
  required = false,
  type = 'text',
  min,
  max,
  step,
  value,
  onChange,
  onBlur,
  error,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  className = '',
  placeholder,
}: FieldWithTooltipProps) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Tooltip content={tooltip} />
      </div>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm sm:text-sm transition-colors ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && (
        <div
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600 transition-opacity duration-200 ease-in-out"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
