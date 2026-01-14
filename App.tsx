
import React, { useState, useEffect, useRef } from 'react';
import { Level } from './types';
import { LEVELS } from './constants';
import { PlayerHUD } from './components/PlayerHUD';
import { DocumentationOverlay } from './components/DocumentationOverlay';
import { SquinkSchematic } from './components/SquinkSchematic';
import { MissionNode } from './components/MissionNode';
import { MissionView } from './components/MissionView';

declare const gsap: any;

export default function App() {
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const wipeRef = useRef<HTMLDivElement>(null);
  const wipeMascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const duration = 2.2; 
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wipeRef.current, { x: "-100%" });
        gsap.set(wipeMascotRef.current, { opacity: 0 });
      }
    });

    tl.to(wipeRef.current, { 
      x: "100%", 
      duration: duration, 
      ease: "power3.inOut" 
    });
    
    tl.fromTo(wipeMascotRef.current, 
      { x: "-100vw", opacity: 1, scale: 0.8 }, 
      { x: "100vw", opacity: 1, scale: 1.2, duration: duration, ease: "power3.inOut" }, 
      0
    );

    tl.add(() => {
      setTheme(nextTheme);
    }, duration * 0.5);
  };

  const Crosshair = ({ className = "" }: { className?: string }) => (
    <div className={`cross ${className}`}></div>
  );

  const HomeView = () => (
    <div className="flex-1 flex flex-col">
      <section className="relative border-b border-[var(--border-color)] pt-20">
        <SquinkSchematic theme={theme} />
        
        <div className="text-center space-y-8 max-w-4xl mx-auto -mt-24 pb-32 relative z-30">
          <div className="flex items-center justify-center gap-6">
             <div className="h-px w-20 bg-ink-pink/30"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-ink-pink">Guardian Training Interface</span>
             <div className="h-px w-20 bg-ink-pink/30"></div>
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-none">
            INK!<span className="text-ink-pink">SPECTOR</span> GADGET
          </h1>
          <p className="text-xl text-[var(--text-secondary)] font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            Technical proving ground for ink! smart contract security. 
            Analyze bytecode. Exploit logic. Secure the ecosystem.
          </p>
          <div className="flex justify-center gap-8 pt-6">
             <button 
              onClick={() => setShowDocs(true)}
              className={`px-12 py-5 border text-[12px] font-black uppercase tracking-[0.2em] transition-all ${
                theme === 'light' 
                ? 'bg-black text-white border-black hover:bg-zinc-800' 
                : 'bg-[var(--card-bg)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-void)]'
              }`}
             >
               Access Vault Archives
             </button>
          </div>
        </div>

        <Crosshair className="bottom-0 -left-[6px]" />
        <Crosshair className="bottom-0 -right-[6px]" />
      </section>

      <div className="relative border-b border-[var(--border-color)] px-10 py-6 bg-black/5 dark:bg-black/20">
         <div className="flex items-center gap-8">
           <div className="w-3 h-3 bg-ink-pink"></div>
           <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[var(--text-primary)]">Sector_Deployment_Map</h3>
           <div className="flex-1 h-px bg-[var(--border-color)]"></div>
        </div>
        <Crosshair className="bottom-0 -left-[6px]" />
        <Crosshair className="bottom-0 -right-[6px]" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((level, i) => (
          <MissionNode 
            key={level.id} 
            level={level} 
            index={i} 
            isLocked={i > 2} 
            onSelect={(l) => setActiveLevel(l)} 
          />
        ))}
      </section>

      <footer className="mt-auto py-24 border-t border-[var(--border-color)] relative">
        <div className="px-12 flex flex-col md:flex-row justify-between items-center gap-12 opacity-60">
           <div className="flex items-center gap-6">
              <img 
                src={theme === 'dark' ? "https://use.ink/img/logo/ink-logo-with-squid-white.svg" : "https://use.ink/img/logo/ink-logo-with-squid-black.svg"} 
                className="h-8 transition-all duration-300" 
              />
              <span className="font-black text-lg uppercase tracking-tighter text-[var(--text-secondary)]">ink!Spector</span>
           </div>
           <div className="flex gap-12 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-ink-pink transition-colors">Github_Repo</a>
              <a href="#" className="hover:text-ink-pink transition-colors">Documentation</a>
              <a href="#" className="hover:text-ink-pink transition-colors">Paseo_Scan</a>
           </div>
           <div className="text-[10px] mono text-[var(--text-secondary)] uppercase tracking-[0.4em]">
              [ Secure_Transmission_Ready ]
           </div>
        </div>
        <Crosshair className="top-0 -left-[6px]" />
        <Crosshair className="top-0 -right-[6px]" />
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      <PlayerHUD theme={theme} onToggleTheme={toggleTheme} />
      <DocumentationOverlay theme={theme} isOpen={showDocs} onClose={() => setShowDocs(false)} />
      
      <div ref={wipeRef} className="theme-transition-mask"></div>
      <div ref={wipeMascotRef} className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none opacity-0">
         <img 
           src="https://use.ink/img/ink-squink.svg" 
           className="w-[600px] h-[600px] drop-shadow-[0_0_80px_rgba(255,255,255,0.8)]"
           alt="Wipe Mascot"
         />
      </div>

      <div className="flex-1 flex flex-col relative mx-[10%] border-x border-[var(--border-color)] min-h-screen">
        <Crosshair className="top-[110px] -left-[6px] highlight" />
        <Crosshair className="top-[110px] -right-[6px] highlight" />

        <div className="flex-1 flex flex-col mt-[110px]">
          {activeLevel ? (
            <MissionView 
              level={activeLevel} 
              onBack={() => setActiveLevel(null)} 
              onShowDocs={() => setShowDocs(true)} 
              theme={theme}
            />
          ) : (
            <HomeView />
          )}
        </div>
      </div>

      <div className="fixed bottom-10 right-10 flex items-center gap-5 bg-[var(--bg-void)] border border-[var(--border-color)] px-6 py-3 z-40 shadow-2xl backdrop-blur-md">
         <div className="flex gap-1 h-2 items-end">
            <div className="w-1.5 h-[60%] bg-ink-pink/50"></div>
            <div className="w-1.5 h-[100%] bg-ink-pink"></div>
            <div className="w-1.5 h-[40%] bg-ink-pink/70"></div>
            <div className="w-1.5 h-[80%] bg-ink-pink"></div>
         </div>
         <span className="text-[10px] mono text-[var(--text-secondary)] font-bold tracking-[0.3em] uppercase">Node_Connected: 4.02ms</span>
      </div>
    </div>
  );
}
