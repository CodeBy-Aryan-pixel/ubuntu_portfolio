import React, { useState, useMemo } from 'react';
import { 
  Folder, 
  FileCode, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Grid, 
  List as ListIcon, 
  Home, 
  HardDrive, 
  Trash, 
  X, 
  Sparkles, 
  ExternalLink,
  Code2,
  Check,
  Copy,
  Layers,
  Globe,
  Terminal,
  ArrowUpRight
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

// Rich Project Data with Descriptions, Highlights, Live/GitHub Links, and Code Snippets
const ENRICHED_PROJECTS = [
  {
    id: "proj-churn-analysis",
    title: "Customer Churn Analysis & Predictive Modeling",
    category: "Machine Learning & Data Science",
    lastModified: "Jul 29, 2026",
    size: "12.8 MB",
    filesCount: "18 files",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/CodeBy-Aryan-pixel/Customer-Churn-Analysis-Predictive-Modeling",
    liveUrl: "https://github.com/CodeBy-Aryan-pixel/Customer-Churn-Analysis-Predictive-Modeling",
    description: "End-to-end predictive machine learning pipeline trained over 7,043 telecom customer records to identify attrition risks, feature importances, and retention targets.",
    highlights: [
      "Processed and cleansed 7,043 customer records with categorical encoding and MinMax feature scaling.",
      "Trained Random Forest and Gradient Boosting classifiers achieving an 84.6% ROC-AUC score.",
      "Identified contract type, monthly charges, and tenure as the top 3 drivers of customer churn.",
      "Generated detailed visualization reports using Seaborn and Matplotlib for executive insights."
    ],
    codeFileName: "model_training.py",
    codeSnippet: `# Customer Churn Classification Pipeline using Scikit-Learn
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def train_churn_model(csv_filepath):
    # 1. Load cleaned customer dataset (7,043 rows)
    df = pd.read_csv(csv_filepath)
    X = df.drop(columns=['customerID', 'Churn'])
    y = df['Churn'].apply(lambda x: 1 if x == 'Yes' else 0)

    # 2. Stratified train-test split (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # 3. Random Forest hyperparameter tuning
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth': [8, 12, 16],
        'min_samples_split': [2, 5]
    }
    grid_search = GridSearchCV(
        RandomForestClassifier(random_state=42),
        param_grid,
        cv=5,
        scoring='roc_auc',
        n_jobs=-1
    )
    grid_search.fit(X_train, y_train)
    best_model = grid_search.best_estimator_

    # 4. Evaluation & ROC-AUC Validation
    preds = best_model.predict(X_test)
    probs = best_model.predict_proba(X_test)[:, 1]
    print("ROC-AUC Score:", roc_auc_score(y_test, probs))
    print(classification_report(y_test, preds))
    return best_model`
  },
  {
    id: "proj-talent-forge",
    title: "Talent Forge AI (Smart Career Platform)",
    category: "AI & Web Applications",
    lastModified: "Aug 10, 2026",
    size: "24.1 MB",
    filesCount: "82 files",
    techStack: ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Redis"],
    githubUrl: "https://github.com/CodeBy-Aryan-pixel",
    liveUrl: "https://github.com/CodeBy-Aryan-pixel",
    description: "AI-powered career assistance and ATS resume parsing platform built with Next.js, featuring automated keyword extraction, scoring heuristics, and career trajectory matching.",
    highlights: [
      "Architected Next.js full-stack platform with server-side rendering and API routes.",
      "Engineered automated resume score analyzer evaluating tech stack keywords and ATS compatibility.",
      "Integrated MongoDB Atlas vector indexing for intelligent job description matching.",
      "Implemented real-time recruiter messaging and candidate telemetry dashboards."
    ],
    codeFileName: "resumeParser.ts",
    codeSnippet: `// Talent Forge AI ATS Resume Parser & Score Engine
export interface ATSScoreReport {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export function evaluateResume(resumeText: string, jobKeywords: string[]): ATSScoreReport {
  const normalizedText = resumeText.toLowerCase();
  const matched: string[] = [];
  const missing: string[] = [];

  jobKeywords.forEach((kw) => {
    if (normalizedText.includes(kw.toLowerCase())) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const matchRatio = matched.length / (jobKeywords.length || 1);
  const score = Math.round(matchRatio * 100);

  const suggestions: string[] = [];
  if (score < 75) {
    suggestions.push(\`Incorporate missing core skills: \${missing.slice(0, 3).join(', ')}\`);
  }
  if (!normalizedText.includes('metrics') && !normalizedText.includes('%')) {
    suggestions.push('Add quantifiable impact metrics (e.g., % improvement, record counts)');
  }

  return { score, matchedKeywords: matched, missingKeywords: missing, suggestions };
}`
  },
  {
    id: "proj-regional-sales",
    title: "Regional Sales Data Analysis (SQL & Power BI)",
    category: "Business Intelligence & SQL",
    lastModified: "Jun 14, 2026",
    size: "9.6 MB",
    filesCount: "12 files",
    techStack: ["SQL", "MySQL", "Power BI", "DAX", "Data Modeling", "Excel"],
    githubUrl: "https://github.com/CodeBy-Aryan-pixel/Regional-Sales-Data-Analysis-SQL-PowerBI",
    liveUrl: "https://github.com/CodeBy-Aryan-pixel/Regional-Sales-Data-Analysis-SQL-PowerBI",
    description: "Comprehensive relational sales analysis pipeline featuring complex SQL queries, star schema data modeling, and interactive Power BI executive dashboards.",
    highlights: [
      "Engineered star schema relational database modeling across 5 dimensions in MySQL.",
      "Authored complex analytical SQL queries using CTEs, window functions, and indexing.",
      "Constructed DAX calculated measures for Year-over-Year (YoY) revenue and profit margins.",
      "Built dynamic drill-through Power BI reports visualizing regional sales trends."
    ],
    codeFileName: "regional_analytics.sql",
    codeSnippet: `-- Complex Regional Sales & YoY Growth Analysis Query
WITH RegionalMetrics AS (
    SELECT 
        r.RegionName,
        p.CategoryName,
        EXTRACT(YEAR FROM s.OrderDate) AS OrderYear,
        SUM(s.SalesAmount) AS TotalRevenue,
        SUM(s.Profit) AS TotalProfit,
        COUNT(DISTINCT s.OrderID) AS OrderVolume
    FROM FactSales s
    JOIN DimRegion r ON s.RegionID = r.RegionID
    JOIN DimProduct p ON s.ProductID = p.ProductID
    GROUP BY r.RegionName, p.CategoryName, EXTRACT(YEAR FROM s.OrderDate)
)
SELECT 
    RegionName,
    CategoryName,
    OrderYear,
    TotalRevenue,
    TotalProfit,
    ROUND((TotalProfit / TotalRevenue) * 100, 2) AS ProfitMarginPct,
    LAG(TotalRevenue) OVER (
        PARTITION BY RegionName, CategoryName ORDER BY OrderYear
    ) AS PrevYearRevenue,
    ROUND(
        ((TotalRevenue - LAG(TotalRevenue) OVER (PARTITION BY RegionName, CategoryName ORDER BY OrderYear)) 
        / NULLIF(LAG(TotalRevenue) OVER (PARTITION BY RegionName, CategoryName ORDER BY OrderYear), 0)) * 100, 2
    ) AS YoY_Growth_Pct
FROM RegionalMetrics
ORDER BY RegionName, OrderYear DESC;`
  },
  {
    id: "proj-visionlab",
    title: "VisionLab — In-Browser AI Computer Vision Engine",
    category: "AI & Computer Vision",
    lastModified: "Aug 23, 2026",
    size: "22.5 MB",
    filesCount: "35 files",
    techStack: ["TensorFlow.js", "MobileNet", "COCO-SSD", "React 19", "HTML5 Canvas", "WebGL"],
    githubUrl: "https://github.com/CodeBy-Aryan-pixel",
    liveUrl: "https://github.com/CodeBy-Aryan-pixel",
    description: "Real-time client-side neural network inference engine running dual models (MobileNet 1,000 ImageNet species classifier + COCO-SSD 80-class object detector) with WebGL acceleration.",
    highlights: [
      "Zero-latency in-browser inference with WebGL hardware GPU acceleration.",
      "Integrated MobileNet v2 supporting 1,000 fine-grained ImageNet classes (e.g., Tiger, Cheetah, Leopard).",
      "Real-time webcam stream bounding box detection with HUD target corner brackets.",
      "Dynamic telemetry tracking real-time FPS, inference latency in ms, and confidence probabilities."
    ],
    codeFileName: "visionEngine.js",
    codeSnippet: `// TensorFlow.js Dual-Model Inference Pipeline with WebGL Acceleration
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';

export class VisionLabEngine {
  constructor() {
    this.cocoModel = null;
    this.mobilenetModel = null;
    this.isInitialized = false;
  }

  async initialize() {
    await tf.setBackend('webgl');
    await tf.ready();
    const [coco, mobile] = await Promise.all([
      cocoSsd.load({ base: 'lite_mobilenet_v2' }),
      mobilenet.load({ version: 2, alpha: 1.0 })
    ]);
    this.cocoModel = coco;
    this.mobilenetModel = mobile;
    this.isInitialized = true;
  }

  async classifySpecies(imageElement, topK = 5) {
    const startTime = performance.now();
    const predictions = await this.mobilenetModel.classify(imageElement, topK);
    const latency = (performance.now() - startTime).toFixed(1);
    return { predictions, latency };
  }

  async detectObjects(videoOrImageElement) {
    const startTime = performance.now();
    const detections = await this.cocoModel.detect(videoOrImageElement);
    const latency = (performance.now() - startTime).toFixed(1);
    return { detections, latency };
  }
}`
  }
];

const TECH_PILL_STYLES = [
  'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'bg-rose-500/15 text-rose-300 border-rose-500/30',
  'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
];

export default function FilesApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [inspectingCode, setInspectingCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(ENRICHED_PROJECTS.map((p) => p.category))];
    return cats;
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ENRICHED_PROJECTS.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;
      const titleMatch = p.title.toLowerCase().includes(query);
      const descMatch = p.description.toLowerCase().includes(query);
      const categoryMatch = p.category.toLowerCase().includes(query);
      const techMatch = p.techStack.some((t) => t.toLowerCase().includes(query));
      return titleMatch || descMatch || categoryMatch || techMatch;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setInspectingCode(false);
    setCopiedCode(false);
  };

  const handleCopyCode = (snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1A1A1A] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* 1. Nautilus Top Toolbar */}
      <div className="h-12 bg-[#222222]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 gap-2 shrink-0 overflow-x-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <button 
            onClick={() => setSelectedCategory('All')}
            title="Back to All Projects"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg text-white/30 cursor-not-allowed">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Breadcrumb Path */}
          <div className="flex items-center bg-black/40 px-3 py-1 rounded-lg border border-white/10 text-xs text-white/80 overflow-hidden shadow-inner">
            <span className="flex items-center gap-1.5 text-white/60">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40 mx-1" />
            <span className="font-semibold text-ubuntu-orange truncate">
              Projects
            </span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40 mx-1" />
                <span className="font-semibold text-cyan-400 truncate">
                  {selectedCategory}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Search & View Mode Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Live Search Field */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search projects, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-ubuntu-orange w-40 sm:w-60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Grid / List Mode Switcher */}
          <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-0.5 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-ubuntu-orange text-white shadow-sm font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
              title="Grid View (Tile Cards)"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-ubuntu-orange text-white shadow-sm font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
              title="List View (Nautilus Table)"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Layout (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 sm:w-56 bg-[#202020]/90 backdrop-blur-md border-r border-white/10 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                Categories
              </div>
              <div className="space-y-1 mt-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = cat === 'All' 
                    ? ENRICHED_PROJECTS.length 
                    : ENRICHED_PROJECTS.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-ubuntu-orange text-white font-semibold shadow-md'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-ubuntu-orange'}`} />
                        <span className="truncate text-xs">{cat}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                System Places
              </div>
              <div className="space-y-1 mt-1 text-white/60">
                <div 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors"
                >
                  <Home className="w-4 h-4 text-blue-400" />
                  <span>Home Repository</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>ext4 File System</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <Trash className="w-4 h-4 text-rose-400" />
                  <span>Trash Bin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Telemetry Badge */}
          <div className="pt-3 border-t border-white/5 text-[11px] text-white/50 space-y-1.5">
            <div className="flex justify-between font-mono text-[10px]">
              <span>Portfolio Storage:</span>
              <span className="text-emerald-400 font-bold">87.3 MB</span>
            </div>
            <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col bg-[#1A1A1A] overflow-y-auto p-4 sm:p-6 relative">
          {/* Header Bar with Counter */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'All Software Projects' : selectedCategory}</span>
              <span className="text-xs font-normal text-white/50 font-mono">
                ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
              </span>
            </h2>
            {searchQuery && (
              <span className="text-xs text-ubuntu-orange font-mono">
                Filter: "{searchQuery}"
              </span>
            )}
          </div>

          {/* Zero Results State */}
          {filteredProjects.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-white/50 space-y-3">
              <Search className="w-10 h-10 text-white/20" />
              <div className="font-bold text-white text-sm">No matching projects found</div>
              <p className="text-xs text-white/40 max-w-sm">
                No projects matched your search query "{searchQuery}". Try searching for Python, React, SQL, MERN, or AI.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-ubuntu-orange text-white text-xs font-medium transition-colors"
              >
                Clear Search Filter
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* ================= VIEW 1: GRID VIEW ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleOpenProjectModal(project)}
                  className="group relative bg-[#242424]/90 hover:bg-[#282828] backdrop-blur-md border border-white/10 hover:border-ubuntu-orange/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(233,84,32,0.25)] shadow-lg"
                >
                  <div>
                    {/* Header: Icon & Category Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="p-3 rounded-xl bg-ubuntu-orange/15 text-ubuntu-orange group-hover:scale-110 transition-transform duration-200 border border-ubuntu-orange/20 shadow-sm">
                        <Folder className="w-6 h-6 fill-ubuntu-orange/20" />
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 font-mono border border-white/5">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white group-hover:text-ubuntu-orange transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills & Footer */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech, idx) => {
                        const styleClass = TECH_PILL_STYLES[idx % TECH_PILL_STYLES.length];
                        return (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-mono border ${styleClass} font-medium`}
                          >
                            {tech}
                          </span>
                        );
                      })}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-white/5 text-white/40 border border-white/5">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/40 pt-1 font-mono">
                      <span>{project.lastModified}</span>
                      <span className="flex items-center gap-1 text-ubuntu-orange font-semibold group-hover:translate-x-0.5 transition-transform">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ================= VIEW 2: LIST VIEW (NAUTILUS TABLE) ================= */
            <div className="bg-[#242424]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg">
              {/* Table Column Headers */}
              <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-black/40 text-[11px] font-bold uppercase tracking-wider text-white/50 border-b border-white/10 font-mono">
                <div className="col-span-5 flex items-center gap-2">Name</div>
                <div className="col-span-3 hidden sm:block">Category</div>
                <div className="col-span-2 hidden md:block">Modified</div>
                <div className="col-span-4 sm:col-span-4 md:col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleOpenProjectModal(project)}
                    className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    {/* Name & Icon */}
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-lg bg-ubuntu-orange/15 text-ubuntu-orange shrink-0">
                        <Folder className="w-4 h-4 fill-ubuntu-orange/20" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white text-xs group-hover:text-ubuntu-orange transition-colors truncate">
                          {project.title}
                        </div>
                        <div className="text-[10px] text-white/50 font-mono truncate">
                          {project.filesCount} • {project.size}
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-3 hidden sm:flex items-center">
                      <span className="text-[11px] text-white/70 font-mono truncate">
                        {project.category}
                      </span>
                    </div>

                    {/* Modified Date */}
                    <div className="col-span-2 hidden md:flex items-center text-[11px] text-white/50 font-mono">
                      {project.lastModified}
                    </div>

                    {/* Action Button */}
                    <div className="col-span-7 sm:col-span-4 md:col-span-2 flex items-center justify-end gap-2">
                      <button className="px-3 py-1 rounded-lg bg-ubuntu-orange/15 text-ubuntu-orange hover:bg-ubuntu-orange hover:text-white transition-colors text-xs font-medium border border-ubuntu-orange/30 shadow-sm">
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Rich Project Detail & Code Inspection Modal */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#242424]/95 backdrop-blur-2xl border border-white/20 rounded-2xl w-full max-w-2xl p-5 sm:p-6 shadow-2xl space-y-4 my-auto animate-scale-in"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-3 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/30 shadow-md">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono mt-0.5">
                    <span>{selectedProject.category}</span>
                    <span>•</span>
                    <span>{selectedProject.lastModified}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal View Selector: Overview vs. Inspect Code */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                onClick={() => setInspectingCode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  !inspectingCode
                    ? 'bg-ubuntu-orange text-white shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overview & Highlights</span>
              </button>
              <button
                onClick={() => setInspectingCode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  inspectingCode
                    ? 'bg-ubuntu-orange text-white shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Inspect Code ({selectedProject.codeFileName})</span>
              </button>
            </div>

            {!inspectingCode ? (
              /* Sub-View A: Overview & Engineering Highlights */
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1.5 text-white/50">
                    Project Description
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-[#1E1E1E] p-3.5 rounded-xl border border-white/5">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-white/50 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Engineering Highlights</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-white/80">
                    {selectedProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-ubuntu-orange mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-white/50">
                    Tech Stack & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, idx) => {
                      const styleClass = TECH_PILL_STYLES[idx % TECH_PILL_STYLES.length];
                      return (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg font-mono text-xs border ${styleClass} font-semibold`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Sub-View B: Interactive Code Inspector */
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-[#1A1A1A] px-3 py-1.5 rounded-t-xl border border-white/10 border-b-0 font-mono text-[11px] text-white/60">
                  <span className="text-ubuntu-orange font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    {selectedProject.codeFileName}
                  </span>
                  <button
                    onClick={() => handleCopyCode(selectedProject.codeSnippet)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-ubuntu-orange text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className="bg-[#141414] p-4 rounded-b-xl border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto max-h-64 shadow-inner">
                  <pre className="leading-relaxed">
                    <code>{selectedProject.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Modal Footer: Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1.5 transition-colors text-xs border border-white/10"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3 text-white/50" />
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-ubuntu-orange/20 hover:bg-ubuntu-orange text-white font-medium flex items-center gap-1.5 transition-colors text-xs border border-ubuntu-orange/30"
                  >
                    <Globe className="w-3.5 h-3.5 text-ubuntu-orange" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-white/50" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-xs ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
