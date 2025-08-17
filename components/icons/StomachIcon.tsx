import React from 'react';

export const StomachIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-2.062 2.667-2.062 5.333 0 8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.5c2.062 2.667 2.062 5.333 0 8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12.5h16" />
  </svg>
);