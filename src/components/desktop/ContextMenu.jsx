import React, { useEffect, useRef } from 'react';
import { 
  Terminal, 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles,
  FolderPlus,
  Sliders,
  Eye,
  Info
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function ContextMenu({ 
  position, 
  onClose, 
  onOpenApp, 
  onCycleWallpaper,
  onMinimizeAll,
  githubUrl = portfolioData?.personal?.github || "https://github.com/CodeBy-Aryan-pixel"
}) {
  const menuRef = useRef(null);

  // Global listener to dismiss menu on outside click, window resize, or Escape key
  useEffect(() => {
    if (!position) return;

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleWindowChange = () => {
      onClose();
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange);
    };
  }, [position, onClose]);

  if (!position) return null;

  // Viewport collision clamp to prevent menu from overflowing offscreen
  const menuWidth = 230;
  const menuHeight = 310;
  const clampedX = Math.max(10, Math.min(position.x, (window.innerWidth || 1024) - menuWidth - 10));
  const clampedY = Math.max(35, Math.min(position.y, (window.innerHeight || 768) - menuHeight - 10));

  const handleOpenTerminal = () => {
    onOpenApp('terminal');
    onClose();
  };

  const handleChangeWallpaper = () => {
    if (onCycleWallpaper) {
      onCycleWallpaper();
    } else {
      onOpenApp('settings');
    }
    onClose();
  };

  const handleViewSourceCode = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <>
      {/* Invisible global dismisser overlay */}
      <div 
        className="fixed inset-0 z-40 bg-transparent" 
        onClick={onClose} 
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }} 
      />

      {/* Ubuntu Glassmorphic Dropdown Menu */}
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        style={{ top: `${clampedY}px`, left: `${clampedX}px` }}
        className="fixed w-[230px] bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-md shadow-2xl z-50 text-sm text-gray-200 select-none py-1.5 font-sans animate-scale-in"
      >
        {/* 1. Open Terminal */}
        <button
          onClick={handleOpenTerminal}
          className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
            <span className="font-medium text-xs">Open Terminal</span>
          </div>
          <span className="text-[10px] font-mono text-white/40 group-hover:text-white/80">Ctrl+Alt+T</span>
        </button>

        {/* 2. Change Wallpaper */}
        <button
          onClick={handleChangeWallpaper}
          className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
            <span className="font-medium text-xs">Change Wallpaper</span>
          </div>
          <Sparkles className="w-3 h-3 text-amber-400 group-hover:text-white transition-colors" />
        </button>

        {/* 3. View Source Code */}
        <button
          onClick={handleViewSourceCode}
          className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <FaGithub className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
            <span className="font-medium text-xs">View Source Code</span>
          </div>
          <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white" />
        </button>

        <div className="my-1 border-t border-white/10" />

        {/* Additional Desktop System Shortcuts */}
        <button
          onClick={() => {
            onOpenApp('files');
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer text-xs"
        >
          <FolderPlus className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
          <span>Open Projects Directory</span>
        </button>

        <button
          onClick={() => {
            onOpenApp('settings');
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer text-xs"
        >
          <Sliders className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
          <span>Display & Appearance</span>
        </button>

        <div className="my-1 border-t border-white/10" />

        <button
          onClick={() => {
            if (onMinimizeAll) onMinimizeAll();
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer text-xs"
        >
          <Eye className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
          <span>Show Desktop</span>
        </button>

        <button
          onClick={() => {
            onOpenApp('about');
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 hover:bg-accent hover:text-white text-left transition-colors group cursor-pointer text-xs"
        >
          <Info className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          <span>About Aryan OS</span>
        </button>
      </div>
    </>
  );
}
