import React from 'react';

export const UrinaryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-3l3 3 3-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 110 18 9 9 0 010-18z" />
  </svg>
);