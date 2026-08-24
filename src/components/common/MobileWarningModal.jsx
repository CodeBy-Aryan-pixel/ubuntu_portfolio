import React from 'react';
import { Monitor, X, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export default function MobileWarningModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-fade-in text-white font-sans"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#242424]/95 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-sm p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-center space-y-5 animate-scale-in relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
          title="Close Warning"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon Header Graphic with Pulsing Glow */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-ubuntu-orange/25 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-ubuntu-orange to-ubuntu-aubergine-mid border border-white/20 flex items-center justify-center shadow-lg">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-500 text-black shadow-md">
            <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
          </span>
        </div>

        {/* Text Header & Warning Body */}
        <div className="space-y-2">
          <h3 className="font-bold text-base text-white tracking-wide">
            Desktop View Required
          </h3>
          <p className="text-xs text-white/80 leading-relaxed bg-[#1A1A1A] p-3.5 rounded-2xl border border-white/5 shadow-inner">
            Not supported for mobile view. Please open on a desktop or laptop for the full Ubuntu Web OS experience.
          </p>
        </div>

        {/* Desktop Features Highlight */}
        <div className="text-[11px] text-white/60 space-y-1.5 text-left bg-white/5 p-3 rounded-xl border border-white/5 font-mono">
          <div className="flex items-center gap-2 text-white/80 font-sans font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-ubuntu-orange" />
            <span>Full Experience Features:</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-ubuntu-orange shrink-0" />
            <span>Draggable Multi-Window Desktop GUI</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-ubuntu-orange shrink-0" />
            <span>VisionLab TensorFlow.js Dual-AI Engine</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-ubuntu-orange shrink-0" />
            <span>Interactive Bash Terminal with Easter Eggs</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white font-bold text-xs shadow-lg shadow-ubuntu-orange/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Got it, thanks!</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
