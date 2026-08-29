import React, { useState, useEffect } from 'react';
import BootSequence from './components/boot/BootSequence';
import TopBar from './components/panel/TopBar';
import Dock from './components/dock/Dock';
import AppDrawer from './components/dock/AppDrawer';
import ActivitiesOverlay from './components/activities/ActivitiesOverlay';
import Desktop from './components/desktop/Desktop';
import MobileWarningModal from './components/common/MobileWarningModal';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useWindowManager } from './hooks/useWindowManager';
import { portfolioData } from './data/portfolioData';
import { isMobileDevice } from './utils/deviceUtils';
import { ArrowRight, Power } from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState(portfolioData.wallpapers[0]);
  const [accentColor, setAccentColor] = useState('#E95420');
  const [dockSize, setDockSize] = useState('md');
  const [lockPassword, setLockPassword] = useState('');

  // Dynamically inject CSS variables onto :root when accent color changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.style.setProperty('--color-accent', accentColor);
    root.style.setProperty('--ubuntu-orange', accentColor);

    try {
      let cleanHex = accentColor.replace('#', '');
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map((x) => x + x).join('');
      }
      const num = parseInt(cleanHex, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;

      root.style.setProperty('--color-accent-rgb', `${r}, ${g}, ${b}`);
      root.style.setProperty('--color-accent-hover', `rgb(${Math.min(255, r + 25)}, ${Math.min(255, g + 25)}, ${Math.min(255, b + 25)})`);
      root.style.setProperty('--color-accent-light', `rgba(${r}, ${g}, ${b}, 0.18)`);
      root.style.setProperty('--color-accent-glow', `rgba(${r}, ${g}, ${b}, 0.45)`);
      root.style.setProperty('--ubuntu-orange-glow', `rgba(${r}, ${g}, ${b}, 0.45)`);
    } catch {
      root.style.setProperty('--color-accent-hover', accentColor);
      root.style.setProperty('--color-accent-light', 'rgba(233, 84, 32, 0.18)');
      root.style.setProperty('--color-accent-glow', 'rgba(233, 84, 32, 0.45)');
      root.style.setProperty('--ubuntu-orange-glow', 'rgba(233, 84, 32, 0.45)');
    }
  }, [accentColor]);

  const {
    windows,
    activeWindowId,
    stackOrder,
    isMobile,
    openWindow,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
  } = useWindowManager();

  // Centralized app open handler with robust mobile detection safeguard
  const handleOpenApp = (id, customData = null) => {
    if (isMobileDevice()) {
      setShowMobileWarning(true);
      return;
    }
    openWindow(id, customData);
  };

  // Minimize all windows handler for context menu
  const handleMinimizeAll = () => {
    Object.keys(windows || {}).forEach((id) => {
      if (windows[id]?.isOpen && !windows[id]?.isMinimized) {
        minimizeWindow(id);
      }
    });
  };

  // Reboot simulation
  const handleReboot = () => {
    setIsBooting(true);
  };

  // Simulated Power-Off handler
  const handlePowerOff = () => {
    setIsPoweredOff(true);
  };

  // Power-On handler (wakes up the system and launches boot sequence)
  const handlePowerOn = () => {
    setIsPoweredOff(false);
    setIsBooting(true);
  };

  const activeAppTitle = activeWindowId ? windows[activeWindowId]?.title : null;

  return (
    <ErrorBoundary isGlobal>
      <div className="w-screen h-screen overflow-hidden select-none bg-[#111111] text-[#F2F2F2] font-sans relative">
        {/* 0. Fullscreen Simulated Power-Off (System Halted) Screen */}
        {isPoweredOff && (
          <div
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none animate-fade-in p-6"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm text-center">
              {/* System Status Title */}
              <div className="space-y-1">
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest font-semibold">
                  System Halted
                </div>
                <p className="text-gray-600 text-xs font-mono">
                  Workstation is powered off
                </p>
              </div>

              {/* Glowing Interactive Power Button */}
              <button
                onClick={handlePowerOn}
                className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#181818] hover:bg-[#202020] border-2 border-white/15 hover:border-ubuntu-orange text-gray-500 hover:text-ubuntu-orange flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(233,84,32,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
                title="Click to Power On System"
              >
                {/* Ambient glow backdrop ring */}
                <div className="absolute inset-0 rounded-full bg-ubuntu-orange/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                <Power className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
              </button>

              {/* Instructional Subtext */}
              <div className="text-gray-500 font-mono text-[11px] tracking-wide animate-pulse">
                Click power button to boot AryanOS
              </div>
            </div>
          </div>
        )}

        {/* 1. Linux Kernel & Ubuntu Boot Splash Sequence */}
        {isBooting && !isPoweredOff && (
          <BootSequence onBootComplete={() => setIsBooting(false)} />
        )}

        {/* 2. GNOME Lock Screen */}
        {isLocked && (
          <div 
            style={{ background: currentWallpaper?.bgClass ? undefined : '#2C001E' }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 text-white ${currentWallpaper?.bgClass} backdrop-blur-3xl animate-fade-in`}
          >
            <div className="text-center mt-12 space-y-1">
              <div className="text-5xl sm:text-6xl font-light tracking-tight">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              <div className="text-sm font-medium text-white/70">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* User Unlock Card */}
            <div className="bg-[#242424]/90 backdrop-blur-xl border border-white/15 p-6 rounded-2xl w-full max-w-sm flex flex-col items-center shadow-2xl text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ubuntu-orange to-ubuntu-aubergine-mid flex items-center justify-center font-bold text-3xl text-white shadow-lg border-2 border-white/20">
                A
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{portfolioData.personal.name}</h2>
                <p className="text-xs text-ubuntu-orange">{portfolioData.personal.title}</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLocked(false);
                  setLockPassword('');
                }}
                className="w-full space-y-2"
              >
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Press Enter or Click Unlock"
                    value={lockPassword}
                    onChange={(e) => setLockPassword(e.target.value)}
                    autoFocus
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-ubuntu-orange pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-ubuntu-orange text-white hover:bg-ubuntu-orange-hover transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
              <span>Ubuntu 24.04 LTS</span>
              <span>•</span>
              <button 
                onClick={() => setIsLocked(false)} 
                className="hover:text-white underline"
              >
                Unlock Guest Session
              </button>
            </div>
          </div>
        )}

        {/* 3. Main Linux Desktop Environment */}
        <TopBar
          activeAppTitle={activeAppTitle}
          onToggleActivities={() => setIsActivitiesOpen((prev) => !prev)}
          isActivitiesOpen={isActivitiesOpen}
          onOpenSettings={() => handleOpenApp('settings')}
          onLock={() => setIsLocked(true)}
          onReboot={handleReboot}
          onPowerOff={handlePowerOff}
          onTriggerMobileWarning={() => setShowMobileWarning(true)}
        />

        <Dock
          windows={windows}
          activeWindowId={activeWindowId}
          onOpenApp={handleOpenApp}
          onToggleMinimize={minimizeWindow}
          onToggleAppDrawer={() => {
            if (isMobileDevice()) {
              setShowMobileWarning(true);
              return;
            }
            setIsAppDrawerOpen((prev) => !prev);
          }}
          isAppDrawerOpen={isAppDrawerOpen}
          dockSize={dockSize}
          onTriggerMobileWarning={() => setShowMobileWarning(true)}
        />

        <Desktop
          windows={windows}
          activeWindowId={activeWindowId}
          stackOrder={stackOrder}
          isMobile={isMobile}
          onOpenApp={handleOpenApp}
          onFocusWindow={focusWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onToggleMaximize={toggleMaximize}
          currentWallpaper={currentWallpaper}
          onSelectWallpaper={setCurrentWallpaper}
          accentColor={accentColor}
          onSelectAccentColor={setAccentColor}
          dockSize={dockSize}
          onChangeDockSize={setDockSize}
          onMinimizeAll={handleMinimizeAll}
        />

        {/* 4. Fullscreen GNOME Activities Dashboard & Global Search */}
        <ActivitiesOverlay
          isOpen={isActivitiesOpen}
          onClose={() => setIsActivitiesOpen(false)}
          onLaunchApp={(id) => handleOpenApp(id)}
        />

        {/* 5. Fullscreen GNOME Application Drawer */}
        <AppDrawer
          isOpen={isAppDrawerOpen}
          onClose={() => setIsAppDrawerOpen(false)}
          onLaunchApp={(id) => handleOpenApp(id)}
        />

        {/* 6. Custom Ubuntu In-App Mobile Warning Modal */}
        <MobileWarningModal
          isOpen={showMobileWarning}
          onClose={() => setShowMobileWarning(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
