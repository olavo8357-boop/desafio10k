import React from 'react';
import { 
  Menu, 
  Search, 
  Award, 
  Layers, 
  PlayCircle, 
  Calculator, 
  Sparkles, 
  Bell, 
  X,
  TrendingUp
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'inicio' | 'aulas' | string;
  onSelectTab: (tab: 'inicio' | 'aulas') => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCertificate: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  completedLessonsCount,
  totalLessonsCount,
  progressPercentage,
  searchQuery,
  onSearchChange,
  onOpenCertificate,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#06070c]/90 backdrop-blur-xl border-b border-white/[0.08] text-zinc-100 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand & Menu */}
          <div className="flex items-center gap-3 select-none">
            {/* Hamburger Button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-zinc-300 hover:text-white bg-[#0e101b] hover:bg-[#151928] border border-white/10 hover:border-violet-500/40 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]"
              title="Abrir Menu de Navegação"
            >
              <Menu className="w-4 h-4 text-zinc-200" />
            </button>

            {/* Vertical Violet Glowing Bar */}
            <div className="w-[3px] h-5 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]" />

            {/* Brand Title */}
            <div 
              onClick={() => onSelectTab('inicio')}
              className="cursor-pointer group flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_rgba(124,58,237,0.5)] border border-violet-400/40">
                N
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-[0.18em] text-white uppercase font-sans group-hover:text-violet-300 transition-colors">
                DESAFIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">10K</span>
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex flex-1 max-w-xs relative mx-4">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar aulas, módulos, checklists..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              className="w-full bg-[#0c0e18] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Tab: Módulos (Exact Dashboard) */}
            <button
              onClick={() => onSelectTab('inicio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'inicio'
                  ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-violet-400/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Módulos</span>
            </button>

            {/* Tab: Player de Aulas */}
            <button
              onClick={() => onSelectTab('aulas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'aulas'
                  ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-violet-400/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Assistir</span> Aulas
            </button>

            {/* Certificate Button */}
            <button
              onClick={onOpenCertificate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                progressPercentage === 100
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400/50 font-bold shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                  : 'bg-[#0e101b] text-zinc-300 hover:text-white border-white/10 hover:border-violet-500/40 hover:bg-[#151928]'
              }`}
              title="Certificado de Conclusão"
            >
              <Award className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden md:inline">Certificado</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
