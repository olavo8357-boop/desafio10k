import React from 'react';
import { 
  Bell, 
  Video, 
  Calendar, 
  Send, 
  Flame, 
  ExternalLink, 
  MessageCircle,
  Users
} from 'lucide-react';
import { Announcement } from '../types';

interface CommunityBoardProps {
  announcements: Announcement[];
}

export const CommunityBoard: React.FC<CommunityBoardProps> = ({ announcements }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
          <Bell className="w-4 h-4" />
          <span>Comunidade Oficial do Desafio</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          Mural de Avisos, Mentorias Ao Vivo & Rede de Alunos
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 mt-1">
          Fique por dentro das atualizações de integrações, novos fornecedores homologados e mentorias semanais.
        </p>
      </div>

      {/* Hero Live Mentorship Banner */}
      <div className="relative bg-gradient-to-r from-violet-950/40 via-[#0c0e18] to-indigo-950/40 border border-violet-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(124,58,237,0.15)] overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Próxima Mentoria
              </span>
              <span className="text-xs text-violet-300 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Terça-feira, às 20:00 (Brasília)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white">
              Mentoria Coletiva: Análise de Anúncios, Ferramentas e Escala no Mercado Livre
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Traga seus links e dúvidas sobre catálogo para análise ao vivo com Diego Mendes. Vamos debugar rotas de entrega e sincronização de estoque.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="#zoom-link"
              onClick={(e) => {
                e.preventDefault();
                alert('O link da sala no Zoom foi copiado para sua área de transferência e estará liberado 15 minutos antes do início.');
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105 cursor-pointer"
            >
              <Video className="w-4 h-4 fill-white" />
              <span>Entrar na Sala Ao Vivo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Community Links & Hot Niches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Telegram VIP Channel Card */}
        <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Send className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white">Grupo VIP de Networking (Telegram)</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Conecte-se com mais de mil alunos do Desafio 10K. Compartilhe estratégias de crossdocking, listas de fornecedores e novas ferramentas.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Users className="w-4 h-4 text-zinc-400" />
              <span>1.850+ membros ativos</span>
            </div>
            <button
              onClick={() => alert('Você será direcionado para o grupo VIP oficial do Desafio 10K no Telegram.')}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Acessar Telegram VIP</span>
            </button>
          </div>
        </div>

        {/* Hot Niches of the Month */}
        <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-violet-400">
              <Flame className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white">Nichos & Produtos em Alta Sem Estoque</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Termos com maior pico de procura e fornecedores com estoque disponível no Brasil:
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between bg-[#080910] p-2 rounded-lg border border-white/10">
                <span className="text-zinc-200">1. Mini Compressor Portátil Recarregável</span>
                <span className="font-bold text-emerald-400">+64% buscas</span>
              </div>
              <div className="flex justify-between bg-[#080910] p-2 rounded-lg border border-white/10">
                <span className="text-zinc-200">2. Escova Secadora Rotativa Iônica</span>
                <span className="font-bold text-emerald-400">+48% buscas</span>
              </div>
              <div className="flex justify-between bg-[#080910] p-2 rounded-lg border border-white/10">
                <span className="text-zinc-200">3. Fone Bluetooth Esportivo à Prova D'água</span>
                <span className="font-bold text-emerald-400">+39% buscas</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Announcements List */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Comunicados & Atualizações Oficiais</span>
        </h3>

        <div className="divide-y divide-white/10 space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    item.category === 'Live' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    item.category === 'Atualização' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white hover:text-violet-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <span className="text-[11px] text-zinc-400">{item.date}</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.content}
              </p>

              {item.actionText && (
                <button
                  onClick={() => alert(`Ação: ${item.actionText}`)}
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
