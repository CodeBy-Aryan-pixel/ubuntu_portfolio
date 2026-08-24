import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Check, 
  Copy, 
  X, 
  Sparkles, 
  Briefcase, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function HireMeModal({ onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="absolute top-8 right-2 sm:right-16 w-80 sm:w-96 bg-[#242424]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-2xl z-50 text-white select-none animate-slide-down text-xs font-sans space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ubuntu-orange to-ubuntu-aubergine-mid flex items-center justify-center font-bold text-base text-white shadow-md border border-white/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white">{personal.name}</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-ubuntu-orange font-medium">
              Software Engineer • Available for Hire
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Candidate Status Banner */}
      <div className="bg-[#1E1E1E] p-3 rounded-xl border border-white/5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Status: Open to Opportunities</span>
        </div>
        <p className="text-[11px] text-white/70 leading-relaxed">
          Full-Time Software Engineering Roles & SDE Internships. Specialized in AI, Full Stack & Scalable Distributed Systems.
        </p>
      </div>

      {/* Direct Contact Methods */}
      <div className="space-y-2">
        {/* Email Row */}
        <div className="flex items-center justify-between bg-[#1E1E1E] p-2.5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-accent/20 text-accent">
              <Mail className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-white/40 uppercase font-mono">Email Address</div>
              <a 
                href={`mailto:${personal.email}`} 
                className="font-medium text-white hover:text-accent transition-colors truncate block"
              >
                {personal.email}
              </a>
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            title="Copy Email"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-ubuntu-orange text-white/70 hover:text-white transition-colors shrink-0"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Phone Row */}
        <div className="flex items-center justify-between bg-[#1E1E1E] p-2.5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-white/40 uppercase font-mono">Phone / WhatsApp</div>
              <span className="font-medium text-white font-mono truncate block">
                {personal.phone}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopyPhone}
            title="Copy Phone"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-600 text-white/70 hover:text-white transition-colors shrink-0"
          >
            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Social Profile Links Grid */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-white border border-blue-500/30 transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2">
            <FaLinkedin className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="font-semibold text-xs">LinkedIn</span>
          </div>
          <ExternalLink className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
        </a>

        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2">
            <FaGithub className="w-4 h-4 text-white" />
            <span className="font-semibold text-xs">GitHub</span>
          </div>
          <ExternalLink className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Action Footer: Resume Download */}
      <div className="pt-2 border-t border-white/10 flex items-center gap-2">
        <a
          href="https://drive.google.com/uc?export=download&id=1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-ubuntu-orange/25 transition-all text-center"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume (PDF)</span>
        </a>
      </div>
    </div>
  );
}
