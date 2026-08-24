import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  RefreshCw, 
  FileText,
  Folder,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Search,
  Grid,
  List as ListIcon,
  Home,
  Cloud,
  Eye,
  X
} from 'lucide-react';
import { FaFilePdf, FaGoogleDrive } from 'react-icons/fa';

const RESUME_DOCUMENTS = [
  {
    id: "aryan-kamat-sde-resume",
    name: "Aryan_Kamat_Software_Resume.pdf",
    category: "Official Resume",
    type: "PDF Document",
    size: "1.8 MB",
    lastModified: "Aug 2026",
    verified: true,
    description: "Official software engineering & full-stack resume highlighting SDE projects, AI/ML research, and tech stack proficiencies.",
    previewUrl: "https://drive.google.com/file/d/1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J",
    driveViewUrl: "https://drive.google.com/file/d/1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J/view",
  }
];

export default function ResumeApp() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const filteredDocs = RESUME_DOCUMENTS.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(q) || doc.category.toLowerCase().includes(q);
  });

  const handleOpenDoc = (doc) => {
    setSelectedDoc(doc);
    setIsLoadingIframe(true);
  };

  const handleRefreshIframe = () => {
    setIsLoadingIframe(true);
    setIframeKey((prev) => prev + 1);
  };

  // ----------------------------------------------------
  // SUB-VIEW 2: EMBEDDED DOCUMENT VIEWER (PREVIEW MODE)
  // ----------------------------------------------------
  if (selectedDoc) {
    return (
      <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
        {/* Top Viewer Toolbar */}
        <div className="h-11 bg-[#282828] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 gap-2 shrink-0">
          {/* Back Navigation & File Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setSelectedDoc(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-ubuntu-orange text-white text-xs font-medium transition-colors shadow-sm"
              title="Back to Files"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Files</span>
            </button>

            <div className="p-1.5 rounded-lg bg-red-500/15 text-red-500 border border-red-500/20 shrink-0">
              <FaFilePdf className="w-4 h-4" />
            </div>

            <div className="truncate">
              <span className="font-bold text-xs text-white tracking-wide truncate block">
                {selectedDoc.name}
              </span>
            </div>

            <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified Google Drive
            </span>
          </div>

          {/* Action Buttons: Reload, Open in Drive, Download PDF */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRefreshIframe}
              title="Reload Preview Stream"
              className="p-1.5 rounded-lg bg-[#1E1E1E] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingIframe ? 'animate-spin text-ubuntu-orange' : ''}`} />
            </button>

            <a
              href={selectedDoc.driveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E1E1E] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors text-xs font-medium"
              title="Open in Google Drive"
            >
              <FaGoogleDrive className="w-3.5 h-3.5 text-blue-400" />
              <span>Open in Drive</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
            </a>

            <a
              href={selectedDoc.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-ubuntu-orange/25 text-xs"
              title="Download Official PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Embedded Iframe Viewport */}
        <div className="relative flex-1 w-full h-full bg-[#1A1A1A] overflow-hidden">
          {isLoadingIframe && (
            <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center space-y-3 z-10 animate-fade-in">
              <div className="w-10 h-10 rounded-2xl bg-ubuntu-orange/20 border border-ubuntu-orange/40 flex items-center justify-center">
                <FaFilePdf className="w-5 h-5 text-ubuntu-orange animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-white">Loading Official Resume...</p>
                <p className="text-[11px] text-white/50 font-mono">Fetching Google Drive preview stream</p>
              </div>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={selectedDoc.previewUrl || selectedDoc.driveViewUrl}
            title={selectedDoc.name}
            onLoad={() => setIsLoadingIframe(false)}
            allow="autoplay"
            className="w-full h-full border-none bg-[#1E1E1E] block"
          />
        </div>

        {/* Bottom Viewer Status Bar */}
        <div className="h-6 bg-[#242424] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-white/50 shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <span>Document Viewer</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{selectedDoc.size}</span>
          </div>
          <button
            onClick={() => setSelectedDoc(null)}
            className="text-ubuntu-orange hover:underline flex items-center gap-1"
          >
            <span>Close Preview</span>
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SUB-VIEW 1: NAUTILUS FILE EXPLORER VIEW (DEFAULT)
  // ----------------------------------------------------
  return (
    <div className="w-full h-full flex flex-col bg-[#1A1A1A] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* 1. Nautilus Top Toolbar */}
      <div className="h-12 bg-[#222222]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 sm:px-4 gap-2 shrink-0">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <button className="p-1.5 rounded-lg text-white/30 cursor-not-allowed">
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
            <span className="flex items-center gap-1.5 text-white/60">
              <Folder className="w-3.5 h-3.5 text-ubuntu-orange" />
              <span>Documents</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40 mx-1" />
            <span className="font-semibold text-ubuntu-orange truncate">
              Resumes
            </span>
          </div>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-ubuntu-orange w-40 sm:w-52 transition-all"
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

          <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-0.5 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-ubuntu-orange text-white shadow-sm font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
              title="Grid View"
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
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main File Explorer Body (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Places Sidebar */}
        <div className="w-44 sm:w-52 bg-[#202020]/90 backdrop-blur-md border-r border-white/10 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono">
                Places
              </div>
              <div className="space-y-1 mt-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left bg-ubuntu-orange text-white font-semibold shadow-md">
                  <Folder className="w-4 h-4 text-white" />
                  <span className="truncate text-xs">Resumes</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span className="truncate text-xs">Home Directory</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-left text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                  <Cloud className="w-4 h-4 text-emerald-400" />
                  <span className="truncate text-xs">Google Drive</span>
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Storage Badge */}
          <div className="pt-3 border-t border-white/5 text-[11px] text-white/50 space-y-1.5">
            <div className="flex justify-between font-mono text-[10px]">
              <span>Document Store:</span>
              <span className="text-emerald-400 font-bold">1.8 MB</span>
            </div>
            <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
              <div className="w-1/6 h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Content Directory Area */}
        <div className="flex-1 flex flex-col bg-[#1A1A1A] overflow-y-auto p-4 sm:p-6 relative">
          {/* Header Banner */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Official Resume Documents</span>
              <span className="text-xs font-normal text-white/50 font-mono">
                ({filteredDocs.length} {filteredDocs.length === 1 ? 'file' : 'files'})
              </span>
            </h2>
            <span className="text-[11px] text-white/40 font-mono hidden sm:inline">
              Click any file to open preview
            </span>
          </div>

          {/* VIEW MODE 1: GRID TILES */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => {
                const isPdf = doc.type.includes('PDF');

                return (
                  <div
                    key={doc.id}
                    onClick={() => handleOpenDoc(doc)}
                    className="group relative bg-[#242424]/90 hover:bg-[#282828] backdrop-blur-md border border-white/10 hover:border-ubuntu-orange/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(233,84,32,0.25)] shadow-lg"
                  >
                    <div>
                      {/* Icon & Category Badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className={`p-3 rounded-xl ${isPdf ? 'bg-red-500/15 text-red-500 border border-red-500/20' : 'bg-blue-500/15 text-blue-400 border border-blue-500/20'} group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                          {isPdf ? <FaFilePdf className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        </div>
                        {doc.verified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono border border-emerald-500/30 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Official
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-white group-hover:text-ubuntu-orange transition-colors line-clamp-1">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-white/60 mt-1.5 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    {/* Metadata & Open Prompt */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
                      <span>{doc.size} • {doc.lastModified}</span>
                      <span className="flex items-center gap-1 text-ubuntu-orange font-semibold group-hover:translate-x-0.5 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW MODE 2: NAUTILUS LIST TABLE */
            <div className="bg-[#242424]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg">
              <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-black/40 text-[11px] font-bold uppercase tracking-wider text-white/50 border-b border-white/10 font-mono">
                <div className="col-span-6 flex items-center gap-2">Name</div>
                <div className="col-span-3 hidden sm:block">Type</div>
                <div className="col-span-3 text-right">Action</div>
              </div>

              <div className="divide-y divide-white/5">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleOpenDoc(doc)}
                    className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <div className="col-span-6 flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-lg bg-red-500/15 text-red-500 shrink-0">
                        <FaFilePdf className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white text-xs group-hover:text-ubuntu-orange transition-colors truncate">
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-white/50 font-mono truncate">
                          {doc.size} • {doc.lastModified}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 hidden sm:flex items-center text-[11px] text-white/70 font-mono">
                      {doc.type}
                    </div>

                    <div className="col-span-6 sm:col-span-3 flex items-center justify-end gap-2">
                      <button className="px-3 py-1 rounded-lg bg-ubuntu-orange/20 text-ubuntu-orange hover:bg-ubuntu-orange hover:text-white transition-colors text-xs font-semibold border border-ubuntu-orange/30">
                        Open Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="h-6 bg-[#242424] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-white/50 shrink-0 font-mono">
        <div>Total: {RESUME_DOCUMENTS.length} items (1 selected)</div>
        <div>Nautilus 46.0 • ext4 Document System</div>
      </div>
    </div>
  );
}
