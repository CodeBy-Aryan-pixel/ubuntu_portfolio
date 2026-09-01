import { useState, useCallback, useEffect } from 'react';
import { isMobileDevice } from '../utils/deviceUtils';

import { DEFAULT_WINDOW_Z_INDEX } from '../constants';

const INITIAL_WINDOWS = {
  terminal: {
    id: 'terminal',
    title: 'Aryan@ubuntu-portfolio: ~',
    appType: 'terminal',
    icon: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX + 10,
    defaultPosition: { x: 100, y: 55 },
    defaultSize: { width: 740, height: 480 },
    minSize: { width: 420, height: 300 },
    customData: null,
  },
  files: {
    id: 'files',
    title: 'Files — Projects',
    appType: 'files',
    icon: 'Folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 180, y: 90 },
    defaultSize: { width: 850, height: 530 },
    minSize: { width: 500, height: 350 },
    customData: { activeFolder: 'all' },
  },
  skills: {
    id: 'skills',
    title: 'System Monitor — Developer Analytics',
    appType: 'skills',
    icon: 'Cpu',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 220, y: 80 },
    defaultSize: { width: 840, height: 540 },
    minSize: { width: 480, height: 350 },
    customData: null,
  },
  experience: {
    id: 'experience',
    title: 'Experience & Internships',
    appType: 'experience',
    icon: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 150, y: 70 },
    defaultSize: { width: 800, height: 520 },
    minSize: { width: 460, height: 340 },
    customData: null,
  },
  about: {
    id: 'about',
    title: 'About Aryan — Profile',
    appType: 'about',
    icon: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 140, y: 75 },
    defaultSize: { width: 720, height: 500 },
    minSize: { width: 440, height: 340 },
    customData: null,
  },
  resume: {
    id: 'resume',
    title: 'Files — Resumes & Documents',
    appType: 'resume',
    icon: 'FileText',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 190, y: 60 },
    defaultSize: { width: 840, height: 600 },
    minSize: { width: 480, height: 380 },
    customData: null,
  },
  settings: {
    id: 'settings',
    title: 'Settings — Desktop Appearance',
    appType: 'settings',
    icon: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 240, y: 100 },
    defaultSize: { width: 700, height: 480 },
    minSize: { width: 460, height: 320 },
    customData: null,
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    appType: 'certifications',
    icon: 'FaCertificate',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 190, y: 70 },
    defaultSize: { width: 720, height: 480 },
    minSize: { width: 440, height: 320 },
    customData: null,
  },
  leadership: {
    id: 'leadership',
    title: 'Leadership & Activities',
    appType: 'leadership',
    icon: 'FaUsers',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 210, y: 85 },
    defaultSize: { width: 740, height: 490 },
    minSize: { width: 440, height: 320 },
    customData: null,
  },
  trash: {
    id: 'trash',
    title: 'aryan@ubuntu: ~/trash/hidden_game',
    appType: 'trash',
    icon: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 220, y: 75 },
    defaultSize: { width: 640, height: 520 },
    minSize: { width: 420, height: 420 },
    customData: null,
  },
  chatbot: {
    id: 'chatbot',
    title: 'aryan-ai-assistant',
    appType: 'chatbot',
    icon: 'FaRobot',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 240, y: 70 },
    defaultSize: { width: 660, height: 560 },
    minSize: { width: 420, height: 420 },
    customData: null,
  },
  visionlab: {
    id: 'visionlab',
    title: 'VisionLab — AI Model Inference Engine',
    appType: 'visionlab',
    icon: 'Camera',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX,
    defaultPosition: { x: 160, y: 55 },
    defaultSize: { width: 920, height: 600 },
    minSize: { width: 550, height: 420 },
    customData: null,
  },
  'document-viewer': {
    id: 'document-viewer',
    title: 'Document Viewer — PDF Preview',
    appType: 'document-viewer',
    icon: 'FileText',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX + 5,
    defaultPosition: { x: 170, y: 60 },
    defaultSize: { width: 880, height: 600 },
    minSize: { width: 480, height: 380 },
    customData: null,
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState(() => {
    return Object.keys(INITIAL_WINDOWS).find((id) => INITIAL_WINDOWS[id].isOpen) || null;
  });
  const [stackOrder, setStackOrder] = useState(() => Object.keys(INITIAL_WINDOWS));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const focusWindow = useCallback((id) => {
    if (!id) return;
    setWindows((curr) => {
      const target = curr[id];
      if (!target || !target.isOpen) return curr;
      if (target.isMinimized) {
        return {
          ...curr,
          [id]: {
            ...target,
            isMinimized: false,
          },
        };
      }
      return curr;
    });
    setStackOrder((prev) => [...prev.filter((wId) => wId !== id), id]);
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback((id, customData = null) => {
    setWindows((curr) => {
      const target = curr[id] || INITIAL_WINDOWS[id];
      if (!target) return curr;

      return {
        ...curr,
        [id]: {
          ...target,
          isOpen: true,
          isMinimized: false,
          customData: customData ? { ...target.customData, ...customData } : target.customData,
        },
      };
    });
    setStackOrder((prev) => [...prev.filter((wId) => wId !== id), id]);
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((curr) => {
      if (!curr[id]) return curr;
      const updated = {
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: false,
          isMinimized: false,
        },
      };

      setStackOrder((prevOrder) => {
        const remainingOpen = prevOrder.filter(
          (wId) => wId !== id && updated[wId]?.isOpen && !updated[wId]?.isMinimized
        );
        const nextActiveId = remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : null;
        setActiveWindowId(nextActiveId);
        return prevOrder;
      });

      return updated;
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((curr) => {
      if (!curr[id]) return curr;
      const isNowMinimized = !curr[id].isMinimized;
      const updated = {
        ...curr,
        [id]: {
          ...curr[id],
          isMinimized: isNowMinimized,
        },
      };

      setStackOrder((prevOrder) => {
        if (isNowMinimized) {
          const remainingOpen = prevOrder.filter(
            (wId) => wId !== id && updated[wId]?.isOpen && !updated[wId]?.isMinimized
          );
          const nextActiveId = remainingOpen.length > 0 ? remainingOpen[remainingOpen.length - 1] : null;
          setActiveWindowId((currentActive) => (currentActive === id ? nextActiveId : currentActive));
          return prevOrder;
        } else {
          const newOrder = [...prevOrder.filter((wId) => wId !== id), id];
          setActiveWindowId(id);
          return newOrder;
        }
      });

      return updated;
    });
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((curr) => {
      if (!curr[id]) return curr;
      return {
        ...curr,
        [id]: {
          ...curr[id],
          isMaximized: !curr[id].isMaximized,
        },
      };
    });
    setStackOrder((prev) => [...prev.filter((wId) => wId !== id), id]);
    setActiveWindowId(id);
  }, []);

  const updatePosition = useCallback((id, position) => {
    setWindows((curr) => {
      if (!curr[id]) return curr;
      return {
        ...curr,
        [id]: {
          ...curr[id],
          defaultPosition: position,
        },
      };
    });
  }, []);

  const updateSize = useCallback((id, size) => {
    setWindows((curr) => {
      if (!curr[id]) return curr;
      return {
        ...curr,
        [id]: {
          ...curr[id],
          defaultSize: size,
        },
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    stackOrder,
    isMobile,
    openWindow,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updatePosition,
    updateSize,
  };
}
