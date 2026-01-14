
import React, { useEffect, useRef, useState } from 'react';

declare const gsap: any;

export const SquinkSchematic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [particles] = useState(() => 
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
  );

  useEffect(() => {
    // 1. Floating Mascot Animation
    gsap.fromTo(".mascot-hero", 
      { y: -20 }, 
      { y: 20, duration: 5, yoyo: true, repeat: -1, ease: "power1.inOut" }
    );

    // 2. Breathing Core Bloom
    gsap.to(".ink-core-bloom", {
      scale: 1.15,
      opacity: 0.4,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // 3. Chromatic Scanning Sweep
    gsap.fromTo(".scan-line",
      { top: "-10%" },
      { top: "110%", duration: 4, repeat: -1, ease: "none", repeatDelay: 2 }
    );

    // 4. Mouse Reactive Core Shift
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !coreRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.05;
      const y = (e.clientY - top - height / 2) * 0.05;
      
      gsap.to(coreRef.current, {
        x, y,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Define rings: [size, opacity, blurLevel]
  const rings = [
    { size: 380, opacity: 'opacity-[0.25]', blur: 'blur-[3px]' }, // Dense & Blurry
    { size: 420, opacity: 'opacity-[0.18]', blur: 'blur-[1px]' },
    { size: 480, opacity: 'opacity-[0.12]', blur: '' },
    { size: 560, opacity: 'opacity-[0.08]', blur: '' },
    { size: 680, opacity: 'opacity-[0.05]', blur: '' },
    { size: 850, opacity: 'opacity-[0.03]', blur: '' },
    { size: 1100, opacity: 'opacity-[0.01]', blur: '' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* 1. Digital Ink Core (Bloom) */}
      <div 
        ref={coreRef}
        className="ink-core-bloom absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(230, 0, 122, 0.15) 0%, rgba(230, 0, 122, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      ></div>

      {/* 2. Concentric Schematic Rings - Dense to Sparse */}
      {rings.map((ring, i) => (
        <div 
          key={i}
          className={`absolute border border-white rounded-full ${ring.opacity} ${ring.blur}`}
          style={{ width: `${ring.size}px`, height: `${ring.size}px` }}
        ></div>
      ))}

      {/* 3. Floating Data Particles (Splatter) */}
      <div className="absolute inset-0 z-10">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-ink-pink/40 animate-pulse"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float-particle ${p.duration}s infinite linear ${p.delay}s`
            }}
          />
        ))}
      </div>
      
      {/* 4. Chromatic Sweep Line */}
      <div className="absolute w-[600px] h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="scan-line absolute w-full h-px bg-gradient-to-r from-transparent via-ink-pink/40 to-transparent shadow-[0_0_15px_rgba(230,0,122,0.3)] z-10"
        ></div>
      </div>

      {/* 5. Degree Markers */}
      <div className="absolute w-[600px] h-[600px] mono text-[9px] text-gray-700 font-bold uppercase tracking-[0.2em] z-5">
         <span className="absolute top-[-20px] left-1/2 -translate-x-1/2">LAT.00.00.0</span>
         <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">LAT.18.00.0</span>
         <span className="absolute left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 origin-center">LNG.27.00.0</span>
         <span className="absolute right-[-40px] top-1/2 -translate-y-1/2 rotate-90 origin-center">LNG.09.00.0</span>
      </div>

      {/* 6. Hero Mascot */}
      <div className="mascot-hero relative z-20">
        <img 
          src="https://use.ink/img/ink-squink.svg" 
          alt="Squink" 
          className="w-[420px] h-[420px] drop-shadow-[0_0_120px_rgba(230,0,122,0.15)]" 
        />
      </div>

      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-300px) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
