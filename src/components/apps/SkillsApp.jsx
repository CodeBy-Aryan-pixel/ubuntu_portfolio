import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Activity, 
  Copy,
  Check
} from 'lucide-react';
import { 
  FaPython, 
  FaJava, 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaDocker, 
  FaLinux, 
  FaDatabase,
  FaCloud,
  FaBug,
  FaCube,
  FaNetworkWired,
  FaSyncAlt,
  FaProjectDiagram,
  FaTachometerAlt,
  FaChartBar
} from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { 
  SiCplusplus, 
  SiJavascript, 
  SiExpress, 
  SiNextdotjs, 
  SiJsonwebtokens, 
  SiOpenid, 
  SiMongodb, 
  SiMysql, 
  SiRedis, 
  SiKubernetes, 
  SiRedhatopenshift, 
  SiAnsible, 
  SiVercel, 
  SiRender, 
  SiGnubash, 
  SiNumpy, 
  SiPandas, 
  SiScikitlearn, 
  SiTensorflow
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const SKILL_ICONS = {
  "Python": { icon: FaPython, color: "text-amber-400" },
  "Java": { icon: FaJava, color: "text-red-400" },
  "C++": { icon: SiCplusplus, color: "text-blue-400" },
  "Go (Golang)": { icon: FaGolang, color: "text-cyan-400" },
  "JavaScript": { icon: SiJavascript, color: "text-yellow-400" },
  "SQL": { icon: FaDatabase, color: "text-emerald-400" },
  
  "DSA": { icon: FaProjectDiagram, color: "text-purple-400" },
  "OOP": { icon: FaCube, color: "text-indigo-400" },
  "REST APIs": { icon: TbApi, color: "text-teal-400" },
  "Microservices": { icon: FaNetworkWired, color: "text-blue-400" },
  "SDLC": { icon: FaSyncAlt, color: "text-amber-400" },
  "Debugging": { icon: FaBug, color: "text-rose-400" },

  "Node.js": { icon: FaNodeJs, color: "text-emerald-400" },
  "Express.js": { icon: SiExpress, color: "text-gray-300" },
  "React.js": { icon: FaReact, color: "text-cyan-400" },
  "Next.js": { icon: SiNextdotjs, color: "text-white" },
  "HTML": { icon: FaHtml5, color: "text-orange-500" },
  "CSS": { icon: FaCss3Alt, color: "text-blue-500" },
  "JWT": { icon: SiJsonwebtokens, color: "text-pink-400" },
  "OAuth": { icon: SiOpenid, color: "text-orange-400" },

  "MongoDB": { icon: SiMongodb, color: "text-emerald-500" },
  "MongoDB Atlas": { icon: SiMongodb, color: "text-emerald-400" },
  "MySQL": { icon: SiMysql, color: "text-blue-400" },
  "Redis": { icon: SiRedis, color: "text-red-500" },

  "Docker": { icon: FaDocker, color: "text-sky-400" },
  "Kubernetes": { icon: SiKubernetes, color: "text-blue-500" },
  "OpenShift": { icon: SiRedhatopenshift, color: "text-red-500" },
  "Ansible": { icon: SiAnsible, color: "text-rose-400" },
  "Cloud Computing": { icon: FaCloud, color: "text-sky-300" },
  "Vercel": { icon: SiVercel, color: "text-white" },
  "Render": { icon: SiRender, color: "text-cyan-300" },

  "Linux/UNIX": { icon: FaLinux, color: "text-amber-300" },
  "Bash Scripting": { icon: SiGnubash, color: "text-emerald-400" },
  "System Performance & Maintenance": { icon: FaTachometerAlt, color: "text-ubuntu-orange" },

  "NumPy": { icon: SiNumpy, color: "text-blue-400" },
  "Pandas": { icon: SiPandas, color: "text-indigo-300" },
  "Scikit-learn": { icon: SiScikitlearn, color: "text-amber-400" },
  "TensorFlow": { icon: SiTensorflow, color: "text-orange-500" },
  "Power BI": { icon: FaChartBar, color: "text-yellow-400" }
};

export default function SkillsApp() {
  const [copiedItem, setCopiedItem] = useState(null);

  const categories = portfolioData.skills.categories;

  const handleCopySkill = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedItem(name);
    setTimeout(() => setCopiedItem(null), 1800);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1A1A1A] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* Top Monitor Navigation Bar */}
      <div className="h-12 bg-[#222222]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-ubuntu-orange/20 text-ubuntu-orange">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white tracking-wide">System Monitor — Technical Skills</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div className="space-y-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-[#242424]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg transition-all"
            >
              {/* Category Title */}
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-ubuntu-orange shadow-[0_0_8px_rgba(233,84,32,0.8)]" />
                  <h3 className="font-bold text-sm text-white tracking-wide">{category.name}</h3>
                </div>
                <span className="text-[11px] font-mono text-white/50 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                  {category.items.length} Modules
                </span>
              </div>

              {/* Upgraded Skill Item Pills with Official React Icons & Glow Hover */}
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((skill, sIdx) => {
                  const iconConfig = SKILL_ICONS[skill] || { icon: FaCube, color: "text-ubuntu-orange" };
                  const SkillIcon = iconConfig.icon;

                  return (
                    <div
                      key={sIdx}
                      onClick={() => handleCopySkill(skill)}
                      className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-ubuntu-orange hover:shadow-[0_0_15px_rgba(233,84,32,0.35)] rounded-xl px-3 py-2 cursor-pointer transition-all duration-200 transform hover:scale-105 flex items-center gap-2.5 shadow-sm"
                    >
                      <SkillIcon className={`w-4 h-4 ${iconConfig.color} group-hover:brightness-125 transition-transform duration-200 group-hover:rotate-6`} />
                      <span className="font-medium text-xs text-white/80 group-hover:text-white transition-colors font-mono">
                        {skill}
                      </span>
                      <span className="text-white/20 group-hover:text-ubuntu-orange transition-colors ml-0.5">
                        {copiedItem === skill ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
