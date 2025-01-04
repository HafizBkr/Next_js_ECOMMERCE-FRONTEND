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

// Composant Input
export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label,
  error,
  icon,
  className = "",
  type = "text",
  disabled,
  ...props
}, ref) => {
  const baseInputStyles = `
    w-full 
    px-4 
    py-2 
    border 
    rounded-lg 
    bg-white
    transition-colors
    duration-200
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const inputStyles = cn(
    baseInputStyles,
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
    icon ? 'pl-10' : '',
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
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputStyles}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
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

Input.displayName = 'Input';