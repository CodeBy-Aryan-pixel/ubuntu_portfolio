import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone,
  FileText, 
  Sparkles, 
  Check, 
  Copy,
  Code2,
  GraduationCap,
  Download
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

export default function AboutApp({ onOpenTerminal }) {
  const [activeTab, setActiveTab] = useState('bio.md');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* Gedit Header Tabs */}
      <div className="h-10 bg-[#282828] border-b border-white/10 flex items-center px-2 gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('bio.md')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-medium transition-colors ${
            activeTab === 'bio.md'
              ? 'bg-[#1E1E1E] text-white border-t-2 border-ubuntu-orange'
              : 'text-white/50 hover:bg-white/5 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-ubuntu-orange" />
          <span>bio.md</span>
        </button>
        <button
          onClick={() => setActiveTab('contact.json')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-medium transition-colors ${
            activeTab === 'contact.json'
              ? 'bg-[#1E1E1E] text-white border-t-2 border-ubuntu-orange'
              : 'text-white/50 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>contact.json</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#1E1E1E]">
        {activeTab === 'bio.md' ? (
          <div className="space-y-5 max-w-2xl mx-auto">
            {/* Profile Overview Card */}
            <div className="bg-[#242424] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-lg">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ubuntu-orange via-ubuntu-aubergine-mid to-ubuntu-aubergine-dark flex items-center justify-center text-3xl font-bold text-white shadow-xl shrink-0 border border-white/10">
                A
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h1 className="text-xl font-bold text-white">{personal.name}</h1>
                <div className="text-ubuntu-orange font-medium text-xs">
                  {personal.title}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-white/60 pt-1">
                  <GraduationCap className="w-3.5 h-3.5 text-ubuntu-orange" />
                  <span>{personal.education}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-[11px] text-white/50">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-ubuntu-orange" />
                    {personal.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-ubuntu-orange" />
                    {personal.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Markdown Body */}
            <div className="bg-[#242424] border border-white/10 rounded-xl p-5 space-y-4 text-xs sm:text-sm leading-relaxed text-white/80">
              <div>
                <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-ubuntu-orange" />
                  <span>Professional Summary</span>
                </h3>
                <p className="text-white/75 mt-1 leading-relaxed">
                  {personal.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm text-xs"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#E95420] hover:bg-[#d04313] text-white font-medium flex items-center gap-1.5 transition-colors text-xs shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume (PDF)</span>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5 transition-colors text-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5 transition-colors text-xs"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* JSON view */
          <div className="bg-[#181818] p-4 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto">
            <pre>
{JSON.stringify(
  {
    name: personal.name,
    title: personal.title,
    education: personal.education,
    email: personal.email,
    phone: personal.phone,
    linkedin: personal.linkedinDisplay,
    github: personal.githubDisplay,
    summary: personal.summary
  },
  null,
  2
)}
            </pre>
          </div>
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="h-6 bg-[#242424] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-white/50 shrink-0 font-mono">
        <div>UTF-8 • Markdown • LF</div>
        <div>Tab Width: 2 • Ln 1, Col 1</div>
      </div>
    </div>
  );
}
