import React, { useRef } from 'react';
import { Module } from '../types';
import { VseHeroBanner } from './VseHeroBanner';
import { VseModuleCard } from './VseModuleCard';
import { ChevronLeft, ChevronRight, Play, BookOpen, Sparkles } from 'lucide-react';

interface VseModulesViewProps {
  modules: Module[];
  currentModuleId: string;
  onSelectModule: (module: Module) => void;
  completedLessonIds: string[];
  onStartCourse: () => void;
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export const VseModulesView: React.FC<VseModulesViewProps> = ({
  modules,
  currentModuleId,
  onSelectModule,
  completedLessonIds,
  onStartCourse,
  progressPercentage,
  completedLessonsCount,
  totalLessonsCount,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10 pb-16 animate-fade-in">
      
      {/* 1. TOP HERO BANNER (VSE - VENDAS SEM ESTOQUE) */}
      <VseHeroBanner 
        onStartLearning={onStartCourse}
        completedPercentage={progressPercentage}
        totalLessons={totalLessonsCount}
        completedLessons={completedLessonsCount}
      />

      {/* 2. SECTION HEADER: | MÓDULOS DO CURSO */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Violet vertical glowing bar */}
            <div className="w-[3.5px] h-5 sm:h-6 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            
            <h2 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-[0.2em] font-sans">
              MÓDULOS DO CURSO
            </h2>
          </div>

          {/* Quick scroll controls for wide view */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleScrollLeft}
              className="p-1.5 rounded-xl bg-[#0e101b] hover:bg-[#151928] text-zinc-400 hover:text-white border border-white/10 hover:border-violet-500/40 transition-colors shadow-sm cursor-pointer"
              title="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              className="p-1.5 rounded-xl bg-[#0e101b] hover:bg-[#151928] text-zinc-400 hover:text-white border border-white/10 hover:border-violet-500/40 transition-colors shadow-sm cursor-pointer"
              title="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtle horizontal divider line */}
        <div className="w-full h-[1px] bg-white/[0.08]" />
      </div>

      {/* 3. MODULES ROW / GRID */}
      <div 
        ref={scrollContainerRef}
        className="w-full flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {modules.map((mod) => {
          const modCompletedLessons = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
          const isModCompleted = mod.lessons.length > 0 && modCompletedLessons === mod.lessons.length;
          const isActive = mod.id === currentModuleId;

          return (
            <div key={mod.id} className="shrink-0" style={{ scrollSnapAlign: 'start' }}>
              <VseModuleCard
                module={mod}
                onClick={() => onSelectModule(mod)}
                isCompleted={isModCompleted}
                completedCount={modCompletedLessons}
                totalCount={mod.lessons.length}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="w-full flex items-center justify-end text-xs text-zinc-500 pt-4 border-t border-white/[0.08]">
        {/* Powered by pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13161f] border border-white/10 text-[11px] text-zinc-400">
          <span>Área de Membros Oficial <strong>Desafio 10K</strong></span>
        </div>
      </div>

    </div>
  );
};
