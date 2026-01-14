
import React from 'react';

export const PlayerHUD: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start pointer-events-none">
      <div className="flex gap-6 pointer-events-auto items-center">
        <div className="flex items-center gap-4">
           <img 
             src="https://use.ink/img/logo/ink-logo-with-squid-white.svg" 
             className="h-10" 
             alt="ink! logo"
           />
           <div className="h-6 w-px bg-white/10 mx-2"></div>
           <div className="flex flex-col">
             <span className="text-[10px] mono text-gray-500 font-bold tracking-[0.2em]">SPECTOR_UNIT_01</span>
             <span className="text-[9px] mono text-ink-pink font-bold uppercase tracking-widest">Status: Ready</span>
           </div>
        </div>
      </div>
      <div className="flex gap-12 pointer-events-auto">
        <div className="text-right">
          <span className="text-[9px] mono text-gray-500 block uppercase tracking-widest mb-1">Deployment Zone</span>
          <span className="text-sm font-bold text-white uppercase tracking-tighter">PASEO_STAGING</span>
        </div>
        <div className="text-right border-l border-white/10 pl-12">
          <span className="text-[9px] mono text-gray-500 block uppercase tracking-widest mb-1">Secure_Uplink</span>
          <span className="text-sm font-bold text-white uppercase">Active</span>
        </div>
      </div>
    </div>
  );
};
