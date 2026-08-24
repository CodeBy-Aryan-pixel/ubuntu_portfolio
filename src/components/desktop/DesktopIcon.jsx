import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, 
  Terminal, 
  FileText, 
  Cpu, 
  Briefcase, 
  Award, 
  Trash, 
  User,
  Users,
  Camera,
  Scan
} from 'lucide-react';
import { FaCertificate, FaUsers, FaRobot, FaChartLine } from 'react-icons/fa';
import { BsCpu } from 'react-icons/bs';
import { TbActivity } from 'react-icons/tb';

const ICON_COMPONENTS = {
  Folder: Folder,
  Terminal: Terminal,
  FileText: FileText,
  Cpu: Cpu,
  Briefcase: Briefcase,
  Award: Award,
  Trash: Trash,
  User: User,
  Users: Users,
  Camera: Camera,
  Scan: Scan,
  FaCertificate: FaCertificate,
  FaUsers: FaUsers,
  FaRobot: FaRobot,
  BsCpu: BsCpu,
  TbActivity: TbActivity,
  FaChartLine: FaChartLine,
};

import { isMobileDevice } from '../../utils/deviceUtils';

export default function DesktopIcon({ 
  id, 
  name, 
  icon, 
  badge = null, 
  color = 'text-white', 
  bg = 'bg-white/10',
  dragConstraints,
  onOpen, 
  isSelected, 
  onSelect 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const hasDraggedRef = useRef(false);

  const IconComp = ICON_COMPONENTS[icon] || Folder;

  const handlePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    hasDraggedRef.current = false;
  };

  const handleDragStart = () => {
    setIsDragging(true);
    hasDraggedRef.current = true;
  };

  const handleDragEnd = (e, info) => {
    setIsDragging(false);
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (distance > 5) {
      hasDraggedRef.current = true;
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!hasDraggedRef.current) {
      if (isMobileDevice()) {
        onOpen(id);
        return;
      }
      onSelect(id);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!hasDraggedRef.current) {
      onOpen(id);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.05}
      dragMomentum={false}
      onPointerDown={handlePointerDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: isDragging ? 1.04 : 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`relative select-none ${isDragging ? 'z-30 cursor-grabbing opacity-80' : 'z-10 cursor-grab opacity-100'}`}
    >
      <div
        className={`${
          isSelected ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
        } rounded-xl p-2 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center`}
      >
        {/* Icon Graphic */}
        <div className="relative pointer-events-none">
          <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shadow-lg border border-white/15 backdrop-blur-sm`}>
            <IconComp className={`w-6 h-6 ${color}`} />
          </div>

          {badge && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ubuntu-orange border border-[#111] flex items-center justify-center text-[8px] font-bold text-white shadow-md">
              {badge}
            </span>
          )}
        </div>

        {/* Text Label with Enhanced Readability Pill & Shadow */}
        <span className="text-xs text-white text-center mt-2 break-words select-none pointer-events-none drop-shadow-md text-shadow-lg shadow-black bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm inline-block max-w-[88px]">
          {name}
        </span>
      </div>

      {/* Floating Tooltip (Visible when hovered, hidden during active drag) */}
      {isHovered && !isDragging && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-white text-[11px] font-sans whitespace-nowrap shadow-2xl border border-white/15 pointer-events-none z-40 animate-fade-in font-medium">
          Double-click to open
        </div>
      )}
    </motion.div>
  );
}
