import React, { InputHTMLAttributes, useId } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> & {
  label: string;
  error?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  as = 'input',
  type = 'text',
  options,
  name,
  className,
  ...props
}) => {
  const id = useId();

  const commonProps = {
    id,
    name,
    placeholder: ' ', // The space is crucial for the floating label to work correctly
    className: `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer ${
      error ? 'border-red-500 focus:border-red-600' : ''
    } ${className || ''}`,
    ...props,
  };

  return (
    <div className="relative z-0 mb-6 w-full group">
      <div className="relative">
        {as === 'select' ? (
          <select {...commonProps}>
            <option value=""></option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : as === 'textarea' ? (
          <textarea {...commonProps} />
        ) : (
          <input type={type} {...commonProps} />
        )}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
        <label
          htmlFor={id}
          className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
            error ? 'text-red-600 peer-focus:text-red-600' : ''
          }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;