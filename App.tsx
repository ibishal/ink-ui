
import React, { useState } from 'react';
import { Level } from './types';
import { LEVELS } from './constants';
import { PlayerHUD } from './components/PlayerHUD';
import { DocumentationOverlay } from './components/DocumentationOverlay';
import { SquinkSchematic } from './components/SquinkSchematic';
import { MissionNode } from './components/MissionNode';
import { MissionView } from './components/MissionView';

export default function App() {
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  const Crosshair = ({ className = "" }: { className?: string }) => (
    <div className={`cross ${className}`}></div>
  );

  const HomeView = () => (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b border-white/10 pt-20">
        <SquinkSchematic />
        
        <div className="text-center space-y-8 max-w-4xl mx-auto -mt-24 pb-32 relative z-30">
          <div className="flex items-center justify-center gap-6">
             <div className="h-px w-20 bg-ink-pink/30"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-ink-pink">Guardian Training Interface</span>
             <div className="h-px w-20 bg-ink-pink/30"></div>
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
            INK!<span className="text-ink-pink">SPECTOR</span> GADGET
          </h1>
          <p className="text-xl text-gray-500 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            Technical proving ground for ink! smart contract security. 
            Analyze bytecode. Exploit logic. Secure the ecosystem.
          </p>
          <div className="flex justify-center gap-8 pt-6">
             <button 
              onClick={() => setShowDocs(true)}
              className="px-12 py-5 border border-white/10 bg-white/5 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
             >
               Access Vault Archives
             </button>
          </div>
        </div>

        {/* Intersection Markers at Hero Bottom Corners */}
        <Crosshair className="bottom-0 -left-[6px]" />
        <Crosshair className="bottom-0 -right-[6px]" />
      </section>

      {/* Grid Sub-Header */}
      <div className="relative border-b border-white/10 px-10 py-6 bg-black/20">
         <div className="flex items-center gap-8">
           <div className="w-3 h-3 bg-ink-pink"></div>
           <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white">Sector_Deployment_Map</h3>
           <div className="flex-1 h-px bg-white/5"></div>
        </div>
        <Crosshair className="bottom-0 -left-[6px]" />
        <Crosshair className="bottom-0 -right-[6px]" />
      </div>

      {/* Mission Bento Grid */}
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

      <footer className="mt-auto py-24 border-t border-white/10 relative">
        <div className="px-12 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
           <div className="flex items-center gap-6">
              <img src="https://use.ink/img/logo/ink-logo-with-squid-white.svg" className="h-8" />
              <span className="font-black text-lg uppercase tracking-tighter text-gray-400">ink!Spector</span>
           </div>
           <div className="flex gap-12 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-white transition-colors">Github_Repo</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Paseo_Scan</a>
           </div>
           <div className="text-[10px] mono text-gray-700 uppercase tracking-[0.4em]">
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
      <PlayerHUD />
      <DocumentationOverlay isOpen={showDocs} onClose={() => setShowDocs(false)} />
      
      {/* Main Structural Vertical Pillars (10% Margins) */}
      <div className="flex-1 flex flex-col relative mx-[10%] border-x border-white/10 min-h-screen">
        {/* Intersection Points at the very top (under HUD) */}
        <Crosshair className="top-[110px] -left-[6px] highlight" />
        <Crosshair className="top-[110px] -right-[6px] highlight" />

        <div className="flex-1 flex flex-col mt-[110px]">
          {activeLevel ? (
            <MissionView 
              level={activeLevel} 
              onBack={() => setActiveLevel(null)} 
              onShowDocs={() => setShowDocs(true)} 
            />
          ) : (
            <HomeView />
          )}
        </div>
      </div>

      {/* Connection Status Indicator */}
      <div className="fixed bottom-10 right-10 flex items-center gap-5 bg-black/90 border border-white/10 px-6 py-3 z-40 shadow-2xl">
         <div className="flex gap-1 h-2 items-end">
            <div className="w-1.5 h-[60%] bg-ink-pink/50"></div>
            <div className="w-1.5 h-[100%] bg-ink-pink"></div>
            <div className="w-1.5 h-[40%] bg-ink-pink/70"></div>
            <div className="w-1.5 h-[80%] bg-ink-pink"></div>
         </div>
         <span className="text-[10px] mono text-gray-500 font-bold tracking-[0.3em] uppercase">Node_Connected: 4.02ms</span>
      </div>
    </div>
  );
}
