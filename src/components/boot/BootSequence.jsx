import React, { useState, useEffect, useRef } from 'react';
import { FastForward, Sparkles, Terminal } from 'lucide-react';

const BOOT_LOG_ENTRIES = [
  { text: '/dev/nvme0n1p2: clean, 412850/30531584 files, 5192840/122070016 blocks', isRaw: true },
  { text: '[  0.004128] Linux version 6.8.0-45-generic (aryan-kamat@ubuntu-workstation) (x86_64)', isRaw: true },
  { status: 'OK', text: 'Started System Initialization & Hardware Probing...' },
  { status: 'OK', text: 'Mounting virtual file systems (proc, sysfs, devtmpfs)...' },
  { status: 'OK', text: 'Starting Docker container services & Docker daemon...' },
  { status: 'OK', text: 'Loading MERN stack architecture (React 19, Node.js, Express, MongoDB)...' },
  { status: 'OK', text: 'Initializing TensorFlow.js neural engine & VisionLab inference...' },
  { status: 'OK', text: 'Loading Verified Credentials, Certifications & Projects Registry...' },
  { status: 'OK', text: 'Starting AryanOS Desktop Environment (GNOME 46 Wayland compositor)...' },
  { status: 'WELCOME', text: 'Welcome to Aryan Kamat - Software Engineer Portfolio.' }
];

export default function BootSequence({ onBootComplete }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [stage, setStage] = useState('terminal'); // 'terminal' | 'logo' | 'fading'
  const logContainerRef = useRef(null);

  // Auto-scroll logs to bottom as they appear
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  useEffect(() => {
    let currentIndex = 0;
    let isCancelled = false;

    // Fast sequential log interval over ~2.4 seconds
    const intervalTime = 220; // 10 items * 220ms ~= 2.2s

    const logInterval = setInterval(() => {
      if (isCancelled) return;

      if (currentIndex < BOOT_LOG_ENTRIES.length) {
        const item = BOOT_LOG_ENTRIES[currentIndex];
        setDisplayedLogs((prev) => [...prev, item]);
        currentIndex++;
      } else {
        clearInterval(logInterval);

        // Transition to Logo Flash Stage
        setTimeout(() => {
          if (isCancelled) return;
          setStage('logo');

          // Hold logo briefly, then fade out
          setTimeout(() => {
            if (isCancelled) return;
            setStage('fading');

            // Complete boot after fade duration
            setTimeout(() => {
              if (isCancelled) return;
              if (onBootComplete) onBootComplete();
            }, 600);
          }, 850);
        }, 350);
      }
    }, intervalTime);

    // Escape/Enter keyboard listener for instant skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isCancelled = true;
      clearInterval(logInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBootComplete]);

  const handleSkip = () => {
    setStage('fading');
    setTimeout(() => {
      if (onBootComplete) onBootComplete();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black text-[#F2F2F2] flex flex-col justify-between p-4 sm:p-8 font-mono select-none transition-opacity duration-700 ease-in-out ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      }}
    >
      {/* Top Header Bar: System Kernel Info & Quick Skip Button */}
      <div className="w-full flex items-center justify-between text-xs text-white/40 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">GRUB Bootloader • Ubuntu Linux 6.8.0-45-generic</span>
          <span className="sm:hidden">Ubuntu Boot</span>
        </div>

        <button
          onClick={handleSkip}
          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center gap-1.5 transition-all text-xs border border-white/10 hover:border-ubuntu-orange/40 font-sans"
          title="Press Esc or Click to Skip Boot Animation"
        >
          <span>Skip Boot</span>
          <FastForward className="w-3 h-3 text-ubuntu-orange" />
        </button>
      </div>

      {/* Main Center Area: Switches between Terminal Logs and Ubuntu Flash Logo */}
      <div className="flex-1 flex flex-col justify-center items-center my-4 overflow-hidden relative">
        {/* STAGE 1: Linux Terminal Startup Logs */}
        {stage === 'terminal' && (
          <div
            ref={logContainerRef}
            className="w-full max-w-4xl max-h-[75vh] overflow-y-auto space-y-1.5 text-xs sm:text-sm leading-relaxed p-4 bg-[#0A0A0A]/80 rounded-xl border border-white/5 shadow-2xl backdrop-blur-sm"
          >
            {displayedLogs.map((item, idx) => {
              if (item.isRaw) {
                return (
                  <div key={idx} className="text-white/60 font-mono tracking-tight">
                    {item.text}
                  </div>
                );
              }

              if (item.status === 'WELCOME') {
                return (
                  <div
                    key={idx}
                    className="pt-2 text-ubuntu-orange font-bold text-sm sm:text-base flex items-center gap-2 animate-fade-in"
                  >
                    <Sparkles className="w-4 h-4 text-ubuntu-orange animate-pulse" />
                    <span>{item.text}</span>
                  </div>
                );
              }

              return (
                <div key={idx} className="flex items-start gap-2.5 font-mono text-white/90">
                  <span className="shrink-0 text-white/40">[</span>
                  <span className="shrink-0 font-bold text-[#4AF626] tracking-wider">
                    &nbsp;&nbsp;OK&nbsp;&nbsp;
                  </span>
                  <span className="shrink-0 text-white/40">]</span>
                  <span className="text-white/90">{item.text}</span>
                </div>
              );
            })}

            {/* Terminal Live Cursor */}
            <div className="flex items-center gap-1 text-emerald-400 pt-1">
              <span>root@aryan-ubuntu:~#</span>
              <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
            </div>
          </div>
        )}

        {/* STAGE 2: Sleek Ubuntu Flash / Splash Logo Transition */}
        {(stage === 'logo' || stage === 'fading') && (
          <div className="flex flex-col items-center justify-center gap-6 animate-scale-in">
            {/* Glowing Ubuntu Circle of Friends Emblem */}
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-4 bg-gradient-to-r from-ubuntu-orange via-ubuntu-aubergine-mid to-ubuntu-orange rounded-full blur-2xl opacity-40 animate-pulse" />

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-ubuntu-orange via-[#E95420] to-[#77216F] flex items-center justify-center shadow-[0_0_50px_rgba(233,84,32,0.5)] border-2 border-white/20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#111111] flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-ubuntu-orange to-amber-500 shadow-inner flex items-center justify-center text-white font-bold text-xs font-sans">
                    AK
                  </div>
                </div>
              </div>
            </div>

            {/* Ubuntu Brand & OS Metadata */}
            <div className="text-center font-sans space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-ubuntu">
                  ubuntu
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/40 font-bold">
                  24.04 LTS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-mono">
                Aryan Kamat • Software Engineer Portfolio
              </p>
              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-mono pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>systemd: graphical.target reached [Ready]</span>
              </div>
            </div>

            {/* Ubuntu Radial Spinner */}
            <div className="w-7 h-7 border-2 border-ubuntu-orange/20 border-t-ubuntu-orange rounded-full animate-spin mt-2" />
          </div>
        )}
      </div>

      {/* Bottom Footer: System Telemetry */}
      <div className="w-full flex items-center justify-between text-[11px] text-white/30 pt-2 border-t border-white/10 font-mono">
        <div>Init: systemd 255.4-1ubuntu8 • AryanOS</div>
        <div className="hidden sm:block">GNOME Wayland 46.2 • Full Stack Environment</div>
      </div>
    </div>
  );
}
