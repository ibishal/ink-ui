
import React, { useEffect } from 'react';

declare const gsap: any;

export const SquinkSchematic: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(".mascot-hero", { y: -20 }, { y: 20, duration: 5, yoyo: true, repeat: -1, ease: "power1.inOut" });
  }, []);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center pointer-events-none overflow-visible">
      {/* Concentric Schematic Rings - Fade out from center */}
      
      {/* Outer Ring - Farthest, least opaque */}
      <div className="absolute w-[800px] h-[800px] border border-white/[0.02] rounded-full">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/5"></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/5"></div>
      </div>
      
      {/* Mid-Outer Ring */}
      <div className="absolute w-[600px] h-[600px] border border-white/[0.04] rounded-full"></div>
      
      {/* Mid-Inner Ring */}
      <div className="absolute w-[450px] h-[450px] border border-white/[0.07] rounded-full"></div>
      
      {/* Closest Ring - Most opaque but subtle */}
      <div className="absolute w-[350px] h-[350px] border border-white/[0.12] rounded-full"></div>
      
      {/* Degree Markers */}
      <div className="absolute w-[850px] h-[850px] mono text-[10px] text-gray-800 font-bold uppercase tracking-[0.2em]">
         <span className="absolute top-0 left-1/2 -translate-x-1/2">SYSTEM.ANGLE_000.00</span>
         <span className="absolute bottom-0 left-1/2 -translate-x-1/2">SYSTEM.ANGLE_180.00</span>
         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center">REF.WEST_270</span>
         <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-center">REF.EAST_090</span>
      </div>

      {/* Hero Mascot - Broadened and scaled up */}
      <div className="mascot-hero relative z-20 flex flex-col items-center">
        <img 
          src="https://use.ink/img/ink-squink.svg" 
          alt="Squink" 
          className="w-[380px] h-[380px] drop-shadow-[0_0_120px_rgba(230,0,122,0.12)]" 
        />
        <div className="absolute -bottom-16 flex flex-col items-center">
           <div className="w-[1px] h-20 bg-gradient-to-b from-ink-pink/60 to-transparent"></div>
           <div className="flex items-center gap-4 mt-4">
             <div className="w-2 h-2 rounded-full bg-ink-pink animate-pulse"></div>
             <span className="text-[11px] mono text-ink-pink font-black tracking-[0.5em] uppercase">Status: Synchronized</span>
           </div>
        </div>
      </div>
    </div>
  );
};
