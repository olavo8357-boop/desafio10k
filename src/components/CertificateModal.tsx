import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  Share2, 
  X, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { COURSE_TITLE, INSTRUCTOR_NAME, INSTRUCTOR_TITLE } from '../data/courseData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  completedLessonsCount,
  totalLessonsCount,
  progressPercentage,
}) => {
  const [studentName, setStudentName] = useState('João Olavo Barbosa');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const isCompleted = progressPercentage === 100;
  const issueDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const certId = `DES-10K-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0c0e18] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#080910]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Certificado Oficial Desafio 10K
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Notice if not 100% */}
        {!isCompleted && (
          <div className="bg-[#141628] border-b border-violet-500/20 px-6 py-3 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-violet-400" />
              <span>
                <strong>Modo de Prévia:</strong> Você completou {completedLessonsCount} de {totalLessonsCount} aulas ({progressPercentage}%). Conclua todas as aulas do curso para validar este certificado permanentemente.
              </span>
            </div>
          </div>
        )}

        {/* Certificate Canvas Render Area */}
        <div className="p-6 sm:p-10 flex flex-col items-center">
          
          <div 
            id="certificate-print-area"
            className="w-full bg-gradient-to-b from-[#06070c] via-[#0e101f] to-[#06070c] border-2 border-violet-500/30 rounded-2xl p-8 sm:p-12 relative shadow-[0_0_50px_rgba(124,58,237,0.2)] text-center overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-violet-400/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-violet-400/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-violet-400/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-400/50" />

            {/* Certificate Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="px-3 py-1.5 rounded-2xl bg-[#141628] border-2 border-violet-400/40 text-white font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                10K
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-violet-300 font-extrabold">
                DESAFIO 10K — VENDAS SEM ESTOQUE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                CERTIFICADO DE ESPECIALISTA
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg">
                Certificamos para os devidos fins que o aluno concluiu com êxito todos os módulos teóricos e práticos do programa:
              </p>
            </div>

            {/* Student Name */}
            <div className="my-6">
              {isEditingName ? (
                <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="bg-[#141628] border border-violet-400/50 rounded-lg px-3 py-1 text-center font-bold text-lg text-white"
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-3 py-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="inline-block group cursor-pointer" onClick={() => setIsEditingName(true)}>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide border-b-2 border-violet-500/40 pb-1 group-hover:text-violet-200 transition-colors">
                    {studentName}
                  </h3>
                  <span className="text-[10px] text-zinc-500 group-hover:text-violet-300">
                    (Clique para editar seu nome)
                  </span>
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="space-y-2 max-w-2xl mx-auto text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                Por ter completado com louvor o treinamento prático e estratégico em 
                <strong className="text-white"> Vendas Sem Estoque, Integração com Fornecedores, Ferramentas de Drop, Algoritmos de Marketplaces e Escala de Faturamento</strong>, 
                com carga horária total de <strong>48 horas</strong> de imersão aplicada.
              </p>
            </div>

            {/* Footer with Signatures & Hash */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
              
              <div className="space-y-1 text-left">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                  Data de Conclusão
                </span>
                <p className="text-xs font-semibold text-zinc-200">{issueDate}</p>
              </div>

              <div className="space-y-1">
                <div className="border-b border-violet-500/30 pb-1 inline-block px-8">
                  <span className="font-serif italic text-base text-violet-200">
                    {INSTRUCTOR_NAME}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-white">{INSTRUCTOR_NAME}</p>
                <p className="text-[9px] text-zinc-400">{INSTRUCTOR_TITLE}</p>
              </div>

              <div className="space-y-1 text-right sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                  Código de Autenticidade
                </span>
                <p className="font-mono text-xs font-bold text-violet-300">{certId}</p>
                <p className="text-[9px] text-emerald-400 flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3 h-3" /> Registro Válido
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-white/[0.08] bg-[#080910] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            Dica: Você pode anexar este certificado ao seu perfil profissional e LinkedIn.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#0e101b] hover:bg-[#151928] text-zinc-200 rounded-xl text-xs font-bold border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-violet-400" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              onClick={() => {
                alert('Certificado copiado! Você pode compartilhar o link direto nas suas redes sociais.');
              }}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:brightness-110 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
