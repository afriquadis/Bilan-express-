import React from 'react';

export const HeadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-8 w-8" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.364 6.364a9 9 0 11-12.728 0 9 9 0 0112.728 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.5V3.75m0 16.5V18.75m-4.5-4.5H3.75m16.5 0H18.75m-1.5-1.5l-3.375-3.375m-2.25 2.25L10.5 10.5" />
    </svg>
);