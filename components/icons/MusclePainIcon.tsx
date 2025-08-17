import React from 'react';

export const MusclePainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a5.25 5.25 0 014.538 8.04l-3.37 4.213a1.5 1.5 0 01-2.336 0L7.462 14.79A5.25 5.25 0 0112 6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75L12 12l3.75 3.75" />
  </svg>
);