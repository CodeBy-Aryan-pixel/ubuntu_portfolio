import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Settings, 
  Image as ImageIcon, 
  Palette, 
  Layout, 
  Info, 
  Check 
} from 'lucide-react';

export default function SettingsApp({ 
  currentWallpaper, 
  onSelectWallpaper, 
  setWallpaper,
  accentColor, 
  onSelectAccentColor,
  dockSize,
  onChangeDockSize 
}) {
  const [activeTab, setActiveTab] = React.useState('appearance');

  const { wallpapers, systemInfo } = portfolioData;

  const accentColors = [
    { name: 'Ubuntu Orange', color: '#E95420' },
    { name: 'Bark / Amber', color: '#E5A50A' },
    { name: 'Sage / Emerald', color: '#26A269' },
    { name: 'Teal / Cyan', color: '#3584E4' },
    { name: 'Prussian Purple', color: '#9141AC' },
    { name: 'Magenta Rose', color: '#C061CB' },
  ];

  const handleChooseWallpaper = (wp) => {
    if (onSelectWallpaper) {
      onSelectWallpaper(wp);
    }
    if (setWallpaper) {
      setWallpaper(wp.bgClass || wp);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* Top Header */}
      <div className="h-11 bg-[#282828] border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
        <Settings className="w-4 h-4 text-ubuntu-orange" />
        <span className="font-bold text-xs text-white">Settings — Appearance & System</span>
      </div>

      {/* Main Container (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 sm:w-52 bg-[#242424] border-r border-white/10 p-2 space-y-1 shrink-0">
          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'appearance'
                ? 'bg-ubuntu-orange text-white font-semibold'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </button>
          <button
            onClick={() => setActiveTab('dock')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'dock'
                ? 'bg-ubuntu-orange text-white font-semibold'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Ubuntu Dock</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'about'
                ? 'bg-ubuntu-orange text-white font-semibold'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About System</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 bg-[#1E1E1E]">
          {activeTab === 'appearance' && (
            <>
              {/* Background Wallpapers */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-ubuntu-orange" />
                  <h3 className="font-bold text-sm text-white">Desktop Wallpaper</h3>
                </div>
                <p className="text-white/60 text-xs">
                  Select a live dynamic gradient to customize your Ubuntu desktop in real-time.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 pt-2">
                  {wallpapers.map((wp) => {
                    const isSelected =
                      (typeof currentWallpaper === 'object' && currentWallpaper?.id === wp.id) ||
                      (typeof currentWallpaper === 'string' && currentWallpaper === wp.bgClass);

                    return (
                      <div
                        key={wp.id}
                        onClick={() => handleChooseWallpaper(wp)}
                        className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-video flex flex-col justify-end p-3 shadow-md ${
                          isSelected
                            ? 'border-ubuntu-orange ring-2 ring-ubuntu-orange/40 shadow-xl scale-[1.02]'
                            : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                        }`}
                      >
                        {/* Background Thumbnail Gradient */}
                        <div className={`absolute inset-0 ${wp.bgClass}`} />

                        {/* Ambient dark bottom fade for title contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Overlay selection icon */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-ubuntu-orange text-white flex items-center justify-center shadow-lg border border-white/20">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <span className="relative z-10 text-xs font-bold text-white drop-shadow-md truncate">
                          {wp.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Palette */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-ubuntu-orange" />
                  <h3 className="font-bold text-sm text-white">Accent Color</h3>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  {accentColors.map((acc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectAccentColor && onSelectAccentColor(acc.color)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2A2A2A] border border-white/10 transition-colors"
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-inner flex items-center justify-center text-white"
                        style={{ backgroundColor: acc.color }}
                      >
                        {accentColor === acc.color && <Check className="w-2.5 h-2.5" />}
                      </span>
                      <span className="text-white text-xs">{acc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'dock' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Layout className="w-4 h-4 text-ubuntu-orange" />
                <span>Dash-to-Dock Configuration</span>
              </h3>
              <div className="bg-[#242424] p-4 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Dock Icon Size</div>
                    <div className="text-[11px] text-white/50">Adjust left launcher button scale</div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#1E1E1E] p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => onChangeDockSize && onChangeDockSize('sm')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        dockSize === 'sm' ? 'bg-ubuntu-orange text-white font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Small
                    </button>
                    <button
                      onClick={() => onChangeDockSize && onChangeDockSize('md')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        dockSize === 'md' ? 'bg-ubuntu-orange text-white font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => onChangeDockSize && onChangeDockSize('lg')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        dockSize === 'lg' ? 'bg-ubuntu-orange text-white font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-ubuntu-orange" />
                <span>System Specifications</span>
              </h3>
              <div className="bg-[#242424] p-5 rounded-xl border border-white/10 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-ubuntu-orange flex items-center justify-center font-bold text-white text-xl">
                    U
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{systemInfo.os}</div>
                    <div className="text-[11px] text-white/50">{systemInfo.host}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-white/50">Kernel:</span>
                    <div className="font-mono text-white mt-0.5">{systemInfo.kernel}</div>
                  </div>
                  <div>
                    <span className="text-white/50">Desktop Environment:</span>
                    <div className="font-mono text-white mt-0.5">{systemInfo.de}</div>
                  </div>
                  <div>
                    <span className="text-white/50">Shell:</span>
                    <div className="font-mono text-white mt-0.5">{systemInfo.shell}</div>
                  </div>
                  <div>
                    <span className="text-white/50">Memory:</span>
                    <div className="font-mono text-white mt-0.5">{systemInfo.memory}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
