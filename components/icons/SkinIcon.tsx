import React from 'react';

export const SkinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6.75" />
  </svg>
);