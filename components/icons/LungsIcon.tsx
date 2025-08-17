import React from 'react';

export const LungsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12h7.5m-7.5-3h7.5m-7.5-3h7.5M3 12c0-3.866 3.134-7 7-7h4c3.866 0 7 3.134 7 7v4c0 3.866-3.134 7-7 7h-4c-3.866 0-7-3.134-7-7v-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);