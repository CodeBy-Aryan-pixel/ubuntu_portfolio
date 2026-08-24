import React, { useState } from 'react';
import { 
  Wifi, 
  Volume2, 
  Sun, 
  Power, 
  Lock, 
  Bluetooth, 
  Zap, 
  Sliders, 
  Coffee,
  CheckCircle2
} from 'lucide-react';

export default function QuickSettings({ 
  onClose, 
  onLock, 
  onReboot, 
  onPowerOff,
  onOpenSettings 
}) {
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [volume, setVolume] = useState(90);
  const [brightness, setBrightness] = useState(100);
  const [caffeineBoost, setCaffeineBoost] = useState(true);

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="absolute top-8 right-2 w-[21rem] sm:w-[23rem] bg-[#202020]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl z-50 text-white select-none animate-slide-down text-xs font-sans"
    >
      {/* 1. System Quick Status Strip */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/10 text-[11px] font-mono w-full">
        <div className="flex items-center gap-2 text-emerald-400 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold whitespace-nowrap">System Online</span>
        </div>
        <span className="text-white/40 whitespace-nowrap text-[10.5px]">Ubuntu 24.04 LTS</span>
      </div>

      {/* 2. Interactive 2x2 Quick Toggles Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3.5">
        {/* Wi-Fi: Connected to Aryan's Portfolio */}
        <button
          onClick={() => setWifiOn(!wifiOn)}
          className={`w-full flex flex-col items-start justify-center p-3 rounded-xl transition-all text-left min-w-0 overflow-hidden cursor-pointer ${
            wifiOn 
              ? 'bg-ubuntu-orange text-white shadow-md shadow-ubuntu-orange/20' 
              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
          }`}
          title={wifiOn ? "Wi-Fi: Connected to Aryan's Portfolio" : "Wi-Fi: Disconnected"}
        >
          <div className="flex items-center gap-2 mb-1 w-full min-w-0">
            <Wifi className="w-4 h-4 shrink-0" />
            <span className="font-bold text-xs whitespace-nowrap truncate">Wi-Fi</span>
          </div>
          <span className="text-[10.5px] opacity-90 truncate font-mono w-full block text-left">
            {wifiOn ? "Connected to Aryan's Portfolio" : 'Disconnected'}
          </span>
        </button>

        {/* Battery: 100% Fueled by Coffee */}
        <button
          onClick={() => setCaffeineBoost(!caffeineBoost)}
          className={`w-full flex flex-col items-start justify-center p-3 rounded-xl transition-all text-left min-w-0 overflow-hidden cursor-pointer ${
            caffeineBoost 
              ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/20' 
              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
          }`}
          title="Battery: 100% Fueled by Coffee"
        >
          <div className="flex items-center gap-2 mb-1 w-full min-w-0">
            <Coffee className="w-4 h-4 shrink-0 text-amber-200" />
            <span className="font-bold text-xs whitespace-nowrap truncate">Battery: 100%</span>
          </div>
          <span className="text-[10.5px] opacity-90 truncate font-mono w-full block text-left">
            {caffeineBoost ? 'Fueled by Coffee ☕' : 'Power Saver (99%)'}
          </span>
        </button>

        {/* Bluetooth */}
        <button
          onClick={() => setBluetoothOn(!bluetoothOn)}
          className={`w-full flex flex-col items-start justify-center p-3 rounded-xl transition-all text-left min-w-0 overflow-hidden cursor-pointer ${
            bluetoothOn 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
              : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
          }`}
          title={bluetoothOn ? "Bluetooth: Paired (Developer Workstation)" : "Bluetooth: Disabled"}
        >
          <div className="flex items-center gap-2 mb-1 w-full min-w-0">
            <Bluetooth className="w-4 h-4 shrink-0" />
            <span className="font-bold text-xs whitespace-nowrap truncate">Bluetooth</span>
          </div>
          <span className="text-[10.5px] opacity-90 truncate font-mono w-full block text-left">
            {bluetoothOn ? 'Paired (Workstation)' : 'Disabled'}
          </span>
        </button>

        {/* Power Mode */}
        <div 
          className="w-full flex flex-col items-start justify-center p-3 rounded-xl bg-white/10 text-white border border-white/5 min-w-0 overflow-hidden"
          title="Power Mode: High Performance"
        >
          <div className="flex items-center gap-2 mb-1 w-full min-w-0">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-xs whitespace-nowrap truncate text-white">Power Mode</span>
          </div>
          <span className="text-[10.5px] text-emerald-400 font-mono w-full truncate block text-left font-medium">
            High Performance ⚡
          </span>
        </div>
      </div>

      {/* 3. Sliders Area (Volume & Brightness) */}
      <div className="space-y-3 bg-black/40 p-3.5 rounded-xl border border-white/10 mb-3.5 shadow-inner w-full">
        {/* Volume Slider */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-white/70 shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-ubuntu-orange bg-white/20 rounded-lg h-1.5 cursor-pointer"
          />
          <span className="text-[11px] font-mono text-white/70 w-9 text-right font-semibold whitespace-nowrap">{volume}%</span>
        </div>

        {/* Brightness Slider */}
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-white/70 shrink-0" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-ubuntu-orange bg-white/20 rounded-lg h-1.5 cursor-pointer"
          />
          <span className="text-[11px] font-mono text-white/70 w-9 text-right font-semibold whitespace-nowrap">{brightness}%</span>
        </div>
      </div>

      {/* 4. Bottom System Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-white/80">
        <button
          onClick={() => {
            onOpenSettings && onOpenSettings();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 hover:text-white transition-colors text-xs font-medium cursor-pointer"
          title="Open Settings"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onLock && onLock();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
            title="Lock Session"
          >
            <Lock className="w-3.5 h-3.5 text-white/80" />
          </button>
          <button
            onClick={() => {
              if (onPowerOff) {
                onPowerOff();
              } else if (onReboot) {
                onReboot();
              }
              onClose();
            }}
            className="p-2 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white transition-colors cursor-pointer"
            title="Power Off / Shut Down System"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
