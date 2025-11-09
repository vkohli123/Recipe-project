import React from 'react';

export default function Badge({ children, tone = 'info', className = '' }) {
  const tones = {
      info: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      neutral: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${tones[tone] || tones.info} ${className}`}>
      {children}
    </span>
  );
}
