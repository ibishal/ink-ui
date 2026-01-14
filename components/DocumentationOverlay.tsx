
import React, { useState, useEffect, useRef } from 'react';

declare const gsap: any;

const DOC_SECTIONS = [
  {
    id: 'reentrancy',
    title: 'Reentrancy Attacks',
    description: 'When a contract calls an external account before updating its own internal state, allowing the external account to call back into the original function repeatedly.',
    vulnerable: `// VULNERABLE\nif self.env().transfer(caller, balance).is_ok() {\n    self.balances.insert(caller, &0);\n}`,
    secure: `// SECURE\nself.balances.insert(caller, &0);\nself.env().transfer(caller, balance).expect("Transfer failed");`
  },
  {
    id: 'access',
    title: 'Access Control',
    description: 'Ensuring sensitive operations are restricted to authorized accounts.',
    vulnerable: `#[ink(message)]\npub fn kill(&mut self) {\n    self.env().terminate_contract(self.owner);\n}`,
    secure: `#[ink(message)]\npub fn kill(&mut self) {\n    assert_eq!(self.env().caller(), self.owner);\n    self.env().terminate_contract(self.owner);\n}`
  }
];

export const DocumentationOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeDoc, setActiveDoc] = useState(DOC_SECTIONS[0]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { x: 0, duration: 0.8, ease: "expo.out" });
    } else {
      gsap.to(overlayRef.current, { x: "100%", duration: 0.6, ease: "power3.in" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-[#0A0A0B] translate-x-full flex flex-col p-12 overflow-hidden border-l border-white/5 shadow-2xl">
      <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
        <div className="flex items-center gap-8">
           <button onClick={onClose} className="w-14 h-14 tactical-border flex items-center justify-center hover:bg-white hover:text-black transition-all group">
             <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
           </button>
           <h2 className="text-3xl font-black uppercase tracking-tight">Security_Archives</h2>
        </div>
      </div>
      <div className="flex-1 flex gap-12 overflow-hidden">
        <div className="w-64 space-y-2">
          {DOC_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveDoc(s)} className={`w-full text-left p-4 tactical-border text-[11px] font-black uppercase tracking-widest ${activeDoc.id === s.id ? 'bg-ink-pink' : 'hover:bg-white/5'}`}>{s.title}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto pr-8 custom-scrollbar">
           <h3 className="text-5xl font-black uppercase mb-8">{activeDoc.title}</h3>
           <p className="text-xl text-gray-500 mb-12 max-w-3xl leading-relaxed">{activeDoc.description}</p>
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="p-8 tactical-border bg-red-500/5">
                <span className="text-[10px] mono text-red-500 font-bold uppercase mb-4 block">Vulnerable_Pattern</span>
                <pre className="mono text-xs text-red-300"><code>{activeDoc.vulnerable}</code></pre>
              </div>
              <div className="p-8 tactical-border bg-green-500/5">
                <span className="text-[10px] mono text-green-500 font-bold uppercase mb-4 block">Secure_Pattern</span>
                <pre className="mono text-xs text-green-300"><code>{activeDoc.secure}</code></pre>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
