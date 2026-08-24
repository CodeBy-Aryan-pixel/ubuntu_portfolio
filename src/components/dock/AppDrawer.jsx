import React, { useState } from 'react';
import { 
  Terminal, 
  Folder, 
  Cpu, 
  Briefcase, 
  User, 
  FileText, 
  Settings, 
  Search, 
  Sparkles, 
  X, 
  Activity, 
  Layers,
  Camera
} from 'lucide-react';

import { FaCertificate, FaUsers, FaRobot } from 'react-icons/fa';

const ALL_APPS = [
  { id: 'visionlab', name: 'VisionLab (AI Engine)', desc: 'Real-time in-browser computer vision & COCO-SSD object detection via TensorFlow.js', icon: Camera, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { id: 'chatbot', name: 'Aryan AI Assistant', desc: 'Chat with Aryan’s simulated AI agent about projects, experience & tech', icon: FaRobot, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 'terminal', name: 'Terminal', desc: 'Interactive Bash CLI with Neofetch & Matrix', icon: Terminal, color: 'text-emerald-400', bg: 'bg-[#300A24]' },
  { id: 'files', name: 'Files (Projects)', desc: 'Explore AI/ML, Data Science, and Full Stack repositories', icon: Folder, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { id: 'skills', name: 'System Monitor (Skills)', desc: 'Inspect technical competence, metrics, and packages', icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 'experience', name: 'Experience & Internships', desc: 'Training Coordinator & Google AI-ML Virtual Intern records', icon: Briefcase, color: 'text-ubuntu-orange', bg: 'bg-ubuntu-orange/20' },
  { id: 'certifications', name: 'Certifications', desc: 'Oracle Agentic AI, IBM Python 101, and Cisco credentials', icon: FaCertificate, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'leadership', name: 'Leadership & Activities', desc: 'Google Developer Student Club Volunteer initiatives', icon: FaUsers, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { id: 'about', name: 'Text Editor (About Me)', desc: 'Developer summary, engineering background, and contact', icon: User, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'resume', name: 'Resume (Document Viewer)', desc: 'Full curriculum vitae with formatted sections', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { id: 'settings', name: 'Settings (Control Center)', desc: 'Change desktop wallpapers, accents, and dock preferences', icon: Settings, color: 'text-white/80', bg: 'bg-white/10' },
];

export default function AppDrawer({ isOpen, onClose, onLaunchApp }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredApps = ALL_APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 top-7 bg-black/80 backdrop-blur-2xl z-40 flex flex-col items-center p-6 sm:p-12 animate-fade-in select-none text-white font-sans"
    >
      {/* Top Search Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md relative mb-8"
      >
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type="text"
          placeholder="Type to search applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-ubuntu-orange transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* App Grid */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center overflow-y-auto max-h-[75vh] p-4"
      >
        {filteredApps.map((app) => {
          const IconComp = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => {
                onLaunchApp(app.id);
                onClose();
              }}
              className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white/10 transition-all transform hover:-translate-y-1 w-36 sm:w-44"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${app.bg} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                <IconComp className={`w-8 h-8 sm:w-10 sm:h-10 ${app.color}`} />
              </div>
              <span className="font-bold text-xs sm:text-sm text-white mt-2.5 group-hover:text-ubuntu-orange transition-colors">
                {app.name}
              </span>
              <span className="text-[11px] text-white/50 line-clamp-2 mt-0.5 leading-tight">
                {app.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
