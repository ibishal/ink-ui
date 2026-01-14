
import React, { useState, useEffect, useRef } from 'react';

declare const gsap: any;

const DOC_SECTIONS = [
  {
    id: 'reentrancy',
    title: 'Reentrancy Attacks',
    description: 'The most infamous vulnerability in smart contracts. In ink!, this occurs when a contract calls an external account (often another contract) before updating its own internal state, allowing recursive execution that bypasses balance checks.',
    vulnerable: `// VULNERABLE: State updated AFTER transfer
if self.env().transfer(caller, balance).is_ok() {
    self.balances.insert(caller, &0);
}`,
    secure: `// SECURE: Checks-Effects-Interactions pattern
self.balances.insert(caller, &0);
self.env().transfer(caller, balance).expect("Transfer failed");`
  },
  {
    id: 'access-control',
    title: 'Access Control',
    description: 'Ensuring that only authorized accounts can execute sensitive functions. Failing to check "self.env().caller()" against an owner address can lead to total contract takeover or premature termination.',
    vulnerable: `#[ink(message)]
pub fn drain_vault(&mut self) {
    // Missing ownership check!
    self.env().transfer(self.env().caller(), self.total_balance);
}`,
    secure: `#[ink(message)]
pub fn drain_vault(&mut self) {
    assert_eq!(self.env().caller(), self.owner, "Caller is not owner");
    self.env().transfer(self.owner, self.total_balance);
}`
  },
  {
    id: 'arithmetic',
    title: 'Integer Wraps',
    description: 'In Rust, depending on compilation profiles, integers can wrap around on overflow or underflow. Always use checked arithmetic (e.g. checked_add) or ink! built-ins to prevent balance manipulation.',
    vulnerable: `self.total_score -= points;`,
    secure: `self.total_score = self.total_score.checked_sub(points).expect("Underflow occurred");`
  }
];

export const DocumentationOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeDoc, setActiveDoc] = useState(DOC_SECTIONS[0]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { x: 0, duration: 0.8, ease: "expo.out" });
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
    } else {
      gsap.to(overlayRef.current, { x: "100%", duration: 0.6, ease: "power3.in" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0A0A0B] translate-x-full flex flex-col p-12 overflow-hidden border-l border-white/5"
    >
      <div className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
        <div className="flex items-center gap-8">
           <button onClick={onClose} className="w-14 h-14 tactical-border flex items-center justify-center hover:bg-white hover:text-black transition-all group">
             <span className="text-lg group-hover:scale-110 transition-transform">✕</span>
           </button>
           <div>
             <span className="text-[10px] mono text-gray-500 block tracking-[0.5em] mb-1 font-bold uppercase">Archive_System_v.5</span>
             <h2 className="text-3xl font-black uppercase tracking-tight">Security Protocol Library</h2>
           </div>
        </div>
      </div>

      <div className="flex-1 flex gap-16 overflow-hidden">
        <div className="w-72 space-y-3">
          {DOC_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveDoc(section)}
              className={`w-full text-left p-5 tactical-border transition-all ${activeDoc.id === section.id ? 'bg-ink-pink text-white border-ink-pink shadow-[0_0_20px_rgba(230,0,122,0.2)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">{section.title}</span>
            </button>
          ))}
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto pr-12 custom-scrollbar">
          <h3 className="text-5xl font-black uppercase tracking-tighter mb-8">{activeDoc.title}</h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-16 max-w-4xl">
            {activeDoc.description}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-[11px] mono text-red-500 font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500"></div> VULNERABLE_SOURCE
              </span>
              <div className="tactical-border bg-red-500/5 p-8 rounded-sm">
                <pre className="mono text-xs text-red-300/80 leading-relaxed overflow-x-auto">
                  <code>{activeDoc.vulnerable}</code>
                </pre>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[11px] mono text-green-500 font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500"></div> SECURE_IMPLEMENTATION
              </span>
              <div className="tactical-border bg-green-500/5 p-8 rounded-sm">
                <pre className="mono text-xs text-green-300/80 leading-relaxed overflow-x-auto">
                  <code>{activeDoc.secure}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
