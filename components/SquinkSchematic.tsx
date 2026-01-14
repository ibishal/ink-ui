
import React, { useEffect } from 'react';

declare const gsap: any;

export const SquinkSchematic: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(".mascot-hero", { y: -15 }, { y: 15, duration: 4, yoyo: true, repeat: -1, ease: "power1.inOut" });
  }, []);

  return (
    <div className="relative w-full h-[550px] flex items-center justify-center pointer-events-none">
      {/* Concentric Schematic Rings with Opacity Gradient */}
      
      {/* Outer Ring (Least Opaque) */}
      <div className="absolute w-[700px] h-[700px] border border-white/[0.03] rounded-full">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-white/10"></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-10 bg-white/10"></div>
         <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-10 bg-white/10"></div>
         <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-10 bg-white/10"></div>
      </div>
      
      {/* Middle Ring */}
      <div className="absolute w-[500px] h-[500px] border border-white/[0.07] rounded-full"></div>
      
      {/* Inner Ring (Most Opaque / Near Mascot) */}
      <div className="absolute w-[350px] h-[350px] border border-white/[0.12] rounded-full"></div>
      
      {/* Degree Markers */}
      <div className="absolute w-[750px] h-[750px] mono text-[9px] text-gray-700 font-bold uppercase tracking-widest">
         <span className="absolute top-0 left-1/2 -translate-x-1/2">Angle.Ref_000.00</span>
         <span className="absolute bottom-0 left-1/2 -translate-x-1/2">Angle.Ref_180.00</span>
         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90">Angle.Ref_270.00</span>
         <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90">Angle.Ref_090.00</span>
      </div>

      {/* Hero Mascot */}
      <div className="mascot-hero relative z-20">
        <img 
          src="https://use.ink/img/ink-squink.svg" 
          alt="Squink" 
          className="w-64 h-64 drop-shadow-[0_0_80px_rgba(230,0,122,0.1)]" 
        />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
           <div className="w-[1px] h-12 bg-gradient-to-b from-ink-pink to-transparent"></div>
           <span className="text-[10px] mono text-ink-pink font-black tracking-[0.4em] mt-3">SYNCHRONIZED</span>
        </div>
      </div>
    </div>
  );
};
