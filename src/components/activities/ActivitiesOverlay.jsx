import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Folder, Briefcase, Cpu, ArrowRight } from 'lucide-react';

const SEARCH_INDEX = [
  {
    id: 'visionlab',
    title: 'VisionLab — AI Model Inference Engine',
    category: 'AI Engine',
    keywords: ['tensorflow', 'vision', 'object detection', 'coco-ssd', 'ai', 'computer vision', 'webcam', 'model'],
    description: 'In-browser real-time object detection and neural network inference powered by TensorFlow.js and COCO-SSD.'
  },
  {
    id: 'files',
    title: 'Customer Churn Analysis',
    category: 'Project',
    keywords: ['python', 'pandas', 'scikit-learn', 'machine learning', 'data science'],
    description: 'Predictive machine learning model analyzing telecom customer retention.'
  },
  {
    id: 'files',
    title: 'Talent Forge AI',
    category: 'Project',
    keywords: ['next.js', 'microservices', 'ai', 'resume building'],
    description: 'AI-driven resume parsing and ATS matching platform built with microservices.'
  },
  {
    id: 'experience',
    title: 'AI-ML Virtual Intern (EduSkills / Google)',
    category: 'Experience',
    keywords: ['internship', 'google', 'python', 'numpy', 'model development'],
    description: 'Hands-on AI/ML models development and evaluation supported by Google for Developers.'
  },
  {
    id: 'experience',
    title: 'Training Coordinator (D.Y. Patil College)',
    category: 'Experience',
    keywords: ['leadership', 'management', 'placement', 'training'],
    description: 'Coordinated student placement training, tech seminars, and company drives.'
  },
  {
    id: 'skills',
    title: 'Core Skills',
    category: 'Skills',
    keywords: ['java', 'c++', 'go', 'golang', 'sql', 'kubernetes', 'linux', 'bash'],
    description: 'Data Structures, Algorithms, Linux administration, Docker, and DevOps stack.'
  }
];

const CATEGORY_STYLES = {
  Project: {
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Folder
  },
  Experience: {
    badge: 'bg-ubuntu-orange/20 text-ubuntu-orange border-ubuntu-orange/30',
    icon: Briefcase
  },
  Skills: {
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: Cpu
  }
};

export default function ActivitiesOverlay({ isOpen, onClose, onLaunchApp }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Focus input and add Escape listener when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real-time filtering by title or keywords
  const trimmed = query.trim().toLowerCase();
  const filteredResults = trimmed === ''
    ? SEARCH_INDEX
    : SEARCH_INDEX.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(trimmed);
        const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(trimmed));
        const categoryMatch = item.category.toLowerCase().includes(trimmed);
        return titleMatch || keywordMatch || categoryMatch;
      });

  const handleCardClick = (id) => {
    if (onLaunchApp) {
      onLaunchApp(id);
    }
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex flex-col items-center pt-16 sm:pt-20 px-4 select-none animate-fade-in"
    >
      {/* Search Bar Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl flex flex-col items-center space-y-5"
      >
        {/* GNOME Search Bar */}
        <div className="w-full bg-gray-800/80 backdrop-blur-md rounded-full px-5 py-3.5 flex items-center gap-3.5 border border-white/15 shadow-2xl focus-within:ring-2 focus-within:ring-ubuntu-orange focus-within:border-transparent transition-all">
          <Search className="w-5 h-5 text-white/60 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search projects, experience, skills..."
            className="bg-transparent text-white placeholder:text-white/40 text-sm sm:text-base w-full outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                if (inputRef.current) inputRef.current.focus();
              }}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 border border-white/15 px-2 py-0.5 rounded-md">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="w-full">
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1 pt-1 pb-4">
              {filteredResults.map((item, idx) => {
                const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Project;
                const IconComponent = style.icon;

                return (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(item.id)}
                    className="bg-gray-800/60 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10 flex flex-col justify-between cursor-pointer group shadow-lg hover:shadow-2xl hover:border-white/20"
                  >
                    <div>
                      {/* Top Row: Icon + Category Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-white/5 text-white/80 group-hover:text-ubuntu-orange transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${style.badge}`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>

                      {/* Card Title */}
                      <h4 className="text-sm font-bold text-white group-hover:text-ubuntu-orange transition-colors leading-snug">
                        {item.title}
                      </h4>

                      {/* Short Description */}
                      <p className="text-xs text-white/60 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Keywords Tag Cloud */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/5">
                      {item.keywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className={`text-[10px] px-2 py-0.5 rounded-md ${
                            trimmed && kw.toLowerCase().includes(trimmed)
                              ? 'bg-ubuntu-orange text-white font-medium shadow-sm'
                              : 'bg-white/5 text-white/50'
                          }`}
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-800/40 border border-white/10 rounded-2xl p-8 text-center text-white/60 space-y-2 mt-2">
              <p className="text-sm font-medium text-white">No matching results for "{query}"</p>
              <p className="text-xs text-white/40">Try searching for keywords like "React", "Python", "Google", "Docker", or "DSA"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
