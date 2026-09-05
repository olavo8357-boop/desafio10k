import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Share2,
  Sparkles,
  Clock
} from 'lucide-react';
import { Lesson, Module } from '../types';

interface VideoPlayerProps {
  currentLesson: Lesson;
  currentModule: Module;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentTime: number;
  onTimeUpdate: (seconds: number | ((prev: number) => number)) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentLesson,
  currentModule,
  isCompleted,
  onToggleComplete,
  onSelectPrevious,
  onSelectNext,
  hasPrevious,
  hasNext,
  currentTime,
  onTimeUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const totalSeconds = currentLesson.durationMinutes * 60;

  // Timer interval when playing
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onTimeUpdate((prev: number) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (!isCompleted) {
              onToggleComplete(currentLesson.id);
            }
            return totalSeconds;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalSeconds, isCompleted, currentLesson.id, onTimeUpdate, onToggleComplete]);

  // Reset when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    onTimeUpdate(0);
  }, [currentLesson.id, onTimeUpdate]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onTimeUpdate(val);
  };

  const skipSeconds = (seconds: number) => {
    const next = Math.max(0, Math.min(totalSeconds, currentTime + seconds));
    onTimeUpdate(next);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    }
  };

  const progressPercent = totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;

  return (
    <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Video Screen Container */}
      <div className="relative aspect-video w-full bg-[#05060a] overflow-hidden group select-none">
        
        {/* Background Thumbnail Image */}
        <img
          src={currentLesson.videoThumb}
          alt={currentLesson.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isPlaying ? 'opacity-30 scale-105 filter blur-xs' : 'opacity-65'
          }`}
        />

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070c] via-[#06070c]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070c]/60 via-transparent to-[#06070c]/60" />

        {/* Top Header overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="bg-[#0f111f]/90 backdrop-blur border border-violet-500/30 text-violet-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Módulo {currentModule.number}: {currentModule.shortTitle || currentModule.title}
            </span>
            <span className="hidden sm:inline-flex bg-[#0f111f]/80 backdrop-blur text-zinc-300 text-xs px-2.5 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 mr-1 text-zinc-400" /> {currentLesson.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl backdrop-blur border transition-all ${
                isBookmarked 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400 shadow-[0_0_12px_rgba(124,58,237,0.4)]' 
                  : 'bg-[#0f111f]/80 text-zinc-300 border-white/10 hover:text-white hover:border-violet-500/40'
              }`}
              title="Salvar como favorita"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#0f111f]/80 backdrop-blur text-zinc-300 border border-white/10 hover:text-white hover:border-violet-500/40 transition-colors relative"
              title="Copiar link da aula"
            >
              <Share2 className="w-4 h-4" />
              {copyToast && (
                <span className="absolute -bottom-8 right-0 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link copiado!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Big Center Play / Pause Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          {!isPlaying ? (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.55)] hover:shadow-[0_0_50px_rgba(124,58,237,0.75)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Iniciar reprodução da aula"
              >
                <Play className="w-8 h-8 fill-white ml-1 text-white" />
              </button>
              <div className="max-w-lg mt-2">
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2 drop-shadow">
                  {currentLesson.description}
                </p>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsPlaying(false)}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0f111f]/80 p-5 rounded-full backdrop-blur border border-violet-500/30 shadow-lg">
                <Pause className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Video Player Floating Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-[#06070c] via-[#06070c]/80 to-transparent z-20 flex flex-col gap-2">
          
          {/* Progress Bar (Scrubber) */}
          <div className="relative w-full flex items-center group/scrubber cursor-pointer">
            <input
              type="range"
              min={0}
              max={totalSeconds}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:h-2.5 transition-all"
            />
            {/* Custom filled progress bar */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 rounded-lg pointer-events-none group-hover/scrubber:h-2.5 transition-all shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between text-zinc-300 text-xs pt-1">
            
            {/* Left: Play/Pause, Rewind, FastForward, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-violet-300 transition-colors cursor-pointer"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current text-white" />
                ) : (
                  <Play className="w-5 h-5 fill-current text-white" />
                )}
              </button>

              <button
                onClick={() => skipSeconds(-10)}
                className="p-1 hover:text-violet-300 transition-colors flex items-center gap-0.5 cursor-pointer"
                title="Voltar 10 segundos"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-[10px] hidden sm:inline">10s</span>
              </button>

              <button
                onClick={() => skipSeconds(10)}
                className="p-1 hover:text-violet-300 transition-colors flex items-center gap-0.5 cursor-pointer"
                title="Avançar 10 segundos"
              >
                <RotateCw className="w-4 h-4" />
                <span className="text-[10px] hidden sm:inline">10s</span>
              </button>

              <div className="text-zinc-400 font-mono text-[11px] ml-1">
                <span className="text-white font-medium">{formatTime(currentTime)}</span> / {currentLesson.duration}
              </div>
            </div>

            {/* Right: Audio, Speed, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 hover:text-violet-300 transition-colors cursor-pointer"
                title={isMuted ? 'Desmutar áudio' : 'Mutar áudio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Playback speed selector */}
              <div className="flex items-center bg-[#0e101b] rounded-lg p-0.5 border border-white/10 text-[11px] font-semibold">
                {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      playbackSpeed === spd 
                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold shadow-sm' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const elem = document.documentElement;
                  if (!document.fullscreenElement) {
                    elem.requestFullscreen?.().catch(() => {});
                  } else {
                    document.exitFullscreen?.().catch(() => {});
                  }
                }}
                className="p-1 hover:text-violet-300 transition-colors cursor-pointer"
                title="Tela Cheia"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Video Action Toolbar Below Player */}
      <div className="p-4 sm:p-5 bg-[#0a0b12] border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Complete toggle button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(currentLesson.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] hover:brightness-110'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Aula Concluída</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-white" />
                <span>Concluir Aula</span>
              </>
            )}
          </button>

          <span className="text-xs text-zinc-400 hidden md:inline">
            {isCompleted ? 'Seu progresso foi salvo com sucesso!' : 'Marque para contabilizar seu certificado de conclusão'}
          </span>
        </div>

        {/* Right: Previous & Next Lesson Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={onSelectPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0e101b] text-zinc-300 border border-white/10 hover:border-violet-500/40 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Aula Anterior</span>
          </button>

          <button
            onClick={onSelectNext}
            disabled={!hasNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#141628] text-zinc-100 border border-violet-500/30 hover:border-violet-500/60 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <span>Próxima Aula</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
