import React, { useState } from 'react';
import { 
  Terminal, 
  Folder, 
  Cpu, 
  Briefcase, 
  User, 
  FileText, 
  Settings, 
  Trash, 
  Grid,
  Camera
} from 'lucide-react';

import { isMobileDevice } from '../../utils/deviceUtils';

const DOCK_APPS = [
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-[#4AF626]', bg: 'bg-[#300A24]' },
  { id: 'files', name: 'Files (Projects)', icon: Folder, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { id: 'skills', name: 'System Monitor', icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 'visionlab', name: 'VisionLab AI', icon: Camera, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { id: 'experience', name: 'Experience & Internships', icon: Briefcase, color: 'text-ubuntu-orange', bg: 'bg-ubuntu-orange/20' },
  { id: 'about', name: 'About Me', icon: User, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'resume', name: 'Resume', icon: FileText, color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'text-white/80', bg: 'bg-white/10' },
];

export default function Dock({ 
  windows = {}, 
  activeWindowId = null,
  onOpenApp = () => {}, 
  onToggleMinimize = () => {},
  onToggleAppDrawer = () => {},
  isAppDrawerOpen = false,
  dockSize = 'md',
  onTriggerMobileWarning = () => {}
}) {
  const [hoveredApp, setHoveredApp] = useState(null);

  const sizeClasses = {
    sm: 'w-12 py-2 gap-1.5',
    md: 'w-16 py-3.5 gap-2.5',
    lg: 'w-18 py-4 gap-3',
  };

  const iconSizes = {
    sm: 'w-9 h-9 p-2',
    md: 'w-11 h-11 p-2.5',
    lg: 'w-13 h-13 p-3',
  };

  const handleAppClick = (appId) => {
    if (!appId) return;
    const win = windows?.[appId];
    if (!win || !win.isOpen) {
      onOpenApp?.(appId);
    } else if (win.isMinimized) {
      onOpenApp?.(appId);
    } else if (activeWindowId === appId) {
      onToggleMinimize?.(appId);
    } else {
      onOpenApp?.(appId);
    }
  };

  const handleDrawerClick = () => {
    if (isMobileDevice()) {
      onTriggerMobileWarning?.();
      return;
    }
    onToggleAppDrawer?.();
  };

  return (
    <aside 
      className={`fixed top-7 left-0 bottom-0 ${sizeClasses[dockSize] || sizeClasses.md} bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col items-center justify-between z-30 select-none shadow-2xl`}
    >
      {/* Top Application Shortcuts */}
      <div className="flex flex-col items-center gap-2.5 w-full px-1.5">
        {DOCK_APPS?.map((app) => {
          if (!app) return null;
          const win = windows?.[app.id];
          const isOpen = Boolean(win?.isOpen);
          const isFocused = Boolean(activeWindowId === app.id && isOpen && !win?.isMinimized);
          const IconComp = app.icon || Folder;

          return (
            <div key={app.id} className="relative group w-full flex items-center justify-center">
              {/* Launcher Icon Button */}
              <button
                onClick={() => handleAppClick(app.id)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                className={`relative rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                  iconSizes[dockSize] || iconSizes.md
                } ${
                  isFocused
                    ? 'bg-white/20 shadow-lg ring-1 ring-white/20'
                    : isOpen
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className={`w-full h-full rounded-xl ${app.bg || 'bg-white/10'} flex items-center justify-center shadow-md border border-white/10`}>
                  <IconComp className={`w-5 h-5 ${app.color || 'text-white'} transition-transform duration-200 group-hover:scale-105`} />
                </div>
              </button>

              {/* Hover Tooltip Pill (Glassmorphic) */}
              {hoveredApp === app.id && (
                <div className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-sans font-medium whitespace-nowrap shadow-2xl border border-white/15 pointer-events-none z-50 animate-fade-in flex items-center gap-2">
                  <span>{app.name}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Launcher & Trash Button */}
      <div className="flex flex-col items-center gap-2.5 w-full px-1.5 pt-2.5 border-t border-white/10">
        {/* Trash Item */}
        <div className="relative group w-full flex items-center justify-center">
          <button
            onClick={() => onOpenApp?.('trash')}
            className={`rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              iconSizes[dockSize] || iconSizes.md
            }`}
            title="Trash"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>

        {/* 9-Dot Show Applications Button */}
        <div className="relative group w-full flex items-center justify-center">
          <button
            onClick={handleDrawerClick}
            title="Show Applications"
            className={`rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              isAppDrawerOpen
                ? 'bg-ubuntu-orange text-white shadow-[0_0_15px_rgba(233,84,32,0.6)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            } ${iconSizes[dockSize] || iconSizes.md}`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
