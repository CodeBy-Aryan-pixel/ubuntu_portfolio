import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Trash2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

const INITIAL_HISTORY = [
  {
    command: null,
    output: `Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-45-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

System information as of ${new Date().toUTCString()}

Type 'help' to see the list of available commands.
Try Easter Egg: 'sudo hire aryan'`,
    isSystem: true
  }
];

export default function TerminalApp() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when clicking anywhere inside the terminal
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (rawInput) => {
    const trimmedInput = rawInput.trim();
    if (!trimmedInput) {
      setHistory((prev) => [...prev, { command: '', output: null }]);
      return;
    }

    // Save to command history for arrow-key navigation
    setCommandHistory((prev) => [trimmedInput, ...prev]);
    setHistoryIndex(-1);

    const lower = trimmedInput.toLowerCase();
    const parts = trimmedInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const fullArg = args.join(' ');

    let output = null;

    // 1. HELP COMMAND
    if (lower === 'help') {
      output = `Ubuntu 24.04 LTS — Portfolio Bash Shell
Available commands:
  whoami           Display developer bio & profile summary
  projects         List software engineering & AI projects
  skills           Display programming languages & technical stack
  contact          Show direct contact info & social profiles
  experience       Display internship & university coordinator roles
  education        Show university degree and academic background
  certifications   List verified credentials (IBM, Cisco, Oracle)
  ls               List files and project directories
  cat <file>       Read file contents (e.g., cat skills.txt, cat bio.txt)
  pwd              Print current working directory
  docker ps        Show active project containers
  clear            Clear terminal screen (or Ctrl+L)

Easter Eggs:
  sudo hire aryan  Grant employment privileges & access candidate info`;
    }
    // 2. SUDO HIRE ARYAN (Easter Egg)
    else if (lower === 'sudo hire aryan' || lower === 'sudo hire aryan kamat' || lower === 'sudo hire' || lower === 'hire') {
      output = `[sudo] password for recruiter: ********
Access Granted! 🎉

===============================================================
  CANDIDATE OFFER SUMMARY: ARYAN KAMAT
===============================================================
  Candidate:    Aryan Kamat
  Role:         Software Engineer & Full Stack Developer
  Degree:       B.Tech in Computer Science and Engineering (Data Science)
  Institution:  D. Y. Patil College of Engineering & Technology, Kolhapur
  Batch:        Class of 2027 (CGPA: 8.12)
  Status:       AVAILABLE for Full-Time Roles & Software Internships
  
  Contact:      kamataryan333@gmail.com | +91-9356055121
  Profiles:     github.com/CodeBy-Aryan-pixel | linkedin.com/in/aryankamatcse
===============================================================
Ready to engineer scalable systems and intelligent applications!`;
    }
    // 3. WHOAMI COMMAND
    else if (lower === 'whoami') {
      output = `========================================================================
 Aryan Kamat — Software Engineer & Full Stack Developer
========================================================================
 • Education:      B.Tech in CSE (Data Science) @ D. Y. Patil College of Engg. & Tech. (2027, CGPA: 8.12)
 • Tech Stack:     Python, Java, C++, Go, JavaScript, React.js, Next.js, Node.js, Express, MongoDB, Redis
 • AI & Data:      TensorFlow, Scikit-learn, Pandas, NumPy, Power BI, SQL
 • Infrastructure: Linux/UNIX, Bash, Docker, Kubernetes, OpenShift, Git/GitHub Actions
 • Certifications: IBM Python 101 for Data Science (2026)
                   Cisco Python Essentials 1 (2026)
                   Oracle Agentic AI Foundation Certificate (2026)
 • Experience:     Training Coordinator @ T&P Dept | AI-ML Intern @ EduSkills Google AICTE`;
    }
    // 4. PROJECTS COMMAND
    else if (lower === 'projects' || lower === 'project') {
      output = `========================================================================
 CORE SOFTWARE ENGINEERING & AI PROJECTS
========================================================================

 1. VisionLab — In-Browser AI Computer Vision Engine
    • Architecture: TensorFlow.js (WebGL), MobileNet v2, COCO-SSD, React 19
    • Description:  Real-time client-side neural network inference for 1,000 ImageNet species & 80 object classes.
    • Features:     Live webcam streaming, HUD target corners, and sub-35ms latency telemetry.

 2. Customer Churn Analysis & Predictive Modeling
    • Architecture: Python, Pandas, NumPy, Scikit-learn, Random Forest, Matplotlib
    • Description:  End-to-end classification pipeline trained over 7,043 telecom customer records.
    • Metric:       Achieved an 84.6% ROC-AUC score identifying key drivers of customer attrition.

 3. Talent Forge AI (Smart Career Platform)
    • Architecture: React, Next.js, Node.js, Express.js, MongoDB Atlas, Redis
    • Description:  AI-powered resume parser and ATS keyword matching engine.

 4. Regional Sales Data Analysis & Executive Dashboard
    • Architecture: SQL, MySQL, Power BI, DAX Modeling, CTEs
    • Description:  Relational star-schema analysis with YoY revenue trends across 5 regional dimensions.`;
    }
    // 5. CONTACT COMMAND
    else if (lower === 'contact' || lower === 'socials' || lower === 'links') {
      output = `┌────────────────────────────────────────────────────────────────────────┐
│                          CONTACT & CONNECT                             │
├────────────────────────────────────────────────────────────────────────┤
│  • Full Name:  Aryan Kamat                                             │
│  • Email:      kamataryan333@gmail.com                                 │
│  • Phone:      +91-9356055121                                          │
│  • GitHub:     https://github.com/CodeBy-Aryan-pixel                   │
│                https://github.com/ARYANKAMAT07                         │
│  • LinkedIn:   https://linkedin.com/in/aryankamatcse                   │
│  • Location:   Kolhapur, Maharashtra, India                            │
│  • Portfolio:  https://aryankamat.dev                                  │
└────────────────────────────────────────────────────────────────────────┘`;
    }
    // 6. SKILLS COMMAND
    else if (lower === 'skills' || lower === 'tech') {
      output = `TECHNICAL SKILLS & PROFICIENCIES:
  • Languages:       Python, Java, C++, Go (Golang), JavaScript, SQL
  • Engineering:     DSA, OOP, REST APIs, Microservices, SDLC, Debugging
  • Web & Backend:   React.js, Next.js, Node.js, Express.js, HTML5, CSS3, JWT, OAuth
  • Databases:       MongoDB Atlas, MySQL, Redis (Caching Layer)
  • Cloud & DevOps:  Docker, Kubernetes, OpenShift, Ansible, Git, GitHub Actions
  • AI & Data:       TensorFlow, Scikit-learn, Pandas, NumPy, Power BI
  • OS & Scripting:  Linux/UNIX (Ubuntu 24.04 LTS), Bash Scripting`;
    }
    // 7. EXPERIENCE COMMAND
    else if (lower === 'experience' || lower === 'jobs') {
      output = `PROFESSIONAL EXPERIENCE & ROLES:
  [Aug 2025 - Present] Training Coordinator @ Training & Placement Dept, D.Y. Patil College
    • Coordinated placement drives, technical training bootcamps, and mock interviews.
    • Facilitated communication between 500+ students and industry corporate trainers.

  [Jan 2026 - Mar 2026] AI-ML Virtual Intern @ Google for Developers, EduSkills & AICTE
    • Developed Python machine learning pipelines using Scikit-learn, Pandas, and NumPy.
    • Evaluated model architectures, cross-validation metrics, and feature engineering.`;
    }
    // 8. EDUCATION COMMAND
    else if (lower === 'education') {
      output = `ACADEMIC BACKGROUND:
  • Degree:       Bachelor of Technology (B.Tech)
  • Branch:       Computer Science and Engineering (Data Science)
  • Institution:  D. Y. Patil College of Engineering and Technology, Kolhapur
  • Timeline:     Graduating in 2027
  • CGPA:         8.12 / 10.0`;
    }
    // 9. CERTIFICATIONS COMMAND
    else if (lower === 'certifications' || lower === 'certs') {
      output = `VERIFIED CERTIFICATIONS:
  • Oracle Agentic AI Foundation Certificate (2026)
  • Python 101 for Data Science — IBM (2026)
  • Python Essentials 1 — Cisco Networking Academy (2026)`;
    }
    // 10. LS COMMAND
    else if (lower === 'ls' || lower === 'dir') {
      output = `bio.txt   skills.txt   experience.txt   certifications.txt   software_resume.pdf   projects/`;
    }
    // 11. PWD
    else if (lower === 'pwd') {
      output = '/home/Aryan';
    }
    // 12. UNAME
    else if (lower === 'uname' || lower === 'uname -a') {
      output = 'Linux Aryan-Ubuntu-Workstation 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    }
    // 13. DATE
    else if (lower === 'date') {
      output = new Date().toString();
    }
    // 14. ECHO
    else if (cmd === 'echo') {
      output = fullArg || '';
    }
    // 15. CAT FILE
    else if (cmd === 'cat') {
      if (!fullArg) {
        output = 'cat: missing file operand\nTry: cat skills.txt, cat bio.txt, or cat experience.txt';
      } else {
        const file = fullArg.toLowerCase().trim();
        if (file === 'skills.txt' || file === 'skills') {
          output = `Languages: Python, Java, C++, Go, JavaScript, SQL
Frameworks: React.js, Next.js, Node.js, Express, TensorFlow, Scikit-learn
Databases: MongoDB Atlas, MySQL, Redis
DevOps: Docker, Kubernetes, OpenShift, Git, Bash`;
        } else if (file === 'bio.txt' || file === 'about.txt' || file === 'bio.md') {
          output = portfolioData.personal.summary;
        } else if (file === 'experience.txt' || file === 'experience') {
          output = `1. Training Coordinator — Training & Placement Dept (Aug 2025 - Present)
2. AI-ML Virtual Intern — Google EduSkills AICTE (Jan 2026 - Mar 2026)`;
        } else if (file === 'certifications.txt' || file === 'certs.txt') {
          output = portfolioData.certifications
            .map((c) => (typeof c === 'string' ? c : `• ${c.title || c.name} (${c.issuer})`))
            .join('\n');
        } else if (file === 'software_resume.pdf' || file === 'resume.pdf' || file === 'resume') {
          output = `[PDF Document: Aryan Kamat Resume] -> Available via Resume App or download at:
https://drive.google.com/uc?export=download&id=1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J`;
        } else if (file === 'projects' || file === 'projects/') {
          output = 'cat: projects: Is a directory. Type "projects" to view items.';
        } else {
          output = `cat: ${fullArg}: No such file or directory`;
        }
      }
    }
    // 16. DOCKER PS
    else if (
      lower === 'docker ps' || 
      lower === 'docker ps -a' || 
      lower === 'docker ps --all' || 
      lower === 'docker container ls' || 
      (cmd === 'docker' && (args[0]?.toLowerCase() === 'ps' || (args[0]?.toLowerCase() === 'container' && args[1]?.toLowerCase() === 'ls')))
    ) {
      output = `CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                    NAMES
a1b2c3d4e5f6   visionlab-ai:latest   "npm run dev"            3 hours ago    Up 3 hours    0.0.0.0:5173->5173/tcp   visionlab_engine
f7e8d9c0b1a2   talent-forge:latest   "node server.js"         5 hours ago    Up 5 hours    0.0.0.0:8080->8080/tcp   talent_forge_ai
9h8g7f6e5d4c   churn-model:v1        "python3 predict.py"     1 day ago      Up 24 hours   0.0.0.0:5000->5000/tcp   customer_churn`;
    }
    // 17. CLEAR COMMAND
    else if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    // 18. GENERAL SUDO COMMAND
    else if (cmd === 'sudo') {
      output = `[sudo] password for Aryan: 
bash: privilege granted for portfolio inspection. Try: 'sudo hire aryan'`;
    }
    // 19. UNKNOWN COMMAND FALLBACK
    else {
      output = `bash: ${cmd}: command not found. Type 'help' to view available commands or 'whoami' for profile.`;
    }

    setHistory((prev) => [
      ...prev,
      { command: trimmedInput, output: output }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleCopy = () => {
    const text = history
      .map((h) => {
        if (h.isSystem) return h.output;
        const cmdLine = h.command !== null ? `Aryan@ubuntu:~$ ${h.command}` : '';
        return [cmdLine, h.output].filter(Boolean).join('\n');
      })
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full flex flex-col bg-gray-900 text-green-400 font-mono text-xs sm:text-sm select-text cursor-text overflow-hidden"
    >
      {/* Terminal Top Utility Header */}
      <div className="h-9 bg-gray-950/80 border-b border-white/10 flex items-center justify-between px-3 text-xs select-none shrink-0">
        <div className="flex items-center gap-2 text-white/70">
          <TerminalIcon className="w-3.5 h-3.5 text-ubuntu-orange" />
          <span className="font-sans font-medium text-[11px] text-white/90">
            Aryan@ubuntu-portfolio: ~ (bash)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy Terminal Output"
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal (Ctrl+L)"
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output & Prompt Body */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto overflow-x-auto space-y-3 leading-relaxed">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {/* Command Prompt Line */}
            {item.command !== null && (
              <div className="flex items-center gap-2 text-white flex-wrap break-all">
                <span className="text-green-400 font-bold shrink-0">Aryan@ubuntu:~$</span>
                <span className="text-white font-normal break-all">{item.command}</span>
              </div>
            )}

            {/* Output Line */}
            {item.output && (
              <pre
                className={`whitespace-pre font-mono leading-relaxed pl-1 max-w-full overflow-x-auto ${
                  item.isSystem ? 'text-gray-400' : 'text-green-400'
                }`}
              >
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-white pt-1 flex-wrap sm:flex-nowrap">
          <span className="text-green-400 font-bold shrink-0">Aryan@ubuntu:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[140px] bg-transparent border-none outline-none text-white font-mono caret-green-400 p-0 m-0 text-xs sm:text-sm font-normal"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
