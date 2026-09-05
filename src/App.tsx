/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { VideoPlayer } from './components/VideoPlayer';
import { LessonTabs } from './components/LessonTabs';
import { ModuleSidebar } from './components/ModuleSidebar';
import { FeeSimulator } from './components/FeeSimulator';
import { TitleGenerator } from './components/TitleGenerator';
import { CommunityBoard } from './components/CommunityBoard';
import { CertificateModal } from './components/CertificateModal';
import { VseModulesView } from './components/VseModulesView';
import { AccessGate } from './components/AccessGate';
import { 
  COURSE_MODULES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_DOUBTS,
  COURSE_TITLE,
  INSTRUCTOR_NAME,
  INSTRUCTOR_TITLE
} from './data/courseData';
import { Lesson, Module, StudentNote, StudentDoubt, Announcement } from './types';
import { X, BookOpen, Layers, ArrowLeft } from 'lucide-react';

export default function App() {
  // Access Control State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('desafio_access_granted_0057') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation tabs: 'inicio' | 'aulas' | 'simulador' | 'seo' | 'mural' | 'certificado'
  const [currentTab, setCurrentTab] = useState<'inicio' | 'aulas' | 'simulador' | 'seo' | 'mural' | 'certificado'>('inicio');

  // Active Lesson & Module
  const [currentModule, setCurrentModule] = useState<Module>(COURSE_MODULES[0]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>(COURSE_MODULES[0].lessons[0]);

  // Video time tracker (in seconds)
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Certificate Modal state
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Persistent Completed Lessons
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vse_completed_lessons');
      return saved ? JSON.parse(saved) : ['les-1-1']; // first lesson completed by default
    } catch {
      return ['les-1-1'];
    }
  });

  // Persistent Student Notes
  const [notes, setNotes] = useState<StudentNote[]>(() => {
    try {
      const saved = localStorage.getItem('vse_student_notes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'note-default-1',
          lessonId: 'les-1-1',
          timestampSec: 180,
          timestampFormatted: '03:00',
          content: 'Fase de Ativação: O foco inicial não é margem de lucro alta, mas sim velocidade de expedição com o fornecedor e volume de vendas para atingir o termômetro verde.',
          createdAt: 'Ontem às 16:30',
        },
      ];
    } catch {
      return [];
    }
  });

  // Persistent Doubts
  const [doubts, setDoubts] = useState<StudentDoubt[]>(() => {
    try {
      const saved = localStorage.getItem('vse_student_doubts');
      return saved ? JSON.parse(saved) : INITIAL_DOUBTS;
    } catch {
      return INITIAL_DOUBTS;
    }
  });

  // Persistent Checklist
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('vse_checklist_state');
      return saved ? JSON.parse(saved) : { 'chk-1-1-1': true };
    } catch {
      return {};
    }
  });

  // Announcements
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('vse_completed_lessons', JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('vse_student_notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('vse_student_doubts', JSON.stringify(doubts));
    } catch (e) {
      console.error(e);
    }
  }, [doubts]);

  useEffect(() => {
    try {
      localStorage.setItem('vse_checklist_state', JSON.stringify(checklistState));
    } catch (e) {
      console.error(e);
    }
  }, [checklistState]);

  // Flattened lesson list for sequential navigation
  const allLessons = useMemo(() => {
    const list: { lesson: Lesson; module: Module }[] = [];
    COURSE_MODULES.forEach((mod) => {
      mod.lessons.forEach((les) => {
        list.push({ lesson: les, module: mod });
      });
    });
    return list;
  }, []);

  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = completedLessonIds.length;
  const progressPercentage = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === currentLesson.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const handleSelectPrevious = () => {
    if (hasPrevious) {
      const prev = allLessons[currentIndex - 1];
      setCurrentLesson(prev.lesson);
      setCurrentModule(prev.module);
      setCurrentTime(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectNext = () => {
    if (hasNext) {
      const next = allLessons[currentIndex + 1];
      setCurrentLesson(next.lesson);
      setCurrentModule(next.module);
      setCurrentTime(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const handleAddNote = (content: string, timestampSec: number) => {
    const m = Math.floor(timestampSec / 60);
    const s = Math.floor(timestampSec % 60);
    const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    const newNote: StudentNote = {
      id: `note-${Date.now()}`,
      lessonId: currentLesson.id,
      timestampSec,
      timestampFormatted: formatted,
      content,
      createdAt: 'Agora mesmo',
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleAddDoubt = (question: string) => {
    const newDoubt: StudentDoubt = {
      id: `doubt-${Date.now()}`,
      lessonId: currentLesson.id,
      userName: 'João Olavo Barbosa',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      isInstructor: false,
      question,
      createdAt: 'Agora mesmo',
      likes: 0,
      replies: [],
    };
    setDoubts((prev) => [newDoubt, ...prev]);
  };

  const handleLikeDoubt = (doubtId: string) => {
    setDoubts((prev) =>
      prev.map((d) => (d.id === doubtId ? { ...d, likes: d.likes + 1 } : d))
    );
  };

  const handleToggleChecklistItem = (itemId: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSelectLesson = (lesson: Lesson, mod: Module) => {
    setCurrentLesson(lesson);
    setCurrentModule(mod);
    setCurrentTime(0);
    setCurrentTab('aulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModuleFromDashboard = (mod: Module) => {
    setCurrentModule(mod);
    if (mod.lessons.length > 0) {
      // Pick first uncompleted lesson or first lesson
      const uncompleted = mod.lessons.find((l) => !completedLessonIds.includes(l.id));
      setCurrentLesson(uncompleted || mod.lessons[0]);
    }
    setCurrentTime(0);
    setCurrentTab('aulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return <AccessGate onAccessGranted={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-zinc-950">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'certificado') {
            setIsCertificateModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        completedLessonsCount={completedLessonsCount}
        totalLessonsCount={totalLessonsCount}
        progressPercentage={progressPercentage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 0: INÍCIO (VSE Dashboard matching the screenshot: Hero Banner + Modules Carousel) */}
        {currentTab === 'inicio' && (
          <VseModulesView
            modules={COURSE_MODULES}
            currentModuleId={currentModule.id}
            onSelectModule={handleSelectModuleFromDashboard}
            completedLessonIds={completedLessonIds}
            onStartCourse={() => {
              setCurrentTab('aulas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            progressPercentage={progressPercentage}
            completedLessonsCount={completedLessonsCount}
            totalLessonsCount={totalLessonsCount}
          />
        )}

        {/* TAB 1: AULAS & PLAYER (Primary Video Player View) */}
        {currentTab === 'aulas' && (
          <div>
            
            {/* Top Return to Dashboard and Mobile toggles */}
            <div className="mb-4 flex items-center justify-between bg-[#11131a] border border-white/[0.08] p-3 rounded-2xl shadow-lg">
              <button
                onClick={() => setCurrentTab('inicio')}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-300" />
                <span>Voltar para Todos os Módulos</span>
              </button>

              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white text-zinc-950 rounded-xl text-xs font-bold shadow-md"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Lista de Aulas</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left/Main Column: Video Player + Interactive Lesson Tabs (8 cols) */}
              <div className="lg:col-span-8 flex flex-col">
                <VideoPlayer
                  currentLesson={currentLesson}
                  currentModule={currentModule}
                  isCompleted={completedLessonIds.includes(currentLesson.id)}
                  onToggleComplete={handleToggleComplete}
                  onSelectPrevious={handleSelectPrevious}
                  onSelectNext={handleSelectNext}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  currentTime={currentTime}
                  onTimeUpdate={setCurrentTime}
                />

                <LessonTabs
                  currentLesson={currentLesson}
                  notes={notes}
                  onAddNote={handleAddNote}
                  onDeleteNote={handleDeleteNote}
                  onSeekToTime={(sec) => setCurrentTime(sec)}
                  currentTime={currentTime}
                  doubts={doubts}
                  onAddDoubt={handleAddDoubt}
                  onLikeDoubt={handleLikeDoubt}
                  checklistState={checklistState}
                  onToggleChecklistItem={handleToggleChecklistItem}
                />
              </div>

              {/* Right Column: Curriculum Accordion Sidebar (4 cols - Sticky on desktop) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-28">
                <ModuleSidebar
                  modules={COURSE_MODULES}
                  currentLessonId={currentLesson.id}
                  onSelectLesson={handleSelectLesson}
                  completedLessonIds={completedLessonIds}
                  searchQuery={searchQuery}
                />
              </div>

            </div>

            {/* Mobile Drawer for Curriculum Sidebar */}
            {isMobileSidebarOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-md">
                <div className="w-5/6 max-w-sm bg-[#11131a] h-full p-4 flex flex-col shadow-2xl overflow-y-auto border-r border-white/10">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-zinc-300" />
                      Módulos do Curso
                    </h3>
                    <button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1.5 text-zinc-400 hover:text-white rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <ModuleSidebar
                    modules={COURSE_MODULES}
                    currentLessonId={currentLesson.id}
                    onSelectLesson={handleSelectLesson}
                    completedLessonIds={completedLessonIds}
                    searchQuery={searchQuery}
                    onCloseMobile={() => setIsMobileSidebarOpen(false)}
                  />
                </div>
                <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
              </div>
            )}

          </div>
        )}

      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        completedLessonsCount={completedLessonsCount}
        totalLessonsCount={totalLessonsCount}
        progressPercentage={progressPercentage}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-white/[0.08] bg-[#090a0f] py-8 px-4 text-zinc-500 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#181c28] border border-white/20 text-white font-black text-[10px] flex items-center justify-center">
              10K
            </span>
            <span className="font-bold text-zinc-300">{COURSE_TITLE}</span>
            <span>— Acompanhamento por {INSTRUCTOR_NAME}</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Suporte aos Alunos: suporte@desafio10k.com.br</span>
            <span>•</span>
            <span>Segurança SSL &amp; Acesso Vitalício</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
