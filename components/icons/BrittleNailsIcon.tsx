import React from 'react';

export const BrittleNailsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9v9h-9v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5L3 3m4.5 4.5l-1.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5L21 3m-4.5 4.5l1.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5L3 21m4.5-4.5l-1.5-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5L21 21m-4.5-4.5l1.5-4.5" />
  </svg>
);