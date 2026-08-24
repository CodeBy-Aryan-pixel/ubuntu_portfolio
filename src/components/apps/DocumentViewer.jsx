import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ExternalLink, 
  RefreshCw, 
  ArrowLeft,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { FaFilePdf, FaGoogleDrive } from 'react-icons/fa';

export default function DocumentViewer({
  previewUrl = "https://drive.google.com/file/d/1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J/preview",
  downloadUrl = "https://drive.google.com/uc?export=download&id=1o_NrjAKGRD7tNkletVEj-ho3fUNBvI8J",
  driveViewUrl = null,
  documentTitle = "Aryan_Kamat_Software_Resume.pdf",
  issuer = null,
  onBack = null,
  backLabel = "Back"
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const effectiveDriveViewUrl = driveViewUrl || (previewUrl ? previewUrl.replace('/preview', '/view') : '#');

  useEffect(() => {
    setIsLoading(true);
  }, [previewUrl]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* 1. PDF / Document Viewer Top Ubuntu Dark Toolbar */}
      <div className="h-11 bg-[#282828] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 gap-2 shrink-0">
        {/* Document Title with Red PDF Badge & Optional Back Button */}
        <div className="flex items-center gap-2.5 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-ubuntu-orange text-white text-xs font-medium transition-colors shadow-sm shrink-0"
              title={backLabel}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{backLabel}</span>
            </button>
          )}

          <div className="p-1.5 rounded-lg bg-red-500/15 text-red-500 border border-red-500/20 shrink-0">
            <FaFilePdf className="w-4 h-4" />
          </div>

          <div className="truncate">
            <span className="font-bold text-xs text-white tracking-wide truncate block">
              {documentTitle}
            </span>
          </div>

          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {issuer ? `${issuer} • Verified` : 'Google Drive Preview'}
          </span>
        </div>

        {/* Toolbar Actions (Reload, Open in Drive, Download PDF) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            title="Reload Document Viewer"
            className="p-1.5 rounded-lg bg-[#1E1E1E] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-ubuntu-orange' : ''}`} />
          </button>

          <a
            href={effectiveDriveViewUrl}
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
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-ubuntu-orange/25 text-xs"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* 2. Embedded Google Drive Viewer Viewport */}
      <div className="relative flex-1 w-full h-full bg-[#1A1A1A] overflow-hidden">
        {/* Loading Skeleton & Status Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center space-y-3 z-10 animate-fade-in">
            <div className="w-10 h-10 rounded-2xl bg-ubuntu-orange/20 border border-ubuntu-orange/40 flex items-center justify-center">
              <FaFilePdf className="w-5 h-5 text-ubuntu-orange animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white">Loading Document Viewer...</p>
              <p className="text-[11px] text-white/50 font-mono">Streaming official verified certificate from Google Drive</p>
            </div>
          </div>
        )}

        {/* Google Drive Preview Iframe */}
        <iframe
          key={iframeKey}
          src={previewUrl}
          title={documentTitle}
          onLoad={() => setIsLoading(false)}
          allow="autoplay"
          className="w-full h-full border-none bg-[#1E1E1E] block"
        />
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="h-6 bg-[#242424] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-white/50 shrink-0 font-mono">
        <div className="flex items-center gap-2">
          <span>Document Viewer</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Native Cloud Stream</span>
        </div>
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="text-white/60 hover:text-white hover:underline flex items-center gap-1"
            >
              <span>← {backLabel}</span>
            </button>
          )}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ubuntu-orange hover:underline flex items-center gap-1"
          >
            <span>Direct Download Link</span>
          </a>
        </div>
      </div>
    </div>
  );
}

