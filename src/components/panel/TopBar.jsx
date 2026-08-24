import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Volume2, 
  Battery, 
  ChevronDown, 
  LayoutGrid,
  Sparkles,
  Briefcase
} from 'lucide-react';
import QuickSettings from './QuickSettings';
import CalendarMenu from './CalendarMenu';
import HireMeModal from './HireMeModal';
import { isMobileDevice } from '../../utils/deviceUtils';

export default function TopBar({ 
  activeAppTitle, 
  onToggleActivities, 
  isActivitiesOpen,
  onOpenSettings,
  onLock,
  onReboot,
  onPowerOff,
  onTriggerMobileWarning
}) {
  const [timeString, setTimeString] = useState('');
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
      setTimeString(now.toLocaleDateString('en-US', options).replace(',', ''));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowQuickSettings(false);
      setShowCalendar(false);
      setShowHireModal(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Mobile device/viewport check helper for top bar interactive items
  const handleItemClick = (e, action) => {
    e.stopPropagation();
    if (isMobileDevice()) {
      if (onTriggerMobileWarning) {
        onTriggerMobileWarning();
      }
      return;
    }
    action();
  };

  return (
    <header className="h-7 bg-[#111111]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 text-xs font-sans select-none z-40 relative text-white">
      {/* Left: Activities & Active Window Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            handleItemClick(e, () => {
              if (onToggleActivities) {
                onToggleActivities();
              }
            });
          }}
          className={`px-2.5 py-0.5 rounded-md transition-colors flex items-center gap-1.5 font-medium ${
            isActivitiesOpen 
              ? 'bg-ubuntu-orange text-white' 
              : 'hover:bg-white/10 text-white/90'
          }`}
          title="Activities Dashboard (Super Key)"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Activities</span>
        </button>

        {activeAppTitle && (
          <span className="hidden sm:inline-block font-semibold text-white/80 border-l border-white/15 pl-3">
            {activeAppTitle}
          </span>
        )}
      </div>

      {/* Center: Realtime Clock & Date */}
      <div className="relative">
        <button
          onClick={(e) => {
            handleItemClick(e, () => {
              setShowCalendar(!showCalendar);
              setShowQuickSettings(false);
              setShowHireModal(false);
            });
          }}
          className={`px-3 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            showCalendar ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
          }`}
          title="Calendar & Notifications (Click to open)"
        >
          <span>{timeString}</span>
        </button>

        {showCalendar && (
          <CalendarMenu onClose={() => setShowCalendar(false)} />
        )}
      </div>

      {/* Right: Hire Me Button + Status Icons Tray & Quick Settings */}
      <div className="relative flex items-center gap-2">
        {/* Sleek Hire Me / Get in Touch Button */}
        <div className="relative">
          <button
            onClick={(e) => {
              handleItemClick(e, () => {
                setShowHireModal(!showHireModal);
                setShowQuickSettings(false);
                setShowCalendar(false);
              });
            }}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium text-[11px] transition-all shadow-sm cursor-pointer ${
              showHireModal
                ? 'bg-ubuntu-orange text-white ring-2 ring-ubuntu-orange/40'
                : 'bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/40 hover:bg-ubuntu-orange hover:text-white'
            }`}
            title="Get in Touch & Candidate Offer Details"
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span className="font-semibold tracking-wide">Hire Me</span>
          </button>

          {showHireModal && (
            <HireMeModal onClose={() => setShowHireModal(false)} />
          )}
        </div>

        {/* Status Tray (Wifi, Volume, Battery) */}
        <button
          onClick={(e) => {
            handleItemClick(e, () => {
              setShowQuickSettings(!showQuickSettings);
              setShowCalendar(false);
              setShowHireModal(false);
            });
          }}
          className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
            showQuickSettings ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'
          }`}
          title="System Tray: Wi-Fi (Connected to Aryan's Portfolio) & Battery (100% Fueled by Coffee)"
        >
          <span title="Wi-Fi: Connected to Aryan's Portfolio">
            <Wifi className="w-3.5 h-3.5 hover:text-emerald-400 transition-colors" />
          </span>
          <Volume2 className="w-3.5 h-3.5" />
          <div 
            className="flex items-center gap-1"
            title="Battery: 100% Fueled by Coffee ☕"
          >
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-mono font-medium hidden sm:inline text-emerald-400">100%</span>
          </div>
          <ChevronDown className="w-3 h-3 text-white/50" />
        </button>

        {showQuickSettings && (
          <QuickSettings
            onClose={() => setShowQuickSettings(false)}
            onOpenSettings={onOpenSettings}
            onLock={onLock}
            onReboot={onReboot}
            onPowerOff={onPowerOff}
          />
        )}
      </div>
    </header>
  );
}
