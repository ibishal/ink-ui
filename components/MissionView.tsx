
import React from 'react';
import { Level } from '../types';
import { ICONS } from '../constants';

interface MissionViewProps {
  level: Level;
  onBack: () => void;
  onShowDocs: () => void;
}

export const MissionView: React.FC<MissionViewProps> = ({ level, onBack, onShowDocs }) => {
  return (
    <div className="flex-1 flex flex-col p-6 gap-6 animate-in fade-in duration-700 mt-20">
      <nav className="flex justify-between items-center px-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 tactical-border bg-white/5 px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
        >
          ← BACK_TO_SECTOR
        </button>
        <div className="flex gap-6 items-center">
          <span className="text-[11px] mono text-gray-600 font-bold uppercase tracking-widest underline decoration-ink-pink decoration-2 underline-offset-8">Active_Session: {level.title}</span>
        </div>
      </nav>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-[420px] flex flex-col gap-6">
           <div className="flex-1 tactical-border bg-white/5 p-10 overflow-y-auto custom-scrollbar">
              <span className="text-[11px] mono text-ink-pink font-black block mb-4 tracking-widest uppercase">/ MISSION_BRIEF</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">{level.title}</h2>
              <div className="bg-black/60 p-6 border border-white/10 rounded-sm mb-8">
                 <span className="text-[10px] mono text-gray-500 block mb-2 uppercase tracking-widest font-bold">Primary Target</span>
                 <p className="text-sm font-bold leading-relaxed tracking-tight">{level.objective}</p>
              </div>
              <p className="text-md text-gray-400 font-medium leading-relaxed mb-12">{level.description}</p>
              <div className="space-y-4">
                 <button onClick={onShowDocs} className="w-full py-4 tactical-border bg-white/5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Documentation Access</button>
              </div>
           </div>
        </div>

        <div className="flex-1 tactical-border bg-black/80 flex flex-col overflow-hidden">
           <div className="bg-[#121215] p-4 flex justify-between items-center border-b border-white/10">
              <span className="text-[10px] mono text-gray-500 uppercase tracking-[0.3em] font-bold">Lib.rs // Target_Mirror</span>
           </div>
           <pre className="flex-1 p-12 overflow-auto mono text-sm leading-relaxed text-indigo-300/80 custom-scrollbar">
              <code>{level.sourceCode}</code>
           </pre>
        </div>

        <div className="w-[350px] flex flex-col gap-6">
           <button className="h-40 bg-ink-pink tactical-border flex flex-col items-center justify-center group shadow-[0_0_60px_rgba(230,0,122,0.1)] active:scale-95 transition-all">
              <ICONS.Zap />
              <span className="text-xl font-black uppercase tracking-widest mt-4">Execute_Pwn</span>
           </button>
           <div className="flex-1 tactical-border bg-[#0A0A0B] p-8 flex flex-col border-white/5">
              <span className="text-[11px] mono text-gray-600 uppercase font-black mb-6 tracking-widest border-b border-white/5 pb-4">Tactical_Relay</span>
              <div className="flex-1 mono text-[11px] text-gray-500 space-y-4 overflow-y-auto custom-scrollbar">
                 <p className="text-ink-pink">>> INITIALIZING_SEQUENCE</p>
                 <p>>> MAPPING_RESOURCES...</p>
                 <p>>> READY_FOR_INJECTION_</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
