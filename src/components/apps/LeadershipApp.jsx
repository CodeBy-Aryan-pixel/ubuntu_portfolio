import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { FaUsers } from 'react-icons/fa';

export default function LeadershipApp() {
  const leadership = portfolioData?.leadership || [];

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* Top Window Header */}
      <div className="h-12 bg-[#282828] border-b border-white/10 flex items-center justify-between px-4 gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <FaUsers className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white tracking-wide">Leadership & Activities</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#1E1E1E] flex flex-col justify-start">
        <div className="max-w-2xl mx-auto w-full space-y-4">
          {leadership.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl"
            >
              {/* Horizontally Aligned Header */}
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-sm">
                  <FaUsers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-normal">
                  {item.role || item}
                </h3>
                <span className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-xs border border-emerald-500/20 shrink-0 font-medium">
                  Volunteer
                </span>
              </div>

              {/* Clean, Readable Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-300 font-sans">
                {item.description || item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
