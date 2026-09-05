import React from 'react';
import { Module } from '../types';
import { VseCardIcon } from './VseCardIcon';
import { Menu, CheckCircle2 } from 'lucide-react';

interface VseModuleCardProps {
  module: Module;
  onClick: () => void;
  isCompleted?: boolean;
  completedCount?: number;
  totalCount?: number;
  isActive?: boolean;
}

export const VseModuleCard: React.FC<VseModuleCardProps> = ({
  module,
  onClick,
  isCompleted = false,
  completedCount = 0,
  totalCount = 0,
  isActive = false,
}) => {
  const formattedModuleNumber = `MÓDULO ${module.number.toString().padStart(2, '0')}`;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        group relative flex flex-col justify-between 
        h-[380px] sm:h-[420px] w-full min-w-[200px] max-w-[240px]
        bg-[#0c0e18] rounded-2xl border transition-all duration-300 cursor-pointer select-none
        p-4 sm:p-5 overflow-hidden
        ${isActive 
          ? 'border-violet-500/60 shadow-[0_0_30px_rgba(124,58,237,0.35)] scale-[1.02] bg-[#101222]' 
          : 'border-white/[0.08] hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] hover:scale-[1.01] hover:bg-[#0f1120]'
        }
      `}
    >
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#8b5cf6 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Top Bar of Card */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Mini hamburger icon */}
        <div className="text-zinc-500 group-hover:text-violet-300 transition-colors">
          <Menu className="w-4 h-4" />
        </div>

        {/* Completed status tag or mini badge */}
        {isCompleted ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-3 h-3" />
            <span>100%</span>
          </span>
        ) : totalCount > 0 && completedCount > 0 ? (
          <span className="text-[10px] font-bold text-violet-300 bg-violet-950/60 border border-violet-500/30 px-2 py-0.5 rounded-full">
            {completedCount}/{totalCount}
          </span>
        ) : null}
      </div>

      {/* Center Icon Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-6">
        <div className={`
          w-28 h-28 sm:w-32 sm:h-32 rounded-2xl 
          bg-[#141628] border transition-all duration-300
          flex items-center justify-center text-white
          ${isActive 
            ? 'border-violet-400/60 shadow-[0_0_20px_rgba(124,58,237,0.3)] text-white bg-[#181a32]' 
            : 'border-white/10 group-hover:border-violet-500/40 group-hover:bg-[#181a32] group-hover:text-white'
          }
        `}>
          <VseCardIcon iconType={module.iconType} className="w-14 h-14 sm:w-16 sm:h-16 text-zinc-100 group-hover:text-violet-200 transition-colors" />
        </div>
      </div>

      {/* Bottom Information */}
      <div className="relative z-10 flex flex-col items-center text-center gap-2 pb-2">
        
        {/* Module Pill Badge */}
        <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-black uppercase tracking-widest text-violet-300 shadow-sm">
          {formattedModuleNumber}
        </span>

        {/* Module Main Title */}
        <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider group-hover:text-violet-200 transition-colors line-clamp-2 px-1 min-h-[36px] flex items-center justify-center">
          {module.shortTitle || module.title}
        </h3>

        {/* Decorative mini corner accent */}
        <div className="w-full flex items-center justify-between opacity-30 text-violet-400 text-[8px] pt-1">
          <span>///</span>
          <div className="w-6 h-[1px] bg-violet-500/40" />
          <span>///</span>
        </div>
      </div>

    </div>
  );
};
