import React from 'react';
import { Sparkles, Play, Award, CheckCircle2 } from 'lucide-react';

interface VseHeroBannerProps {
  onStartLearning?: () => void;
  completedPercentage?: number;
  totalLessons?: number;
  completedLessons?: number;
}

export const VseHeroBanner: React.FC<VseHeroBannerProps> = ({
  onStartLearning,
  completedPercentage = 0,
  totalLessons = 16,
  completedLessons = 1,
}) => {
  return (
    <div className="w-full bg-[#0a0b12] border border-white/[0.08] rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl">
      
      {/* Background Organic Neon Nebula Aurora (Violet + Soft Cyan Mesh) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-violet-600/25 via-indigo-500/20 to-cyan-400/15 rounded-full blur-[90px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-600/15 via-purple-600/20 to-indigo-700/15 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Subtle Dot/Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Corner Accents */}
      <div className="absolute top-4 left-6 w-8 h-[1px] bg-violet-500/30" />
      <div className="absolute top-4 right-6 w-8 h-[1px] bg-violet-500/30" />
      <div className="absolute bottom-4 left-6 w-8 h-[1px] bg-cyan-500/30" />
      <div className="absolute bottom-4 right-6 w-8 h-[1px] bg-cyan-500/30" />

      {/* Main Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Brand & Eyebrow & Headline */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 mb-4 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-violet-300">
              ACOMPANHAMENTO DE VENDAS • 2026
            </span>
          </div>

          {/* Big Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] font-sans">
            Desafio 10k pra fazer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              os primeiros 10k em 14 dias com o Mercado Livre.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mt-3.5 leading-relaxed font-normal">
            Domine as esteiras de fornecedores validados, precificação automatizada no Mercado Livre e estratégias de escala para atingir o faturamento dos sonhos.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mt-6">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.45)] hover:shadow-[0_0_40px_rgba(124,58,237,0.65)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continuar Assistindo →</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0f1a] border border-white/10 rounded-2xl text-xs font-bold text-zinc-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{completedLessons} de {totalLessons} aulas ({completedPercentage}%)</span>
            </div>
          </div>

        </div>

        {/* Right Col: Geometric Visual Emblem & Floating Card */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-[#121422] to-[#0a0b12] border border-violet-500/30 p-6 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.25)] group hover:border-violet-400/50 transition-all duration-300">
            
            {/* Hexagon / Geometric glow behind logo */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-cyan-500/20 blur-lg pointer-events-none" />

            <div className="w-20 h-20 rounded-2xl bg-[#161828] border border-violet-400/40 shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center text-white relative z-10 group-hover:scale-105 transition-transform">
              <svg 
                viewBox="0 0 36 36" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              >
                <path d="M 6 26 L 14 18 L 20 22 L 30 10" />
                <path d="M 22 10 H 30 V 18" />
              </svg>
            </div>

            <span className="text-base sm:text-lg font-black text-white tracking-wider uppercase mt-3 text-center relative z-10">
              DESAFIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">10K</span>
            </span>

            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-violet-300 relative z-10 mt-0.5 text-center">
              MERCADO LIVRE
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
