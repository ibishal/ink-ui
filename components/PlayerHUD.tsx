
import React from 'react';

export const PlayerHUD: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[110px] border-b border-white/10 z-50 bg-[#0A0A0B]/80 backdrop-blur-md">
      <div className="mx-[10%] h-full border-x border-white/10 px-10 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-4">
             <img 
               src="https://use.ink/img/logo/ink-logo-with-squid-white.svg" 
               className="h-10" 
               alt="ink! logo"
             />
             <div className="h-6 w-px bg-white/10 mx-2"></div>
             <div className="flex flex-col">
               <span className="text-[10px] mono text-gray-500 font-bold tracking-[0.2em]">SPECTOR_UNIT_01</span>
               <span className="text-[9px] mono text-ink-pink font-bold uppercase tracking-widest">Core: Verified</span>
             </div>
          </div>
        </div>
        
        <div className="flex gap-10 items-center">
          <div className="hidden lg:flex gap-10 mr-4">
            <div className="text-right">
              <span className="text-[9px] mono text-gray-500 block uppercase tracking-widest mb-1 font-bold">Zone</span>
              <span className="text-[12px] font-black text-white uppercase tracking-tight">PASEO_STAGING</span>
            </div>
            <div className="text-right border-l border-white/10 pl-10">
              <span className="text-[9px] mono text-gray-500 block uppercase tracking-widest mb-1 font-bold">Secure_Uplink</span>
              <span className="text-[12px] font-black text-white uppercase">ACTIVE</span>
            </div>
          </div>
          
          <button className="px-8 py-3 bg-ink-pink text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(230,0,122,0.15)] active:scale-95 border border-ink-pink">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
