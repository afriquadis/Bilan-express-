
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center space-x-3">
            <LeafIcon className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold tracking-tight text-neutral-800">
              Bilan Express <span className="font-light text-neutral-600">AFRIQUADIS</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
