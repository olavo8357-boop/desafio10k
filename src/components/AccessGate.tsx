import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AccessGateProps {
  onAccessGranted: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onAccessGranted }) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Por favor, digite o código de acesso.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (code.trim() === '0057') {
        try {
          localStorage.setItem('desafio_access_granted_0057', 'true');
        } catch {
          // Fallback if storage fails
        }
        onAccessGranted();
      } else {
        setError('Código de acesso incorreto. Verifique e tente novamente.');
        setIsSubmitting(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#080910] text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 text-[11px] font-bold text-violet-300 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            <span>Área Restrita</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Desafio 10K
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xs leading-relaxed">
            Digite o código de acesso exclusivo para liberar o acompanhamento completo.
          </p>
        </div>

        {/* Access Form Card */}
        <div className="bg-[#0c0e18]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="accessCodeInput" className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-violet-400" />
                <span>Código de Acesso</span>
              </label>

              <div className="relative">
                <input
                  id="accessCodeInput"
                  ref={inputRef}
                  type="password"
                  inputMode="numeric"
                  maxLength={10}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Digite seu código"
                  className="w-full bg-[#131625] border border-white/10 focus:border-violet-500/80 rounded-xl px-4 py-3.5 text-center text-lg sm:text-xl font-bold tracking-[0.3em] text-white placeholder:text-zinc-600 placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5 mt-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              <span>Entrar no Acompanhamento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/[0.06]">
            <p className="text-[11px] text-zinc-500">
              Precisa de ajuda? Entre em contato com a equipe do Desafio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
