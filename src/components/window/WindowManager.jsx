import React from 'react';
import WindowFrame from './WindowFrame';
import TerminalApp from '../apps/TerminalApp';
import FilesApp from '../apps/FilesApp';
import SystemMonitorApp from '../apps/SystemMonitorApp';
import ExperienceApp from '../apps/ExperienceApp';
import AboutApp from '../apps/AboutApp';
import ResumeApp from '../apps/ResumeApp';
import DocumentViewer from '../apps/DocumentViewer';
import SettingsApp from '../apps/SettingsApp';
import CertificationsApp from '../apps/CertificationsApp';
import LeadershipApp from '../apps/LeadershipApp';
import TrashMiniGame from '../apps/TrashMiniGame';
import ChatbotApp from '../apps/ChatbotApp';
import VisionLabApp from '../apps/VisionLabApp';
import ErrorBoundary from '../common/ErrorBoundary';

export default function WindowManager({
  windows,
  activeWindowId,
  isMobile,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onOpenApp,
  currentWallpaper,
  onSelectWallpaper,
  accentColor,
  onSelectAccentColor,
  dockSize,
  onChangeDockSize,
}) {
  const openWindows = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {openWindows.map((win) => {
        const isActive = activeWindowId === win.id;

        return (
          <div key={win.id} className="pointer-events-auto">
            <WindowFrame
              windowData={win}
              isActive={isActive}
              isMobile={isMobile}
              onFocus={onFocus}
              onClose={onClose}
              onMinimize={onMinimize}
              onToggleMaximize={onToggleMaximize}
            >
              <ErrorBoundary appName={win.title}>
                {win.appType === 'terminal' && (
                  <TerminalApp onOpenApp={onOpenApp} />
                )}
                {win.appType === 'files' && (
                  <FilesApp initialFolder={win.customData?.activeFolder || 'all'} />
                )}
                {win.appType === 'skills' && (
                  <SystemMonitorApp />
                )}
                {win.appType === 'experience' && (
                  <ExperienceApp />
                )}
                {win.appType === 'about' && (
                  <AboutApp onOpenTerminal={() => onOpenApp('terminal')} />
                )}
                {win.appType === 'resume' && (
                  <ResumeApp />
                )}
                {(win.appType === 'document-viewer' || win.appType === 'documentViewer') && (
                  <DocumentViewer
                    previewUrl={win.customData?.previewUrl}
                    downloadUrl={win.customData?.downloadUrl}
                    driveViewUrl={win.customData?.driveViewUrl}
                    documentTitle={win.customData?.documentTitle || win.title}
                    issuer={win.customData?.issuer}
                    onBack={win.customData?.onBack}
                    backLabel={win.customData?.backLabel || "Back"}
                  />
                )}
                {win.appType === 'certifications' && (
                  <CertificationsApp onOpenApp={onOpenApp} />
                )}
                {win.appType === 'leadership' && (
                  <LeadershipApp />
                )}
                {win.appType === 'trash' && (
                  <TrashMiniGame />
                )}
                {win.appType === 'chatbot' && (
                  <ChatbotApp />
                )}
                {win.appType === 'visionlab' && (
                  <VisionLabApp />
                )}
                {win.appType === 'settings' && (
                  <SettingsApp
                    currentWallpaper={currentWallpaper}
                    onSelectWallpaper={onSelectWallpaper}
                    accentColor={accentColor}
                    onSelectAccentColor={onSelectAccentColor}
                    dockSize={dockSize}
                    onChangeDockSize={onChangeDockSize}
                  />
                )}
              </ErrorBoundary>
            </WindowFrame>
          </div>
        );
      })}
    </div>
  );
}
