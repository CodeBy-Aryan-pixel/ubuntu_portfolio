import React, { useState, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import WindowManager from '../window/WindowManager';
import LiveParticleCanvas from './LiveParticleCanvas';
import { portfolioData } from '../../data/portfolioData';

const MAIN_SHORTCUTS = [
  { id: 'about', name: 'Aryan (Home)', icon: 'User', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'terminal', name: 'Terminal', icon: 'Terminal', color: 'text-[#4AF626]', bg: 'bg-[#300A24]' },
  { id: 'skills', name: 'System Monitor', icon: 'TbActivity', color: 'text-cyan-400', bg: 'bg-cyan-500/20', badge: 'Live' },
  { id: 'files', name: 'Projects', icon: 'Folder', color: 'text-amber-400', bg: 'bg-amber-500/20', badge: '3' },
  { id: 'experience', name: 'Experience', icon: 'Briefcase', color: 'text-ubuntu-orange', bg: 'bg-ubuntu-orange/20' },
  { id: 'resume', name: 'Resume', icon: 'FileText', color: 'text-red-400', bg: 'bg-red-500/20', badge: 'PDF' },
  { id: 'certifications', name: 'Certifications', icon: 'FaCertificate', color: 'text-yellow-400', bg: 'bg-yellow-500/20', badge: '3' },
  { id: 'leadership', name: 'Leadership', icon: 'FaUsers', color: 'text-emerald-400', bg: 'bg-emerald-500/20', badge: '★' },
  { id: 'chatbot', name: 'Aryan_AI', icon: 'FaRobot', color: 'text-cyan-400', bg: 'bg-cyan-500/20', badge: 'AI' },
  { id: 'visionlab', name: 'VisionLab', icon: 'Camera', color: 'text-pink-400', bg: 'bg-pink-500/20', badge: 'CV' },
];

const TRASH_SHORTCUT = {
  id: 'trash',
  name: 'Trash',
  icon: 'Trash',
  color: 'text-white/40',
  bg: 'bg-white/10'
};

export default function Desktop({
  windows,
  activeWindowId,
  stackOrder,
  isMobile,
  onOpenApp,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximize,
  currentWallpaper,
  onSelectWallpaper,
  setWallpaper,
  accentColor,
  onSelectAccentColor,
  dockSize,
  onChangeDockSize,
  onMinimizeAll
}) {
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [contextMenuPos, setContextMenuPos] = useState(null);
  const desktopRef = useRef(null);

  // Dynamic Wallpaper Class (supports both object and raw string)
  const currentWallpaperClass = typeof currentWallpaper === 'string'
    ? currentWallpaper
    : currentWallpaper?.bgClass || 'bg-gradient-to-br from-[#2c001e] via-[#5e2750] to-[#e95420]';

  // Support both onSelectWallpaper and setWallpaper props
  const handleSelectWallpaper = onSelectWallpaper || setWallpaper;

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.pageX || e.clientX, y: e.pageY || e.clientY });
  };

  const handleCycleWallpaper = () => {
    const wallpapers = portfolioData?.wallpapers || [];
    if (wallpapers.length > 0 && handleSelectWallpaper) {
      const currentIndex = wallpapers.findIndex(
        (w) => w.id === currentWallpaper?.id || w.bgClass === currentWallpaper?.bgClass
      );
      const nextIndex = (currentIndex + 1) % wallpapers.length;
      handleSelectWallpaper(wallpapers[nextIndex]);
    }
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    setContextMenuPos(null);
  };

  const handleOpenAppShortcut = (id) => {
    onOpenApp(id);
  };

  return (
    <main
      ref={desktopRef}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className={`fixed inset-0 top-7 pl-14 sm:pl-16 overflow-hidden select-none transition-colors duration-700 ease-in-out ${currentWallpaperClass}`}
    >
      {/* 1. Dynamic Background Foundation with Subtle Glowing Orbs (z-0) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Ambient Radial Lighting Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

        {/* Orbiting Ambient Glow Orb 1: Aubergine Tint */}
        <div className="absolute top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(119,33,111,0.25)_0%,_transparent_70%)] blur-3xl aurora-orb-1" />

        {/* Orbiting Ambient Glow Orb 2: Burnt Orange Tint */}
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(233,84,32,0.18)_0%,_transparent_70%)] blur-3xl aurora-orb-2" />
      </div>

      {/* 2. Interactive Transparent Neural Network Particle Mesh (z-[1]) */}
      <LiveParticleCanvas />

      {/* 3. Intact Ubuntu Mascot Geometric Watermark SVG Overlay (z-[2]) */}
      <div className="absolute right-8 bottom-8 w-[420px] h-[420px] opacity-[0.09] pointer-events-none select-none z-[2]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M 50,100 Q 100,25 150,100 T 50,100" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="25" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* 4. Main Desktop Grid Alignment (2 Columns) (z-10) */}
      <div className="relative w-full h-full pointer-events-none z-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-max p-4 pointer-events-auto">
          {MAIN_SHORTCUTS.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              id={shortcut.id}
              name={shortcut.name}
              icon={shortcut.icon}
              color={shortcut.color}
              bg={shortcut.bg}
              badge={shortcut.badge}
              dragConstraints={desktopRef}
              isSelected={selectedIconId === shortcut.id}
              onSelect={setSelectedIconId}
              onOpen={handleOpenAppShortcut}
            />
          ))}
        </div>

        {/* Repositioned Trash Icon (Bottom-Right Corner) */}
        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <DesktopIcon
            id={TRASH_SHORTCUT.id}
            name={TRASH_SHORTCUT.name}
            icon={TRASH_SHORTCUT.icon}
            color={TRASH_SHORTCUT.color}
            bg={TRASH_SHORTCUT.bg}
            dragConstraints={desktopRef}
            isSelected={selectedIconId === TRASH_SHORTCUT.id}
            onSelect={setSelectedIconId}
            onOpen={handleOpenAppShortcut}
          />
        </div>
      </div>

      {/* 5. Window Manager Layer (z-20) */}
      <div className="relative z-20">
        <WindowManager
          windows={windows}
          activeWindowId={activeWindowId}
          stackOrder={stackOrder}
          isMobile={isMobile}
          onFocus={onFocusWindow || onOpenApp}
          onClose={onCloseWindow}
          onMinimize={onMinimizeWindow}
          onToggleMaximize={onToggleMaximize}
          onOpenApp={onOpenApp}
          currentWallpaper={currentWallpaper}
          onSelectWallpaper={handleSelectWallpaper}
          setWallpaper={handleSelectWallpaper}
          accentColor={accentColor}
          onSelectAccentColor={onSelectAccentColor}
          dockSize={dockSize}
          onChangeDockSize={onChangeDockSize}
        />
      </div>

      {/* Custom Ubuntu Context Menu */}
      <ContextMenu
        position={contextMenuPos}
        onClose={() => setContextMenuPos(null)}
        onOpenApp={handleOpenAppShortcut}
        onCycleWallpaper={handleCycleWallpaper}
        onMinimizeAll={onMinimizeAll}
      />
    </main>
  );
}


