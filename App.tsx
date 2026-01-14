
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

  const HomeView = () => (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden pt-32">
      <section className="relative flex flex-col items-center justify-center px-12 pb-24">
        <SquinkSchematic />
        
        <div className="text-center space-y-6 max-w-4xl -mt-24 relative z-30">
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-16 bg-ink-pink/20"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-ink-pink">Guardian Training Interface</span>
             <div className="h-px w-16 bg-ink-pink/20"></div>
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-white leading-tight">
            INK!<span className="text-ink-pink">SPECTOR</span> GADGET
          </h1>
          <p className="text-lg text-gray-500 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            Technical proving ground for ink! smart contract security. 
            Analyze. Exploit. Secure the ecosystem.
          </p>
          <div className="flex justify-center gap-8 pt-8">
             <button 
              onClick={() => setShowDocs(true)}
              className="px-10 py-4 tactical-border bg-white/5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
             >
               Access Vault Archives
             </button>
          </div>
        </div>
      </section>

      <section className="relative px-12 pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-16 px-6">
             <div className="w-2 h-2 bg-ink-pink"></div>
             <h3 className="text-xs font-black uppercase tracking-[0.4em]">Sector_Deployment_Map</h3>
             <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 bg-[#070708] py-24 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
           <div className="flex items-center gap-6">
              <img src="https://use.ink/img/logo/ink-logo-with-squid-white.svg" className="h-10" />
              <span className="font-black text-xl uppercase tracking-tighter text-gray-400">ink!Spector</span>
           </div>
           <div className="flex gap-12 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-white transition-colors">Github</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Network</a>
           </div>
           <div className="text-[10px] mono text-gray-700 uppercase tracking-widest">
              [ Secure_Transmission_Active ]
           </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      <PlayerHUD />
      <DocumentationOverlay isOpen={showDocs} onClose={() => setShowDocs(false)} />
      
      {activeLevel ? (
        <MissionView 
          level={activeLevel} 
          onBack={() => setActiveLevel(null)} 
          onShowDocs={() => setShowDocs(true)} 
        />
      ) : (
        <HomeView />
      )}

      {/* Connection Status Indicator */}
      <div className="fixed bottom-8 right-8 flex items-center gap-4 bg-black/80 tactical-border px-5 py-2.5 z-40 border-white/5">
         <div className="flex gap-1 h-2 items-end">
            <div className="w-1 h-[60%] bg-ink-pink"></div>
            <div className="w-1 h-[100%] bg-ink-pink"></div>
            <div className="w-1 h-[40%] bg-ink-pink"></div>
            <div className="w-1 h-[80%] bg-ink-pink"></div>
         </div>
         <span className="text-[10px] mono text-gray-500 font-bold tracking-widest uppercase">Paseo_Node_Online</span>
      </div>
    </div>
  );
}
