
import React, { useState } from 'react';
import { Level } from './types';
import { LEVELS } from './constants';
import { PlayerHUD } from './components/PlayerHUD';
import { DocumentationOverlay } from './components/DocumentationOverlay';
import { SquinkSchematic } from './components/SquinkSchematic';
import { MissionNode } from './components/MissionNode';
import { MissionView } from './components/MissionView';
import { LayoutContainer } from './components/LayoutContainer';

export default function App() {
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  const HomeView = () => (
    <div className="flex-1 flex flex-col pt-32">
      <section className="relative flex flex-col items-center justify-center py-20">
        <SquinkSchematic />
        
        <div className="text-center space-y-8 max-w-4xl -mt-24 relative z-30">
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
              className="px-12 py-5 tactical-border bg-white/5 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
             >
               Access Vault Archives
             </button>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="flex items-center gap-8 mb-16">
           <div className="w-3 h-3 bg-ink-pink"></div>
           <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white">Sector_Deployment_Map</h3>
           <div className="flex-1 h-px bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {LEVELS.map((level, i) => (
            <MissionNode 
              key={level.id} 
              level={level} 
              index={i} 
              isLocked={i > 2} 
              onSelect={(l) => setActiveLevel(l)} 
            />
          ))}
        </div>
      </section>

      <footer className="mt-auto py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
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
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      <PlayerHUD />
      <DocumentationOverlay isOpen={showDocs} onClose={() => setShowDocs(false)} />
      
      <LayoutContainer>
        {activeLevel ? (
          <MissionView 
            level={activeLevel} 
            onBack={() => setActiveLevel(null)} 
            onShowDocs={() => setShowDocs(true)} 
          />
        ) : (
          <HomeView />
        )}
      </LayoutContainer>

      {/* Connection Status Indicator */}
      <div className="fixed bottom-10 right-10 flex items-center gap-5 bg-black/90 tactical-border px-6 py-3 z-40 border-white/10 shadow-2xl">
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
