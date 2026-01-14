
import React from 'react';

export const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mx-auto w-full px-[10%] min-h-screen flex flex-col">
      {children}
    </div>
  );
};
