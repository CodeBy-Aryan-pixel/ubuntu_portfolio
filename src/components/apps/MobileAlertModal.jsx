import React from 'react';
import { AlertTriangle, Monitor } from 'lucide-react';

export default function MobileAlertModal({ onClose }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-5 bg-[#1E1E1E] text-white select-none text-center">
      {/* Alert Header & Graphic */}
      <div className="flex flex-col items-center space-y-3 pt-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 animate-bounce-subtle">
          <AlertTriangle className="w-6 h-6" />
        </div>
        
        <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
          <span>Mobile View Restricted</span>
        </h3>

        {/* Informative Warning Message */}
        <p className="text-xs text-white/70 leading-relaxed max-w-xs font-sans">
          The full interactive desktop environment, including the Terminal and AI features, requires a larger screen. Please visit this portfolio on a desktop or laptop for the complete experience.
        </p>
      </div>

      {/* Action OK Button */}
      <div className="w-full pt-4 border-t border-white/10 flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-xl bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white text-xs font-semibold shadow-lg shadow-ubuntu-orange/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>OK</span>
        </button>
      </div>
    </div>
  );
}
