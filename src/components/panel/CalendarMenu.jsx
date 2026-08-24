import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export default function CalendarMenu({ onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="absolute top-8 left-1/2 -translate-x-1/2 w-84 sm:w-[420px] bg-[#202020]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl z-50 text-white select-none animate-slide-down text-xs font-sans"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Calendar Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-white">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1 rounded hover:bg-white/10 text-white/70 transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 hover:bg-white/20 text-white/80 transition-colors font-mono cursor-pointer"
                title="Jump to Today"
              >
                Today
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1 rounded hover:bg-white/10 text-white/70 transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
            {daysOfWeek.map((d, i) => (
              <div key={i} className="text-white/40 font-semibold py-0.5">{d}</div>
            ))}

            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="py-1" />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = isCurrentMonth && today.getDate() === dayNum;
              return (
                <div
                  key={`day-${dayNum}`}
                  className={`py-1 rounded-md text-xs font-medium transition-colors ${
                    isToday
                      ? 'bg-ubuntu-orange text-white font-bold shadow-md shadow-ubuntu-orange/30'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>

          {/* Today's Date Banner */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50 font-mono">
            <span>{today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-emerald-400">Timezone: IST (UTC+5:30)</span>
          </div>
        </div>

        {/* Notifications & Career Milestones Column */}
        <div className="space-y-3 sm:border-l sm:border-white/10 sm:pl-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-ubuntu-orange" />
                <span>Events & Milestones</span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="bg-[#282828] p-2.5 rounded-xl border border-white/5 space-y-1 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Open to SDE Roles</span>
                </div>
                <p className="text-white/70 text-[10px] leading-relaxed">
                  Actively available for Full-Stack & Machine Learning Developer opportunities.
                </p>
              </div>

              <div className="bg-[#282828] p-2.5 rounded-xl border border-white/5 space-y-1 hover:border-ubuntu-orange/30 transition-colors">
                <div className="flex items-center gap-1.5 text-ubuntu-orange font-bold text-[11px]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>B.Tech in CSE (Data Science)</span>
                </div>
                <p className="text-white/70 text-[10px] leading-relaxed">
                  D. Y. Patil College of Engineering • Expected 2027 • CGPA: 8.12
                </p>
              </div>

              <div className="bg-[#282828] p-2.5 rounded-xl border border-white/5 space-y-1 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credentials</span>
                </div>
                <p className="text-white/70 text-[10px] leading-relaxed">
                  Oracle Agentic AI, IBM Python 101 & Cisco Certifications loaded.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-white/40 font-mono text-center pt-1">
            Ubuntu Desktop Time Service
          </div>
        </div>
      </div>
    </div>
  );
}
