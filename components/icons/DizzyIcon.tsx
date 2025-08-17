import React from 'react';

export const DizzyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
  </svg>
);