import React from 'react';
import { Tooltip } from './Tooltip';

interface FieldWithTooltipProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; // Overlaps with InputHTMLAttributes, which is fine
  tooltip: string;
  value: string | number; // Overlaps with InputHTMLAttributes
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Overlaps with InputHTMLAttributes
  error?: string;
  // `required` is inherited from InputHTMLAttributes
  // `className` is inherited from HTMLAttributes (via InputHTMLAttributes)
  // Other attributes like `pattern`, `type`, `placeholder` are inherited.
}

export default function FieldWithTooltip(allProps: FieldWithTooltipProps) {
  const {
    label,
    name,
    tooltip,
    value,
    onChange,
    error,
    required, // Destructure for specific use (asterisk, pass to input)
    className, // Destructure for specific use in className string concatenation
    ...restInputProps // Collect all other props (including pattern, type, placeholder, etc.)
  } = allProps;

  return (
    <div>
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Tooltip content={tooltip} />
      </div>
      <input
        id={name} // Use destructured name
        name={name} // Use destructured name
        value={value} // Use destructured value
        onChange={onChange} // Use destructured onChange
        required={required} // Pass destructured required to the input element
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm sm:text-sm transition-colors ${
          error ? 'border-red-500' : ''
        } ${className || ''}`} // Use destructured className, append if provided
        {...restInputProps} // Spread the remaining input props (e.g., pattern, type, placeholder)
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
