import React, { useState, useRef, useEffect } from 'react';
import { 
  Minus, 
  Square, 
  X, 
  Terminal, 
  Folder, 
  Cpu, 
  Briefcase, 
  User, 
  FileText, 
  Settings,
  Award,
  Users
} from 'lucide-react';
import { FaCertificate, FaUsers, FaRobot, FaChartLine } from 'react-icons/fa';
import { TbActivity } from 'react-icons/tb';

import { ACTIVE_WINDOW_Z_INDEX, DEFAULT_WINDOW_Z_INDEX } from '../../constants';

const ICON_MAP = {
  Terminal: Terminal,
  Folder: Folder,
  Cpu: Cpu,
  Briefcase: Briefcase,
  User: User,
  FileText: FileText,
  Settings: Settings,
  Award: Award,
  Users: Users,
  FaCertificate: FaCertificate,
  FaUsers: FaUsers,
  FaRobot: FaRobot,
  TbActivity: TbActivity,
  FaChartLine: FaChartLine,
};

const SNAP_THRESHOLD = 20; // 20px edge snap threshold
const TOP_BAR_HEIGHT = '32px'; // Height of global Top Bar (prevents window header overlap)
const DOCK_WIDTH = '64px'; // Width of side Dock (prevents dock overlap)

export default function WindowFrame({
  windowData,
  isActive,
  zIndex: propZIndex,
  isMobile,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children,
}) {
  const { id, title, icon, isMaximized, defaultPosition, defaultSize, minSize } = windowData;
  const zIndex = propZIndex !== undefined
    ? propZIndex
    : (isActive ? ACTIVE_WINDOW_Z_INDEX : (windowData.zIndex || DEFAULT_WINDOW_Z_INDEX));

  const [position, setPosition] = useState(defaultPosition || { x: 100, y: 60 });
  const [size, setSize] = useState(defaultSize || { width: 750, height: 480 });
  const [snapState, setSnapState] = useState('none'); // 'none' | 'left' | 'right' | 'top'
  const [snapPreview, setSnapPreview] = useState(null); // 'left' | 'right' | 'top' | null
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragRef = useRef({ 
    startX: 0, 
    startY: 0, 
    initialPosX: 0, 
    initialPosY: 0,
    currentSnap: null 
  });
  const resizeRef = useRef({ startX: 0, startY: 0, initialW: 0, initialH: 0, direction: '' });

  const IconComponent = ICON_MAP[icon] || Terminal;

  // Window drag start handling
  const handleMouseDownHeader = (e) => {
    // Only respond to left clicks
    if (e.button !== 0 || e.target.closest('button')) return;

    onFocus(id);

    // If window was maximized or snapped, unsnap it on drag
    let currentX = position.x;
    let currentY = position.y;

    if (isMaximized || snapState !== 'none') {
      if (isMaximized) onToggleMaximize(id);
      setSnapState('none');
      
      // Center the restored window around the cursor
      currentX = Math.max(64, Math.min(window.innerWidth - size.width, e.clientX - size.width / 2));
      currentY = Math.max(32, e.clientY - 20);
      setPosition({ x: currentX, y: currentY });
    }

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: currentX,
      initialPosY: currentY,
      currentSnap: null,
    };
  };

  // Window resize handling
  const handleMouseDownResize = (e, direction) => {
    e.stopPropagation();
    if (isMaximized || snapState !== 'none') return;

    onFocus(id);
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialW: size.width,
      initialH: size.height,
      initialPosX: position.x,
      initialPosY: position.y,
      direction,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        
        const newX = dragRef.current.initialPosX + dx;
        const newY = Math.max(32, dragRef.current.initialPosY + dy);
        
        setPosition({ x: newX, y: newY });

        // Snapping Threshold Check (20px from screen edges)
        const screenWidth = window.innerWidth;
        let detectedSnap = null;

        if (e.clientY <= SNAP_THRESHOLD || newY <= 32 + SNAP_THRESHOLD) {
          detectedSnap = 'top'; // Maximize trigger
        } else if (e.clientX <= SNAP_THRESHOLD || newX <= 64 + SNAP_THRESHOLD) {
          detectedSnap = 'left'; // Left split screen
        } else if (e.clientX >= screenWidth - SNAP_THRESHOLD || (newX + size.width) >= screenWidth - SNAP_THRESHOLD) {
          detectedSnap = 'right'; // Right split screen
        }

        dragRef.current.currentSnap = detectedSnap;
        setSnapPreview(detectedSnap);
      } else if (isResizing) {
        const { startX, startY, initialW, initialH, direction } = resizeRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newW = initialW;
        let newH = initialH;

        if (direction.includes('e')) newW = Math.max(minSize?.width || 380, initialW + dx);
        if (direction.includes('s')) newH = Math.max(minSize?.height || 280, initialH + dy);

        setSize({ width: newW, height: newH });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        const finalSnap = dragRef.current.currentSnap;
        if (finalSnap === 'top') {
          if (!isMaximized) {
            onToggleMaximize(id);
          }
          setSnapState('none');
        } else if (finalSnap === 'left' || finalSnap === 'right') {
          setSnapState(finalSnap);
          if (isMaximized) {
            onToggleMaximize(id);
          }
        } else {
          setSnapState('none');
        }
      }

      setIsDragging(false);
      setIsResizing(false);
      setSnapPreview(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, minSize, size.width, isMaximized, onToggleMaximize, id]);

  // Compute Layout Position & Dimensions Based on State
  let currentStyle = {};
  if (isMaximized) {
    currentStyle = {
      top: TOP_BAR_HEIGHT,
      left: DOCK_WIDTH,
      width: `calc(100vw - ${DOCK_WIDTH})`,
      height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
      zIndex,
    };
  } else if (snapState === 'left') {
    currentStyle = {
      top: TOP_BAR_HEIGHT,
      left: DOCK_WIDTH,
      width: `calc((100vw - ${DOCK_WIDTH}) / 2)`,
      height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
      zIndex,
    };
  } else if (snapState === 'right') {
    currentStyle = {
      top: TOP_BAR_HEIGHT,
      left: `calc(${DOCK_WIDTH} + (100vw - ${DOCK_WIDTH}) / 2)`,
      width: `calc((100vw - ${DOCK_WIDTH}) / 2)`,
      height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
      zIndex,
    };
  } else {
    currentStyle = {
      top: `${position.y}px`,
      left: `${position.x}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
      zIndex,
    };
  }

  const isSnappedOrMaximized = isMaximized || snapState !== 'none';

  return (
    <>
      {/* 1. Translucent Snapping Preview Guide Overlay */}
      {isDragging && snapPreview && (
        <div
          style={{
            top: TOP_BAR_HEIGHT,
            left: snapPreview === 'right' ? `calc(${DOCK_WIDTH} + (100vw - ${DOCK_WIDTH}) / 2)` : DOCK_WIDTH,
            width: snapPreview === 'top' ? `calc(100vw - ${DOCK_WIDTH})` : `calc((100vw - ${DOCK_WIDTH}) / 2)`,
            height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
          }}
          className={`fixed pointer-events-none z-[999] bg-ubuntu-orange/20 border-2 border-ubuntu-orange backdrop-blur-[2px] transition-all duration-150 ${
            snapPreview === 'top'
              ? 'rounded-none'
              : snapPreview === 'left'
              ? 'rounded-r-none'
              : 'rounded-l-none'
          }`}
        />
      )}

      {/* 2. Main Window Container */}
      <div
        onMouseDown={() => onFocus && onFocus(id)}
        style={currentStyle}
        className={`fixed flex flex-col overflow-hidden select-none border border-white/10 ${
          isDragging ? 'transition-none' : 'transition-all duration-200 ease-out'
        } ${
          isSnappedOrMaximized ? 'rounded-none' : 'rounded-2xl'
        } ${
          isActive
            ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-ubuntu-orange/40'
            : 'shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] opacity-95'
        }`}
      >
        {/* Translucent Glassmorphism Window Header Bar */}
        <div
          onMouseDown={handleMouseDownHeader}
          onDoubleClick={() => {
            setSnapState('none');
            onToggleMaximize(id);
          }}
          className={`h-10 px-4 flex items-center justify-between cursor-default shrink-0 backdrop-blur-md border-b border-white/10 ${
            id === 'terminal'
              ? 'bg-black/60'
              : isActive
              ? 'bg-[#242424]/80'
              : 'bg-[#1c1c1c]/70'
          }`}
        >
          {/* Left App Icon & Title */}
          <div className="flex items-center gap-2.5 min-w-0 pointer-events-none">
            <div className={`p-1 rounded-md ${isActive ? 'bg-ubuntu-orange/20 text-ubuntu-orange' : 'bg-white/5 text-white/40'}`}>
              <IconComponent className="w-3.5 h-3.5 shrink-0" />
            </div>
            <span className={`text-xs font-sans font-semibold tracking-wide truncate ${isActive ? 'text-white' : 'text-white/60'}`}>
              {title}
            </span>
          </div>

          {/* Right Authentic Ubuntu Window Controls (Min, Max, Close) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(id);
              }}
              title="Minimize"
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white flex items-center justify-center p-0 overflow-visible transition-colors shadow-sm cursor-pointer"
            >
              <Minus className="w-3 h-3 overflow-visible shrink-0" strokeWidth={2.5} />
            </button>

            {/* Maximize Button - Fully enclosed 4-sided square with no clipping */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSnapState('none');
                onToggleMaximize(id);
              }}
              title={isMaximized || snapState !== 'none' ? "Restore" : "Maximize"}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white flex items-center justify-center p-0 overflow-visible transition-colors shadow-sm cursor-pointer"
            >
              <Square className="w-2.5 h-2.5 overflow-visible shrink-0" strokeWidth={2.5} />
            </button>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              title="Close"
              className="w-5 h-5 rounded-full bg-[#E95420] hover:bg-[#FF6A35] text-white flex items-center justify-center p-0 overflow-visible transition-colors shadow-sm cursor-pointer"
            >
              <X className="w-3 h-3 overflow-visible shrink-0" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Window Body Container */}
        <div className="flex-1 bg-[#1A1A1A] overflow-x-hidden overflow-y-auto relative">
          {children}
        </div>

        {/* Resizing Edge Handles (Floating Mode) */}
        {!isSnappedOrMaximized && (
          <>
            <div
              onMouseDown={(e) => handleMouseDownResize(e, 'e')}
              className="absolute top-0 right-0 w-2 h-full cursor-e-resize hover:bg-ubuntu-orange/30 transition-colors"
            />
            <div
              onMouseDown={(e) => handleMouseDownResize(e, 's')}
              className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize hover:bg-ubuntu-orange/30 transition-colors"
            />
            <div
              onMouseDown={(e) => handleMouseDownResize(e, 'se')}
              className="absolute bottom-0 right-0 w-3.5 h-3.5 cursor-se-resize hover:bg-ubuntu-orange/60 transition-colors z-20"
            />
          </>
        )}
      </div>
    </>
  );
}
