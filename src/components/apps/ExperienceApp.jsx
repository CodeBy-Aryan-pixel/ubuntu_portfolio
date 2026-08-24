import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Briefcase, 
  Calendar
} from 'lucide-react';

export default function ExperienceApp() {
  const experience = portfolioData?.experience || [];

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* Top Header */}
      <div className="h-12 bg-[#282828] border-b border-white/10 flex items-center justify-between px-4 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-ubuntu-orange" />
          <span className="font-bold text-sm text-white">Experience & Internships</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#1E1E1E]">
        <div className="max-w-2xl mx-auto space-y-4">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#242424] border border-white/10 rounded-xl p-5 shadow-lg space-y-3 hover:border-ubuntu-orange/40 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{exp.title}</h3>
                  <div className="text-ubuntu-orange font-medium text-xs mt-0.5">{exp.organization}</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Bullet-point descriptions */}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside leading-relaxed pt-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-gray-300">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
