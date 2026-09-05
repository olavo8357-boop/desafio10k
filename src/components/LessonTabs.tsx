import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckSquare, 
  MessageSquare, 
  StickyNote, 
  Plus, 
  Trash2, 
  Clock, 
  ThumbsUp, 
  Send, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  FileArchive
} from 'lucide-react';
import { Lesson, StudentNote, StudentDoubt } from '../types';

interface LessonTabsProps {
  currentLesson: Lesson;
  notes: StudentNote[];
  onAddNote: (content: string, timestampSec: number) => void;
  onDeleteNote: (noteId: string) => void;
  onSeekToTime: (seconds: number) => void;
  currentTime: number;
  doubts: StudentDoubt[];
  onAddDoubt: (question: string) => void;
  onLikeDoubt: (doubtId: string) => void;
  checklistState: Record<string, boolean>;
  onToggleChecklistItem: (itemId: string) => void;
}

export const LessonTabs: React.FC<LessonTabsProps> = ({
  currentLesson,
  notes,
  onAddNote,
  onDeleteNote,
  onSeekToTime,
  currentTime,
  doubts,
  onAddDoubt,
  onLikeDoubt,
  checklistState,
  onToggleChecklistItem,
}) => {
  const [activeTab, setActiveTab] = useState<'conteudo' | 'materiais' | 'anotacoes' | 'duvidas'>('conteudo');
  const [newNoteText, setNewNoteText] = useState('');
  const [newDoubtText, setNewDoubtText] = useState('');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim(), Math.floor(currentTime));
    setNewNoteText('');
  };

  const handleCreateDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubtText.trim()) return;
    onAddDoubt(newDoubtText.trim());
    setNewDoubtText('');
  };

  const handleDownload = (resTitle: string) => {
    const element = document.createElement("a");
    const file = new Blob([
      `=== MATERIAL DO CURSO DESAFIO 10K — VENDAS SEM ESTOQUE ===\n\n` +
      `Arquivo: ${resTitle}\n` +
      `Aula: ${currentLesson.title}\n` +
      `Instrutor: ${currentLesson.instructor.name}\n` +
      `Data de Download: ${new Date().toLocaleDateString('pt-BR')}\n\n` +
      `Conteúdo exclusivo para alunos do DESAFIO 10K.\n` +
      `Diretrizes, algoritmos e fornecedores para escala sem estoque.\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = resTitle;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccessToast(resTitle);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const lessonNotes = notes.filter((n) => n.lessonId === currentLesson.id);
  const lessonDoubts = doubts.filter((d) => d.lessonId === currentLesson.id);

  return (
    <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl mt-6">
      
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold py-2.5 px-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Download iniciado com sucesso: {downloadSuccessToast}</span>
          </div>
          <button onClick={() => setDownloadSuccessToast(null)} className="font-mono text-sm font-bold cursor-pointer">×</button>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex items-center border-b border-white/[0.08] px-4 pt-3 overflow-x-auto no-scrollbar gap-2 sm:gap-4 bg-[#090b12]">
        
        <button
          onClick={() => setActiveTab('conteudo')}
          className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'conteudo'
              ? 'border-violet-500 text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileText className="w-4 h-4 text-violet-400" />
          <span>Visão Geral & Tarefas</span>
        </button>

        <button
          onClick={() => setActiveTab('materiais')}
          className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'materiais'
              ? 'border-violet-500 text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Materiais de Apoio</span>
          <span className="bg-[#141628] text-violet-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-violet-500/20">
            {currentLesson.resources.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('anotacoes')}
          className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'anotacoes'
              ? 'border-violet-500 text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <StickyNote className="w-4 h-4 text-amber-400" />
          <span>Minhas Anotações</span>
          <span className="bg-[#141628] text-violet-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-violet-500/20">
            {lessonNotes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('duvidas')}
          className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'duvidas'
              ? 'border-violet-500 text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>Dúvidas da Aula</span>
          <span className="bg-[#141628] text-violet-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-violet-500/20">
            {lessonDoubts.length}
          </span>
        </button>

      </div>

      {/* Tab Content Body */}
      <div className="p-5 sm:p-6 text-zinc-200 bg-[#0c0e18]">

        {/* TAB 1: CONTEUDO */}
        {activeTab === 'conteudo' && (
          <div className="space-y-6">
            
            {/* Header with Title & Instructor Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {currentLesson.title}
                </h2>
                <p className="text-zinc-300 text-sm mt-1 leading-relaxed max-w-3xl">
                  {currentLesson.description}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-[#0e101b] border border-violet-500/20 p-2.5 rounded-xl shrink-0 shadow-sm">
                <img
                  src={currentLesson.instructor.avatar}
                  alt={currentLesson.instructor.name}
                  className="w-10 h-10 rounded-lg object-cover border border-violet-400/30"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">{currentLesson.instructor.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400">{currentLesson.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-violet-300 mb-3 flex items-center gap-2">
                <span>O que você domina nesta aula</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentLesson.takeaways.map((point, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-[#0e101b] border border-white/10 flex items-start gap-3 hover:border-violet-500/30 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-violet-500/30">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Checklist */}
            <div className="bg-[#080910] border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-violet-400" />
                  <h3 className="text-sm font-bold text-white">
                    Checklist de Aplicação Prática
                  </h3>
                </div>
                <span className="text-xs text-zinc-400 font-medium">
                  Marque conforme aplicar na sua operação
                </span>
              </div>

              <div className="space-y-2.5">
                {currentLesson.checklist.map((item) => {
                  const isChecked = !!checklistState[item.id];
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-200' 
                          : 'bg-[#0e101b] border-white/10 hover:bg-[#151928] hover:border-violet-500/30 text-zinc-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleChecklistItem(item.id)}
                        className="w-4 h-4 rounded text-violet-600 accent-violet-600 bg-zinc-900 border-white/20 focus:ring-0 cursor-pointer"
                      />
                      <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-zinc-500' : ''}`}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MATERIAIS */}
        {activeTab === 'materiais' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Materiais Complementares para Download</h3>
              <p className="text-xs text-zinc-400">Planilhas, apostilas, scripts e guias desenvolvidos especificamente para esta aula do Desafio 10K.</p>
            </div>

            {currentLesson.resources.length === 0 ? (
              <div className="text-center py-10 text-zinc-400 text-xs">
                Esta aula não possui arquivos para download adicionais. O conteúdo prático está todo no vídeo.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentLesson.resources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl bg-[#0e101b] border border-white/10 flex flex-col justify-between gap-3 hover:border-violet-500/40 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-[#141628] border border-white/10 text-zinc-300 group-hover:scale-105 transition-transform shrink-0">
                        {res.type === 'sheet' && <FileSpreadsheet className="w-6 h-6 text-emerald-400" />}
                        {res.type === 'pdf' && <FileText className="w-6 h-6 text-rose-400" />}
                        {res.type === 'zip' && <FileArchive className="w-6 h-6 text-violet-400" />}
                        {res.type === 'link' && <ExternalLink className="w-6 h-6 text-cyan-400" />}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-violet-200 transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {res.description}
                        </p>
                        <span className="inline-block mt-2 text-[10px] font-mono text-violet-300 bg-[#080910] px-2 py-0.5 rounded border border-white/10">
                          {res.size}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(res.title)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] hover:brightness-110 rounded-xl text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.35)] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Arquivo Oficial</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANOTAÇÕES */}
        {activeTab === 'anotacoes' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Caderno de Anotações Pessoal</h3>
              <p className="text-xs text-zinc-400">
                Suas notas são salvas automaticamente vinculadas ao minuto exato do vídeo para revisão posterior.
              </p>
            </div>

            {/* Note Creator Form */}
            <form onSubmit={handleCreateNote} className="bg-[#080910] p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  Tempo atual do vídeo: <strong className="text-white">{formatSeconds(currentTime)}</strong>
                </span>
                <span className="text-[11px] text-zinc-400">
                  Pressione Salvar para gravar
                </span>
              </div>
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder={`Ex: No minuto ${formatSeconds(currentTime)}, o Diego explicou o método do fornecedor algoritmo...`}
                rows={2}
                className="w-full bg-[#0e101b] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white font-bold text-xs hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(124,58,237,0.35)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Salvar Anotação ({formatSeconds(currentTime)})</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-2.5">
              {lessonNotes.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  Você ainda não fez anotações nesta aula. Use o campo acima para salvar insights importantes!
                </div>
              ) : (
                lessonNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-xl bg-[#0e101b] border border-white/10 flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSeekToTime(note.timestampSec)}
                          className="flex items-center gap-1 text-[11px] font-mono font-bold bg-[#141628] text-violet-300 hover:bg-violet-600 hover:text-white px-2 py-0.5 rounded-lg border border-violet-500/20 transition-colors cursor-pointer"
                          title="Ir para este ponto do vídeo"
                        >
                          <Clock className="w-3 h-3" />
                          {note.timestampFormatted}
                        </button>
                        <span className="text-[10px] text-zinc-400">{note.createdAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>

                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-zinc-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Excluir nota"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DUVIDAS */}
        {activeTab === 'duvidas' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Dúvidas & Comunidade da Aula</h3>
              <p className="text-xs text-zinc-400">
                Tem alguma pergunta sobre o conteúdo? O instrutor Diego Mendes e os colegas respondem rapidamente aqui.
              </p>
            </div>

            {/* Post Doubt Form */}
            <form onSubmit={handleCreateDoubt} className="bg-[#080910] p-4 rounded-xl border border-white/10 space-y-3">
              <label className="text-xs font-semibold text-zinc-300 block">
                Enviar nova pergunta para o instrutor:
              </label>
              <textarea
                value={newDoubtText}
                onChange={(e) => setNewDoubtText(e.target.value)}
                placeholder="Descreva sua dúvida sobre o módulo de vendas sem estoque..."
                rows={3}
                className="w-full bg-[#0e101b] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newDoubtText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white font-bold text-xs hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(124,58,237,0.35)] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Dúvida</span>
                </button>
              </div>
            </form>

            {/* Doubts List */}
            <div className="space-y-4">
              {lessonDoubts.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  Ainda não há dúvidas publicadas nesta aula. Seja o primeiro a perguntar!
                </div>
              ) : (
                lessonDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-4 rounded-xl bg-[#0e101b] border border-white/10 space-y-3"
                  >
                    {/* Doubt Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={doubt.userAvatar}
                          alt={doubt.userName}
                          className="w-7 h-7 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{doubt.userName}</p>
                          <p className="text-[10px] text-zinc-400">{doubt.createdAt}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onLikeDoubt(doubt.id)}
                        className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors bg-[#141628] hover:border-violet-500/40 px-2 py-1 rounded-lg border border-white/10 cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{doubt.likes}</span>
                      </button>
                    </div>

                    {/* Question text */}
                    <p className="text-xs sm:text-sm text-zinc-200 font-medium pl-2 border-l-2 border-violet-500">
                      {doubt.question}
                    </p>

                    {/* Replies / Instructor Answers */}
                    {doubt.replies && doubt.replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l border-white/10 space-y-3 pt-2">
                        {doubt.replies.map((reply) => (
                          <div key={reply.id} className="bg-[#080910] p-3 rounded-xl border border-white/10 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={reply.userAvatar}
                                  alt={reply.userName}
                                  className="w-6 h-6 rounded-full object-cover border border-white/15"
                                />
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white">{reply.userName}</span>
                                  {reply.isInstructor && (
                                    <span className="text-[9px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold px-1.5 py-0.2 rounded uppercase shadow-[0_0_8px_rgba(124,58,237,0.4)]">
                                      Instrutor
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-[10px] text-zinc-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed pl-8">
                              {reply.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
