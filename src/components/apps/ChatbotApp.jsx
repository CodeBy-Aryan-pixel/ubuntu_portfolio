import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  FaRobot, 
  FaUserAlt, 
  FaCheck, 
  FaRedo
} from 'react-icons/fa';
import { 
  Sparkles, 
  Send, 
  Copy,
  Terminal,
  Database,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Zap
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

// 1. Comprehensive Knowledge Base Index
const KNOWLEDGE_BASE = {
  profile: {
    name: "Aryan Kamat",
    role: "Software Engineer & Full Stack Developer",
    focus: "Artificial Intelligence, Data Science, Scalable Backend Systems & Web Applications",
    bio: "Passionate engineer with a strong foundation in Data Structures & Algorithms, Full Stack engineering, and Applied AI/ML."
  },
  education: {
    degree: "B.Tech in Computer Science and Engineering (Data Science)",
    institution: "D. Y. Patil College of Engineering and Technology, Kolhapur",
    timeline: "Expected Graduation: 2027",
    cgpa: "7.88 / 10.0",
    coursework: "Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems (Linux/UNIX), Machine Learning, Computer Networks, Discrete Mathematics."
  },
  experience: [
    {
      role: "Training Coordinator",
      org: "Training & Placement Dept, D. Y. Patil College of Engineering & Technology",
      period: "Aug 2025 - Present",
      bullets: [
        "Coordinate campus recruitment drives, company relations, and mock technical interviews.",
        "Organize technical workshops on Data Structures, Algorithms, and Full-Stack development for fellow students.",
        "Manage corporate communications and maintain placement readiness tracking systems."
      ]
    },
    {
      role: "AI-ML Virtual Intern",
      org: "EduSkills Foundation, AICTE & Google for Developers",
      period: "Jan 2026 - Mar 2026 (10 Weeks)",
      bullets: [
        "Completed a comprehensive 10-week curriculum supported by Google for Developers focused on end-to-end Machine Learning pipelines.",
        "Implemented exploratory data analysis (EDA), data cleaning, feature engineering, and model evaluation using Python, NumPy, Pandas, and Scikit-learn.",
        "Trained classification and regression models and evaluated performance with precision, recall, and ROC-AUC metrics."
      ]
    },
    {
      role: "GDSC Volunteer (Core Community)",
      org: "Google Developer Student Club (GDSC)",
      period: "Sep 2024 - Aug 2025",
      bullets: [
        "Organized hands-on technical bootcamps, hackathons, and open-source contribution sessions.",
        "Mentored fellow engineering students in Python programming fundamentals, Git/GitHub, and modern web technologies."
      ]
    }
  ],
  skills: {
    languages: ["Python", "Java", "C++", "Go (Golang)", "JavaScript (ES6+)", "SQL", "Bash"],
    ai_ml: ["TensorFlow", "TensorFlow.js", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Computer Vision (COCO-SSD)", "Power BI", "Data Analysis"],
    backend: ["Node.js", "Express.js", "REST APIs", "Microservices Architecture", "DBMS"],
    frontend: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
    databases: ["MongoDB & Atlas", "MySQL", "PostgreSQL", "Redis"],
    devops_tools: ["Docker", "Kubernetes", "OpenShift", "Git / GitHub", "Linux/UNIX Admin"]
  },
  projects: [
    {
      name: "Customer Churn Analysis (Predictive Machine Learning)",
      stack: "Python, Pandas, Scikit-learn, Matplotlib, Seaborn",
      desc: "End-to-end predictive classification pipeline analyzing 7,043 telecom records to predict customer attrition. Includes EDA, feature encoding, and random forest classification with actionable retention insights."
    },
    {
      name: "Regional Sales Analytics Dashboard",
      stack: "SQL, Power BI, DAX, Excel",
      desc: "Interactive business intelligence dashboard analyzing multi-region revenue, quarterly growth, and profitability trends using complex SQL queries and DAX measures."
    },
    {
      name: "Ubuntu 24.04 Web OS Portfolio",
      stack: "React 19, Tailwind CSS, Framer Motion, TensorFlow.js",
      desc: "Simulated desktop operating system featuring draggable windows, interactive Bash CLI, Neofetch, live system monitors, particle mesh, and the in-browser VisionLab AI model."
    },
    {
      name: "Talent Forge AI",
      stack: "Next.js, Node.js, Microservices, Python AI parser",
      desc: "AI-driven resume parsing and ATS scoring platform matching candidate skill profiles with job descriptions."
    }
  ],
  certifications: [
    {
      title: "IBM Python 101 for Data Science",
      issuer: "IBM / Cognitive Class",
      year: "2026",
      desc: "Core Python fundamentals, Pandas dataframes, NumPy arrays, and data manipulation."
    },
    {
      title: "Cisco Python Essentials 1",
      issuer: "Cisco Networking Academy",
      year: "2026",
      desc: "Object-oriented programming, data structures, algorithms, and modular design."
    },
    {
      title: "Oracle Cloud Infrastructure (OCI) AI Foundations Associate",
      issuer: "Oracle",
      year: "2026",
      desc: "Foundational concepts in Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI."
    },
    {
      title: "Oracle Agentic AI Foundation Certificate",
      issuer: "Oracle",
      year: "2026",
      desc: "Architectures for autonomous AI agents, tool orchestration, and LLM reasoning."
    }
  ],
  spokenLanguages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Hindi", proficiency: "Fluent" },
    { language: "Marathi", proficiency: "Native / Bilingual" }
  ],
  contact: {
    email: "kamataryan333@gmail.com",
    phone: "+91-9356055121",
    linkedin: "linkedin.com/in/aryankamatcse",
    github: "github.com/CodeBy-Aryan-pixel",
    location: "Kolhapur, Maharashtra, India"
  },
  availability: {
    status: "Actively seeking Software Engineering, Full-Stack, and AI/ML Internship & Entry-Level Opportunities",
    notice: "Immediate / Flexible",
    locations: "Open to Remote, Hybrid, and On-site (Bangalore, Pune, Mumbai, Hyderabad, etc.)"
  }
};

const SUGGESTIONS = [
  "Tell me about your projects",
  "What databases do you use?",
  "Tell me about your Google internship",
  "Describe your leadership experience",
  "What certifications do you hold?",
  "What is your education & CGPA?",
  "What languages do you speak?",
  "Are you available for hire?"
];

// 2. Local Intent Matching & Scoring Engine
const INTENT_DEFINITIONS = [
  {
    id: 'education',
    weight: 1.0,
    keywords: [
      'education', 'college', 'degree', 'cgpa', 'gpa', 'university', 'btech', 'b.tech',
      'kolhapur', 'dypatil', 'dy patil', 'd. y. patil', 'academics', 'marks', 'school',
      'study', 'studying', 'graduation', 'graduating', '2027', 'coursework', 'engineering'
    ],
    generate: () => `### 🎓 Education & Academics

• **Degree**: B.Tech in Computer Science and Engineering (Data Science)
• **Institution**: D. Y. Patil College of Engineering and Technology, Kolhapur
• **Expected Graduation**: **2027**
• **Current CGPA**: **7.88 / 10.0**
• **Core Coursework**: Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems (Linux/UNIX), Machine Learning, and Computer Networks.`
  },
  {
    id: 'experience',
    weight: 1.0,
    keywords: [
      'experience', 'intern', 'internship', 'google', 'eduskills', 'aicte', 'work',
      'job history', 'past roles', 'professional', 'career', 'virtual intern', '10 week', '10-week'
    ],
    generate: () => `### 💼 Professional Experience & Internships

• **AI-ML Virtual Intern | EduSkills AICTE & Google for Developers** *(Jan 2026 - Mar 2026)*:
  - Completed a hands-on **10-week** curriculum on end-to-end Machine Learning pipelines supported by Google for Developers.
  - Worked with **Python**, **NumPy**, **Pandas**, and **Scikit-learn** for exploratory data analysis (EDA), data cleaning, feature engineering, and model evaluation.
  - Built classification models evaluated against precision, recall, and ROC-AUC metrics.

• **Training Coordinator | Training & Placement Dept, D. Y. Patil College** *(Aug 2025 - Present)*:
  - Coordinate campus recruitment drives, company relations, and technical interview preparation for batchmates.`
  },
  {
    id: 'leadership',
    weight: 1.0,
    keywords: [
      'leader', 'leadership', 'gdsc', 'volunteer', 'community', 'placement', 't&p',
      'coordinator', 'organize', 'mentoring', 'clubs', 'extracurricular', 'activities'
    ],
    generate: () => `### 🌟 Leadership & Community Roles

Aryan actively drives student community initiatives and university placement operations:

• **Training Coordinator | Training & Placement Dept** *(Aug 2025 - Present)*:
  - Primary student coordinator for campus placement drives, company communication, and technical mock rounds.
  - Organizes technical skill enhancement workshops on Data Structures, Algorithms, and Full Stack development for peers.

• **GDSC Volunteer | Google Developer Student Club** *(Sep 2024 - Aug 2025)*:
  - Organized developer bootcamps, hackathons, and open-source contribution sessions.
  - Mentored junior engineering students in Git/GitHub workflows and Python programming fundamentals.`
  },
  {
    id: 'databases',
    weight: 1.2,
    keywords: [
      'database', 'databases', 'db', 'mongodb', 'mysql', 'postgres', 'postgresql',
      'redis', 'nosql', 'sql', 'queries', 'schema', 'acid', 'caching', 'atlas'
    ],
    generate: () => `### 🗄️ Database Architecture & Storage Stack

Aryan has hands-on experience with relational, document-based NoSQL, and in-memory caching databases:

• **MongoDB & MongoDB Atlas**: Document modeling, aggregation pipelines, replica sets, and cloud deployments.
• **MySQL & PostgreSQL**: Relational schema design, normalization, ACID transactions, complex JOIN queries, and indexing.
• **Redis**: In-memory key-value caching, session stores, and rate-limiting for high-throughput microservices.

\`\`\`sql
-- Example Analytical Query from Regional Sales Project
SELECT Region, Category, SUM(Sales_Amount) AS Total_Revenue,
       RANK() OVER (PARTITION BY Region ORDER BY SUM(Sales_Amount) DESC) AS Sales_Rank
FROM Regional_Sales_Transactions
GROUP BY Region, Category;
\`\`\``
  },
  {
    id: 'projects',
    weight: 1.0,
    keywords: [
      'project', 'projects', 'portfolio', 'built', 'churn', 'telecom', 'sales dashboard',
      'power bi', 'web os', 'talent forge', 'applications', 'github repo', '7043', '7,043'
    ],
    generate: () => `### 🚀 Key Projects Built by Aryan

1. **Customer Churn Analysis (Predictive Machine Learning)**:
   - Built an end-to-end classification pipeline analyzing **7,043 telecom customer records**.
   - Performed EDA, categorical encoding, and model tuning using **Python, Pandas, Scikit-learn, and Matplotlib** to identify churn triggers.

2. **Regional Sales Analytics Dashboard (SQL & Power BI)**:
   - Designed an interactive enterprise BI dashboard analyzing regional profitability, sales trends, and quarterly revenue metrics using SQL and DAX.

3. **Ubuntu 24.04 Web OS Portfolio**:
   - Simulated desktop operating system built with **React 19**, **Tailwind CSS**, and **Framer Motion**.
   - Features real-time **TensorFlow.js & COCO-SSD** in-browser object detection (**VisionLab**) and an interactive Bash terminal.

4. **Talent Forge AI**:
   - ATS resume parser & applicant matching platform built with **Next.js** and microservices architecture.`
  },
  {
    id: 'certifications',
    weight: 1.0,
    keywords: [
      'cert', 'certification', 'certifications', 'ibm', 'cisco', 'oracle', 'oci',
      'credentials', 'licenses', 'certified', 'python 101', 'essentials', 'foundations'
    ],
    generate: () => `### 📜 Verified Industry Certifications

• **IBM Python 101 for Data Science** *(IBM / Cognitive Class, 2026)*:
  Data analysis, NumPy, Pandas manipulation, and Python scripting.

• **Cisco Python Essentials 1** *(Cisco Networking Academy, 2026)*:
  Object-oriented programming, data structures, and modular system design.

• **Oracle Cloud Infrastructure (OCI) AI Foundations Associate** *(Oracle, 2026)*:
  Foundational ML concepts, Deep Learning architectures, and Generative AI services.

• **Oracle Agentic AI Foundation Certificate** *(Oracle, 2026)*:
  Multi-agent system design, tool orchestration, and LLM reasoning.`
  },
  {
    id: 'tech_stack',
    weight: 0.9,
    keywords: [
      'skill', 'skills', 'tech', 'stack', 'technologies', 'programming', 'language',
      'languages', 'tools', 'frameworks', 'python', 'java', 'c++', 'golang', 'go',
      'javascript', 'react', 'node', 'express', 'docker', 'git', 'linux', 'bash'
    ],
    generate: () => `### 💻 Technical Skills & Stack

• **Languages**: \`Python\`, \`Java\`, \`C++\`, \`Go (Golang)\`, \`JavaScript (ES6+)\`, \`SQL\`, \`Bash\`
• **AI & Data Science**: \`TensorFlow\`, \`TensorFlow.js\`, \`Scikit-learn\`, \`Pandas\`, \`NumPy\`, \`Power BI\`, \`Matplotlib\`
• **Backend & APIs**: \`Node.js\`, \`Express.js\`, \`REST APIs\`, \`Microservices\`
• **Frontend**: \`React 19\`, \`Next.js\`, \`Tailwind CSS\`, \`Framer Motion\`, \`HTML5/CSS3\`
• **Databases**: \`MongoDB & Atlas\`, \`MySQL\`, \`PostgreSQL\`, \`Redis\`
• **Cloud & DevOps**: \`Docker\`, \`Kubernetes\`, \`OpenShift\`, \`Git / GitHub\`, \`Linux/UNIX\``
  },
  {
    id: 'visionlab',
    weight: 1.1,
    keywords: [
      'visionlab', 'vision', 'computer vision', 'coco-ssd', 'coco ssd', 'webcam',
      'detection', 'object detection', 'camera', 'mobilenet', 'inference'
    ],
    generate: () => `### 👁️ VisionLab (In-Browser AI Inference Engine)

Aryan engineered **VisionLab**, a native computer vision application built into this portfolio:

• **Model**: MobileNetV2 COCO-SSD (80 object categories)
• **Acceleration**: TensorFlow.js WebGL GPU hardware acceleration
• **Features**: Real-time webcam inference loop at 30+ FPS, confidence threshold slider, telemetry sidebar, and sample image datasets.

You can launch **VisionLab** directly from the desktop or dock to test real-time object detection!`
  },
  {
    id: 'spoken_languages',
    weight: 1.2,
    keywords: [
      'spoken language', 'languages do you speak', 'speak', 'fluent', 'native',
      'marathi', 'hindi', 'english', 'communication', 'multilingual', 'talk'
    ],
    generate: () => `### 🌐 Spoken Languages & Communication

Aryan is multilingual with strong written and verbal communication skills:

• **English**: Professional Working Proficiency (Technical presentations, documentation & corporate correspondence)
• **Hindi**: Fluent (Native fluency)
• **Marathi**: Native / Bilingual`
  },
  {
    id: 'hiring',
    weight: 1.1,
    keywords: [
      'hire', 'hiring', 'available', 'availability', 'relocate', 'notice period',
      'salary', 'job offer', 'full time', 'full-time', 'join', 'opportunity',
      'recruiting', 'internship opportunity', 'open to work'
    ],
    generate: () => `### 🤝 Availability & Recruitment Status

• **Status**: **Actively seeking** Software Engineering, Full-Stack, and AI/ML Internship & Entry-Level Opportunities!
• **Notice Period**: Immediate / Flexible
• **Location Preferences**: Open to Remote, Hybrid, and On-site opportunities (Bangalore, Pune, Mumbai, Hyderabad, etc.)
• **Resume**: You can view and download his complete resume via the **Resume** app on the desktop.`
  },
  {
    id: 'contact',
    weight: 1.1,
    keywords: [
      'contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'mobile',
      'call', 'location', 'address', 'socials', 'social links', 'get in touch'
    ],
    generate: () => `### 📬 Contact Aryan Kamat

• **Email**: [kamataryan333@gmail.com](mailto:kamataryan333@gmail.com)
• **Phone**: [+91-9356055121](tel:+919356055121)
• **LinkedIn**: [linkedin.com/in/aryankamatcse](https://linkedin.com/in/aryankamatcse)
• **GitHub**: [github.com/CodeBy-Aryan-pixel](https://github.com/CodeBy-Aryan-pixel)
• **Location**: Kolhapur, Maharashtra, India`
  },
  {
    id: 'about_summary',
    weight: 0.8,
    keywords: [
      'who are you', 'who is aryan', 'tell me about yourself', 'about aryan',
      'summary', 'bio', 'introduction', 'intro', 'background', 'overview'
    ],
    generate: () => `### 👨‍💻 About Aryan Kamat

Aryan Kamat is a **Software Engineer & Full Stack Developer** pursuing his B.Tech in CSE (Data Science) at D. Y. Patil College of Engineering & Technology, Kolhapur (graduating 2027).

He has practical experience with:
• Full-stack modern web architectures (React, Next.js, Node.js, Express, MongoDB, SQL, Redis).
• Applied AI & Machine Learning pipelines (Python, Scikit-learn, TensorFlow, Power BI).
• Cloud containerization with Docker and Linux system administration.

Feel free to ask about his specific projects, technical stack, or leadership roles!`
  },
  {
    id: 'greetings',
    weight: 0.7,
    keywords: [
      'hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening',
      'good afternoon', 'howdy', 'sup', 'yo', 'hi there', 'hello there'
    ],
    generate: () => `👋 **Hello! Welcome to Aryan's Portfolio AI.**

I'm ready to answer any questions regarding Aryan's technical background:
• **"Tell me about your projects"** — Churn Analysis, Sales Dashboard & VisionLab.
• **"What databases do you use?"** — MongoDB, MySQL, PostgreSQL & Redis.
• **"Tell me about your education & CGPA"** — B.Tech CSE (Data Science) @ D. Y. Patil.
• **"What certifications do you hold?"** — IBM, Cisco & Oracle credentials.

What would you like to explore?`
  }
];

export function getSmartResponse(userQuery) {
  if (!userQuery || typeof userQuery !== 'string') {
    return "I'm Aryan's specialized AI assistant, so I'm laser-focused on his engineering background! Feel free to ask me about his data science projects, MERN stack skills, or certifications. Alternatively, you can reach him directly via LinkedIn or email!";
  }

  // Tokenize & Clean Query
  const cleanQuery = userQuery.toLowerCase().replace(/[^\w\s.-]/g, ' ');
  const words = cleanQuery.split(/\s+/).filter(Boolean);
  const normalizedQuery = ` ${words.join(' ')} `;

  // Score each intent
  const scoredIntents = INTENT_DEFINITIONS.map((intent) => {
    let score = 0;
    let matchedKeywords = [];

    intent.keywords.forEach((keyword) => {
      const lowerKw = keyword.toLowerCase();
      // Phrase match
      if (lowerKw.includes(' ') && normalizedQuery.includes(` ${lowerKw} `)) {
        score += 4.0 * intent.weight;
        matchedKeywords.push(lowerKw);
      } else if (normalizedQuery.includes(` ${lowerKw} `)) {
        score += 2.0 * intent.weight;
        matchedKeywords.push(lowerKw);
      } else if (words.some((w) => w === lowerKw || (lowerKw.length > 3 && w.startsWith(lowerKw)))) {
        score += 1.0 * intent.weight;
        matchedKeywords.push(lowerKw);
      }
    });

    return {
      ...intent,
      score,
      matchedKeywords
    };
  }).filter((item) => item.score > 0);

  // Sort descending by score
  scoredIntents.sort((a, b) => b.score - a.score);

  // If greeting is the sole high match
  if (scoredIntents.length > 0 && scoredIntents[0].id === 'greetings' && scoredIntents.length === 1) {
    return scoredIntents[0].generate();
  }

  // Filter out greeting if there are other meaningful technical matches
  const nonGreetingIntents = scoredIntents.filter((item) => item.id !== 'greetings');

  // Multi-intent synthesis (e.g. "education and projects")
  if (nonGreetingIntents.length > 0) {
    const topScore = nonGreetingIntents[0].score;

    if (topScore >= 1.5) {
      // Pick top matches within 65% of the highest score (max 2 categories to stay concise)
      const topMatches = nonGreetingIntents.filter((item) => item.score >= topScore * 0.65).slice(0, 2);
      return topMatches.map((match) => match.generate()).join('\n\n---\n\n');
    }
  }

  // Graceful Fallback for off-topic or ambiguous queries
  return "I'm Aryan's specialized AI assistant, so I'm laser-focused on his engineering background! Feel free to ask me about his data science projects, MERN stack skills, or certifications. Alternatively, you can reach him directly via LinkedIn or email!";
}

// 3. Helper: Custom Markdown & Code Formatter Component
function MarkdownMessage({ content }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const renderedContent = useMemo(() => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer = [];
    let codeBlockCount = 0;

    lines.forEach((line, index) => {
      // Code block start / end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.trim().replace('```', '') || 'code';
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          const currentCode = codeBuffer.join('\n');
          const blockIdx = codeBlockCount++;
          elements.push(
            <div key={`code-${index}`} className="my-2.5 rounded-lg overflow-hidden border border-white/15 bg-black/70 shadow-lg">
              <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-[10px] font-mono text-white/60 select-none">
                <span className="uppercase font-semibold tracking-wider text-ubuntu-orange">{codeLanguage}</span>
                <button
                  onClick={() => handleCopyCode(currentCode, blockIdx)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedCodeIdx === blockIdx ? (
                    <>
                      <FaCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 text-xs font-mono text-green-400 overflow-x-auto whitespace-pre leading-relaxed">
                <code>{currentCode}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Divider line (---)
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-3 border-white/10" />);
        return;
      }

      // Headers (### or ##)
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={`h3-${index}`} className="text-sm font-bold text-ubuntu-orange mt-2 mb-1 flex items-center gap-1.5">
            <span>{line.replace('### ', '')}</span>
          </h4>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={`h2-${index}`} className="text-base font-bold text-white mt-3 mb-1.5 border-b border-white/10 pb-1">
            {line.replace('## ', '')}
          </h3>
        );
        return;
      }

      // Empty line
      if (!line.trim()) {
        elements.push(<div key={`empty-${index}`} className="h-1.5" />);
        return;
      }

      // Bullet line
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().replace(/^([•\-*]\s*)/, '') : line;
      const formattedInline = formatInlineText(cleanLine);

      if (isBullet) {
        elements.push(
          <div key={`bullet-${index}`} className="flex items-start gap-2 my-0.5 pl-1">
            <span className="text-ubuntu-orange text-xs mt-1 shrink-0">▸</span>
            <div className="text-xs sm:text-sm leading-relaxed text-white/90">{formattedInline}</div>
          </div>
        );
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-xs sm:text-sm leading-relaxed text-white/90 my-0.5">
            {formattedInline}
          </p>
        );
      }
    });

    return elements;
  }, [content, copiedCodeIdx]);

  return <div className="space-y-0.5">{renderedContent}</div>;
}

