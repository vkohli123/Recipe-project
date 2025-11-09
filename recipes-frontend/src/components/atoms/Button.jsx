import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium focus:outline-none';
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow',
    ghost: 'bg-transparent text-gray-700',
    neutral: 'bg-gray-200 text-gray-800',
    success: 'bg-green-500 text-white',
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
