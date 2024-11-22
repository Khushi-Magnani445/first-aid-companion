import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ variant = 'default', children, className = '' }) => {
  const variantStyles = {
    default: 'bg-blue-50 border-blue-500 text-blue-800',
    destructive: 'bg-red-50 border-red-500 text-red-800',
    success: 'bg-green-50 border-green-500 text-green-800',
  };

  return (
    <div 
      className={`
        flex items-start p-4 border-l-4 rounded-lg 
        ${variantStyles[variant]} 
        ${className}
      `}
    >
      <AlertCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export const AlertTitle = ({ children, className = '' }) => (
  <h3 className={`font-semibold text-lg mb-1 ${className}`}>
    {children}
  </h3>
);

export const AlertDescription = ({ children, className = '' }) => (
  <p className={`text-sm ${className}`}>
    {children}
  </p>
);