function formatInlineText(text) {
  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 font-mono text-[11px] text-green-300 border border-white/10">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const linkText = token.substring(1, token.indexOf(']('));
      const linkUrl = token.substring(token.indexOf('](') + 2, token.length - 1);
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ubuntu-orange hover:underline font-medium"
        >
          {linkText}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// 4. Main Chatbot Component
export default function ChatbotApp() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 **Hello! I'm Aryan's AI Assistant.**\n\nI have full context on Aryan's software engineering background, machine learning research, internships, certifications, and projects.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (textToSend = input) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text || isTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { sender: 'user', text, time };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated reasoning delay
    setTimeout(() => {
      const responseText = getSmartResponse(text);
      const botMessage = {
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "👋 **Conversation reset.** Ask me anything about Aryan's technical stack, internships, or engineering projects!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#141414] text-[#F2F2F2] select-none font-sans overflow-hidden">
      {/* 1. Top App Subheader */}
      <div className="h-12 bg-[#1C1C1C] border-b border-white/10 flex items-center justify-between px-4 gap-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/30 shadow-sm flex items-center justify-center">
            <FaRobot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-wide flex items-center gap-2">
              <span>Aryan_AI</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                ACTIVE
              </span>
            </div>
            <div className="text-[10px] text-white/50 font-mono">system://aryan.assistant.v2</div>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          title="Reset Conversation"
          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1.5 transition-colors"
        >
          <FaRedo className="w-3 h-3" />
          <span className="hidden sm:inline text-[11px]">Clear</span>
        </button>
      </div>

      {/* 2. Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#141414] via-[#161616] to-[#121212]">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <FaRobot className="w-4 h-4" />
                </div>
              )}

              <div className="flex flex-col max-w-[88%] sm:max-w-[80%]">
                <div
                  className={`p-3.5 sm:p-4 shadow-xl select-text transition-all ${
                    isUser
                      ? 'bg-ubuntu-orange text-white rounded-2xl rounded-tr-sm border border-white/15'
                      : 'bg-[#222222] text-white rounded-2xl rounded-tl-sm border border-white/10 font-sans'
                  }`}
                >
                  {isUser ? (
                    <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </p>
                  ) : (
                    <MarkdownMessage content={msg.text} />
                  )}
                </div>
                <span
                  className={`text-[10px] text-white/40 mt-1 font-mono px-1 ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-ubuntu-orange/20 border border-ubuntu-orange/40 text-ubuntu-orange flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <FaUserAlt className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2.5 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
              <FaRobot className="w-4 h-4" />
            </div>
            <div className="bg-[#222222] text-emerald-400 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/10 shadow-xl flex items-center gap-2">
              <span className="text-xs text-white/70 font-medium">Analyzing query</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Suggestion Quick Prompts Bar */}
      <div className="px-4 py-2 bg-[#181818] border-t border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] font-mono text-ubuntu-orange font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Quick:</span>
        </span>
        {SUGGESTIONS.map((suggestion, sIdx) => (
          <button
            key={sIdx}
            onClick={() => handleSend(suggestion)}
            disabled={isTyping}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-ubuntu-orange/20 hover:text-ubuntu-orange border border-white/10 hover:border-ubuntu-orange/30 text-white/80 transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50 active:scale-95"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* 4. Bottom Input Bar */}
      <div className="p-3 sm:p-4 bg-[#1C1C1C] border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-[#121212] border border-white/15 rounded-xl px-3 py-2 shadow-inner focus-within:border-ubuntu-orange/60 focus-within:ring-1 focus-within:ring-ubuntu-orange/40 transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Aryan's AI about projects, databases, education..."
            disabled={isTyping}
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
              input.trim() && !isTyping
                ? 'bg-ubuntu-orange hover:bg-orange-600 text-white shadow-md cursor-pointer transform hover:scale-105 active:scale-95'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
