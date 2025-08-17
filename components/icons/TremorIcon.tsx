import React from 'react';

export const TremorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L15.75 17.25l-2.25-3-2.25 3L9.75 6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75h13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 17.25h13.5" />
  </svg>
);