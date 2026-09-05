import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Filter
} from 'lucide-react';
import { Module, Lesson } from '../types';

interface ModuleSidebarProps {
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson, module: Module) => void;
  completedLessonIds: string[];
  searchQuery: string;
  onCloseMobile?: () => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  currentLessonId,
  onSelectLesson,
  completedLessonIds,
  searchQuery,
  onCloseMobile,
}) => {
  // Store expanded module IDs
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((mod) => {
      const hasCurrent = mod.lessons.some((l) => l.id === currentLessonId);
      initial[mod.id] = hasCurrent || mod.number === 1;
    });
    return initial;
  });

  const [onlyPending, setOnlyPending] = useState(false);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const filteredModules = modules.map((mod) => {
    const lessons = mod.lessons.filter((l) => {
      const matchesSearch = searchQuery === '' || 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const isCompleted = completedLessonIds.includes(l.id);
      const matchesPending = !onlyPending || !isCompleted;

      return matchesSearch && matchesPending;
    });

    return {
      ...mod,
      filteredLessons: lessons,
    };
  });

  return (
    <aside className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl flex flex-col h-full max-h-[850px] shadow-2xl overflow-hidden">
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/[0.08] bg-[#090b12] flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span>Módulos do Curso</span>
          </h2>
          <p className="text-[10px] text-zinc-400 mt-0.5">
            {completedLessonIds.length} aulas concluídas
          </p>
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setOnlyPending(!onlyPending)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
            onlyPending
              ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-violet-400 shadow-sm'
              : 'bg-[#141628] text-zinc-400 border-white/10 hover:text-white hover:border-violet-500/40'
          }`}
          title="Alternar filtro de aulas pendentes"
        >
          <Filter className="w-3 h-3" />
          <span>{onlyPending ? 'Pendentes' : 'Todas'}</span>
        </button>
      </div>

      {/* Modules & Lessons Scrollable Area */}
      <div className="overflow-y-auto flex-1 p-3 space-y-2.5 custom-scrollbar">
        {filteredModules.map((mod) => {
          const isExpanded = expandedModules[mod.id] || searchQuery !== '';
          const totalLessonsInMod = mod.lessons.length;
          const completedInMod = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
          const isModCompleted = totalLessonsInMod > 0 && completedInMod === totalLessonsInMod;

          return (
            <div
              key={mod.id}
              className="rounded-xl border border-white/[0.08] bg-[#090b14] overflow-hidden transition-all"
            >
              {/* Module Accordion Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full text-left p-3 flex items-start justify-between gap-3 hover:bg-[#121526] transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 ${
                    isModCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'bg-[#141628] text-violet-300 group-hover:text-white border border-violet-500/20'
                  }`}>
                    {mod.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-zinc-200 group-hover:text-violet-200 truncate uppercase tracking-wider">
                      {mod.shortTitle || mod.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-zinc-400">
                        {completedInMod}/{totalLessonsInMod} aulas
                      </span>
                      {mod.badge && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 bg-violet-500/10 text-violet-300 rounded font-bold border border-violet-500/30">
                          {mod.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-zinc-400 group-hover:text-violet-300 shrink-0 mt-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Lesson Items inside Module */}
              {isExpanded && (
                <div className="border-t border-white/[0.08] divide-y divide-white/[0.06] bg-[#05060b]">
                  {mod.filteredLessons.length === 0 ? (
                    <div className="p-3 text-[11px] text-zinc-500 text-center italic">
                      Nenhuma aula encontrada neste filtro.
                    </div>
                  ) : (
                    mod.filteredLessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLessonId;
                      const isLessonDone = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson, mod);
                            if (onCloseMobile) onCloseMobile();
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-violet-600/15 border-l-4 border-violet-500 text-white shadow-[inset_0_0_15px_rgba(124,58,237,0.1)]'
                              : 'hover:bg-[#0e101f] text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isLessonDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : isCurrent ? (
                              <PlayCircle className="w-4 h-4 text-violet-400 shrink-0 animate-pulse" />
                            ) : (
                              <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className={`text-xs font-semibold leading-tight line-clamp-2 ${
                                isCurrent ? 'text-white font-bold' : isLessonDone ? 'text-zinc-400' : 'text-zinc-200'
                              }`}>
                                {lesson.title}
                              </p>
                              <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-2.5 h-2.5 text-zinc-400" />
                                {lesson.duration}
                              </span>
                            </div>
                          </div>

                          {isCurrent && (
                            <span className="text-[8px] uppercase font-black bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(124,58,237,0.4)]">
                              Assistindo
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </aside>
  );
};
