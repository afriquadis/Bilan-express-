import React from 'react';

export const ThermometerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-8 w-8" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21v-5.25a1.5 1.5 0 013 0V21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.25a1.5 1.5 0 013 0V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12a1.5 1.5 0 013 0V12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 15.75a3 3 0 00-4.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9a3 3 0 00-4.5 0" />
    </svg>
);