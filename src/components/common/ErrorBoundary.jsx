import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, showDetails: false });
    if (this.props.onReset) {
      try {
        this.props.onReset();
      } catch (e) {
        console.warn('Error during onReset handler:', e);
      }
    }
  };

  render() {
    if (this.state.hasError) {
      const { appName, isGlobal } = this.props;
      const { error, errorInfo, showDetails } = this.state;

      // 1. Global Full-Screen Error Recovery (Desktop Crash Prevention)
      if (isGlobal) {
        return (
          <div className="w-screen h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center p-6 select-none font-sans relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute w-96 h-96 bg-ubuntu-orange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 bg-[#242424]/95 backdrop-blur-2xl border border-white/15 p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl space-y-6 animate-fade-in">
              {/* Header Icon Badge */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h1 className="text-lg font-bold text-white tracking-wide">
                  Ubuntu Desktop Session Recovery
                </h1>
                <p className="text-xs text-white/70 leading-relaxed">
                  A component encountered an unexpected runtime exception. The desktop environment caught this error to prevent a total crash.
                </p>
              </div>

              {/* Error Message Pill */}
              <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl text-left font-mono text-xs text-red-300 break-words max-h-32 overflow-y-auto">
                {error?.message || 'Unknown system error occurred'}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-ubuntu-orange/20 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restart Desktop Session</span>
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Hard Reload Page
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 2. In-Window App Level Recovery (Ubuntu Window Style)
      return (
        <div className="w-full h-full bg-[#1e1e1e] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans overflow-y-auto">
          <div className="max-w-md w-full bg-[#242424]/90 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4 animate-fade-in">
            {/* Warning Icon Badge */}
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <AlertTriangle className="w-6 h-6" />
            </div>

            {/* Error Message */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">
                Oops! This application encountered an error
              </h3>
              <p className="text-xs text-white/60">
                {appName ? `Problem reported in ${appName}` : 'An unexpected exception occurred inside this window.'}
              </p>
            </div>

            {/* Short Error Box */}
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-left font-mono text-[11px] text-red-300 break-words max-h-24 overflow-y-auto">
              {error?.message || 'Application runtime exception'}
            </div>

            {/* Collapsible Details */}
            {errorInfo?.componentStack && (
              <div className="text-left">
                <button
                  onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                  className="text-[10px] text-white/50 hover:text-white/80 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3 h-3 text-ubuntu-orange" />
                  <span>{showDetails ? 'Hide stack trace' : 'View diagnostic details'}</span>
                  {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {showDetails && (
                  <pre className="mt-2 p-2 bg-black/80 border border-white/10 rounded-lg text-[9px] font-mono text-white/60 max-h-28 overflow-y-auto whitespace-pre-wrap">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Restart App Button */}
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-2.5 bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-ubuntu-orange/20 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
