
import React, { useEffect } from 'react';

declare const gsap: any;

export const SquinkSchematic: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(".mascot-hero", { y: -20 }, { y: 20, duration: 5, yoyo: true, repeat: -1, ease: "power1.inOut" });
  }, []);

  // Define rings: [size, opacity]
  // Creating a "dense to sparse" feel by increasing the gap between rings as they get larger
  const rings = [
    { size: 380, opacity: 'opacity-[0.15]' },
    { size: 420, opacity: 'opacity-[0.12]' },
    { size: 480, opacity: 'opacity-[0.09]' },
    { size: 560, opacity: 'opacity-[0.06]' },
    { size: 680, opacity: 'opacity-[0.04]' },
    { size: 850, opacity: 'opacity-[0.02]' },
    { size: 1100, opacity: 'opacity-[0.01]' },
  ];

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center pointer-events-none overflow-visible">
      {/* Concentric Schematic Rings - Dense to Sparse */}
      {rings.map((ring, i) => (
        <div 
          key={i}
          className={`absolute border border-white rounded-full ${ring.opacity}`}
          style={{ width: `${ring.size}px`, height: `${ring.size}px` }}
        ></div>
      ))}
      
      {/* Degree Markers snapped to the 560px ring for technical detail */}
      <div className="absolute w-[600px] h-[600px] mono text-[9px] text-gray-700 font-bold uppercase tracking-[0.2em]">
         <span className="absolute top-[-20px] left-1/2 -translate-x-1/2">LAT.00.00.0</span>
         <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">LAT.18.00.0</span>
         <span className="absolute left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 origin-center">LNG.27.00.0</span>
         <span className="absolute right-[-40px] top-1/2 -translate-y-1/2 rotate-90 origin-center">LNG.09.00.0</span>
      </div>

      {/* Hero Mascot - 420px Width */}
      <div className="mascot-hero relative z-20">
        <img 
          src="https://use.ink/img/ink-squink.svg" 
          alt="Squink" 
          className="w-[420px] h-[420px] drop-shadow-[0_0_120px_rgba(230,0,122,0.12)]" 
        />
      </div>
    </div>
  );
};
