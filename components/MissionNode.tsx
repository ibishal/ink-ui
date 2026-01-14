
import React from 'react';
import { Level, Difficulty } from '../types';
import { ICONS } from '../constants';

interface MissionNodeProps {
  level: Level;
  index: number;
  isLocked: boolean;
  onSelect: (l: Level) => void;
}

export const MissionNode: React.FC<MissionNodeProps> = ({ level, index, isLocked, onSelect }) => {
  return (
    <div 
      onClick={() => !isLocked && onSelect(level)}
      className={`relative group p-6 transition-all duration-300 ${isLocked ? 'opacity-20 grayscale cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
    >
      <div className={`tactical-border bg-[#0E0E10]/90 p-8 border-white/5 ${!isLocked && 'hover:border-ink-pink/40'} transition-all`}>
        <div className="flex justify-between items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-ink-pink bg-white/5">
            {isLocked ? <ICONS.Lock /> : <ICONS.Code />}
          </div>
          <span className="text-[10px] mono text-gray-600 font-bold uppercase tracking-widest">M_0{level.id}</span>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3 leading-none">{level.title}</h3>
        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2">{level.description}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-6">
           <span className="text-[10px] mono text-gray-500 font-bold uppercase tracking-widest">Initialize →</span>
           <div className={`text-[10px] font-black px-3 py-1 uppercase tracking-widest ${level.difficulty === Difficulty.EASY ? 'text-green-500' : 'text-red-500'}`}>
             {level.difficulty}
           </div>
        </div>
      </div>
    </div>
  );
};
