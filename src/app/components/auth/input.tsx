import React, { ReactNode, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightElement?: ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, rightElement, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
        {...props}
      />
      {rightElement && (
        <div className="absolute right-4 top-3.5">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);
