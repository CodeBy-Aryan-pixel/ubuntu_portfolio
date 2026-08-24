import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import DocumentViewer from './DocumentViewer';
import { FaCertificate, FaGoogleDrive, FaFilePdf } from 'react-icons/fa';
import { 
  Calendar, 
  ExternalLink, 
  Download, 
  Eye, 
  ShieldCheck, 
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function CertificationsApp({ onOpenApp: _onOpenApp }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const rawCertifications = portfolioData?.certifications || [];

  // Normalize certifications data in case of string entries
  const certifications = rawCertifications.map((cert, idx) => {
    if (typeof cert === 'object' && cert !== null) return cert;
    return {
      id: `cert-${idx}`,
      title: cert,
      name: cert,
      issuer: cert.includes('IBM') ? 'IBM' : cert.includes('Cisco') ? 'Cisco' : cert.includes('Oracle') ? 'Oracle' : 'Official',
      year: '2026',
      badge: 'Verified Credential',
      fileName: `${cert.replace(/\s+/g, '_')}.pdf`,
      description: 'Official verified credential certifying technical competence and practical skills.',
      previewUrl: 'https://drive.google.com/file/d/182Mm7AM77s_RdliGsqhXwZaBMqBY_wnh/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=182Mm7AM77s_RdliGsqhXwZaBMqBY_wnh',
      driveViewUrl: 'https://drive.google.com/file/d/182Mm7AM77s_RdliGsqhXwZaBMqBY_wnh/view'
    };
  });

  const filteredCerts = certifications.filter((cert) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cert.title?.toLowerCase().includes(q) ||
      cert.issuer?.toLowerCase().includes(q) ||
      cert.description?.toLowerCase().includes(q)
    );
  });

  // SUB-VIEW: If a certificate is clicked, render the interactive DocumentViewer
  if (selectedCert) {
    return (
      <DocumentViewer
        previewUrl={selectedCert.previewUrl}
        downloadUrl={selectedCert.downloadUrl}
        driveViewUrl={selectedCert.driveViewUrl || selectedCert.previewUrl?.replace('/preview', '/view')}
        documentTitle={selectedCert.fileName || `${selectedCert.title}.pdf`}
        issuer={selectedCert.issuer}
        onBack={() => setSelectedCert(null)}
        backLabel="Back to Certifications"
      />
    );
  }

  // Get issuer theme colors
  const getIssuerBadgeStyle = (issuer) => {
    const isOracle = issuer?.toLowerCase().includes('oracle');
    const isIbm = issuer?.toLowerCase().includes('ibm');
    const isCisco = issuer?.toLowerCase().includes('cisco');

    if (isOracle) {
      return {
        bg: 'bg-red-500/15',
        border: 'border-red-500/30',
        text: 'text-red-400',
        iconBg: 'bg-red-500/20 text-red-400 border-red-500/40',
        pill: 'bg-red-500/10 text-red-300 border-red-500/20'
      };
    }
    if (isIbm) {
      return {
        bg: 'bg-blue-500/15',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
        pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20'
      };
    }
    if (isCisco) {
      return {
        bg: 'bg-cyan-500/15',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
      };
    }
    return {
      bg: 'bg-ubuntu-orange/15',
      border: 'border-ubuntu-orange/30',
      text: 'text-ubuntu-orange',
      iconBg: 'bg-ubuntu-orange/20 text-ubuntu-orange border-ubuntu-orange/40',
      pill: 'bg-ubuntu-orange/10 text-ubuntu-orange border-ubuntu-orange/20'
    };
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-[#F2F2F2] select-none text-xs font-sans overflow-hidden">
      {/* 1. Top Header Toolbar */}
      <div className="h-12 bg-[#282828] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/30 shrink-0">
            <FaCertificate className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-bold text-sm text-white tracking-wide truncate block">
              Certifications & Credentials
            </span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {certifications.length} Verified Credentials
          </span>
        </div>

        {/* Search input */}
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Filter certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg pl-7 pr-3 py-1 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-ubuntu-orange w-36 sm:w-48 transition-all"
          />
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#1E1E1E] space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Header Description Banner */}
          <div className="bg-[#242424]/90 border border-white/10 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-white/70">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Click any certificate below to open the <strong className="text-white">Document Viewer</strong> preview or download the official PDF directly.
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-ubuntu-orange shrink-0">
              <Sparkles className="w-3 h-3" />
              Google Drive Stream
            </span>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredCerts.map((cert, idx) => {
              const theme = getIssuerBadgeStyle(cert.issuer);

              return (
                <div
                  key={cert.id || idx}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative bg-[#242424]/90 hover:bg-[#282828] border border-white/10 hover:border-ubuntu-orange/60 rounded-2xl p-4.5 sm:p-5 shadow-lg hover:shadow-[0_12px_28px_-6px_rgba(233,84,32,0.2)] transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Icon & Title */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform shadow-md mt-0.5`}>
                        <FaCertificate className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${theme.pill}`}>
                            {cert.issuer}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-white group-hover:text-ubuntu-orange transition-colors leading-snug">
                          {cert.title || cert.name}
                        </h3>

                        {cert.description && (
                          <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">
                            {cert.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Year Badge */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/50 font-mono shrink-0 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-ubuntu-orange" />
                      <span>{cert.year || '2026'}</span>
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
                      <FaFilePdf className="w-3.5 h-3.5 text-red-400" />
                      <span>PDF Document</span>
                      <span>•</span>
                      <span className="text-emerald-400">Direct Link Ready</span>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Open in Drive Button */}
                      <a
                        href={cert.driveViewUrl || cert.previewUrl?.replace('/preview', '/view')}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Open Certificate in Google Drive"
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-medium"
                      >
                        <FaGoogleDrive className="w-3 h-3 text-blue-400" />
                        <span className="hidden sm:inline">Drive</span>
                        <ExternalLink className="w-2.5 h-2.5 text-white/40" />
                      </a>

                      {/* Download PDF Button */}
                      <a
                        href={cert.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Download Certificate PDF"
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-medium"
                      >
                        <Download className="w-3 h-3 text-ubuntu-orange" />
                        <span className="hidden sm:inline">Download</span>
                      </a>

                      {/* Preview Button (Triggers viewer) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-ubuntu-orange/20 hover:bg-ubuntu-orange text-ubuntu-orange hover:text-white border border-ubuntu-orange/40 hover:border-ubuntu-orange transition-all font-semibold flex items-center gap-1.5 text-[11px] shadow-sm"
                        title="Preview Certificate in Document Viewer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="h-6 bg-[#242424] border-t border-white/10 px-3 flex items-center justify-between text-[10px] text-white/50 shrink-0 font-mono">
        <div className="flex items-center gap-2">
          <span>Official Credentials</span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">{certifications.length} Certified Credentials</span>
        </div>
        <div className="text-white/40">
          Ubuntu 24.04 LTS Document Hub
        </div>
      </div>
    </div>
  );
}
