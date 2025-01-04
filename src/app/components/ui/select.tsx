// Composant Select

import React, { forwardRef } from 'react';

// Types
type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean };

// Utilitaire de fusion de classes (version simplifiée de clsx/cn)
const cn = (...inputs: ClassValue[]): string => {
  return inputs.filter(Boolean).join(' ');
};

// Interfaces
interface BaseProps {
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

interface Option {
  value: string | number;
  label: string;
}

interface InputProps extends BaseProps, 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseProps> {
  icon?: React.ReactNode;
}

interface SelectProps extends BaseProps,
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BaseProps> {
  options: Option[];
  placeholder?: string;
}


export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ 
    label,
    error,
    options = [],
    placeholder,
    className = "",
    disabled,
    ...props
  }, ref) => {
    const baseSelectStyles = `
      w-full
      px-4
      py-2
      border
      rounded-lg
      bg-white
      appearance-none
      transition-colors
      duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;
  
    const selectStyles = cn(
      baseSelectStyles,
      error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
      className
    );
  
    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={selectStyles}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
        {error && (
          <p 
            className="text-sm text-red-600"
            id={`${props.id}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  });
  
  Select.displayName = 'Select';