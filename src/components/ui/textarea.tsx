import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20 focus:ring-opacity-50 transition text-base px-3 py-2 ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea }; 