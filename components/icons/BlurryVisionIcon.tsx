import React from 'react';

export const BlurryVisionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-8 w-8" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c-1.885-4.48-5.52-8-9-8S4.885 7.52 3 12c1.885 4.48 5.52 8 9 8s7.115-3.52 9-8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
  </svg>
);