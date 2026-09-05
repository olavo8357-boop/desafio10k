import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb
} from 'lucide-react';

const BANNED_WORDS = [
  'frete gratis', 'frete grátis', 'promocao', 'promoção', 'barato', 'melhor',
  'oferta', 'original', 'liquidacao', 'liquidação', 'pronta entrega', 'novo', 'usado', 'top'
];

export const TitleGenerator: React.FC = () => {
  const [productType, setProductType] = useState('Fone De Ouvido Sem Fio');
  const [brand, setBrand] = useState('AirSound');
  const [model, setModel] = useState('Pro Max');
  const [technicalSpec, setTechnicalSpec] = useState('Bluetooth 5.3 Preto Bateria 30h');
  const [copied, setCopied] = useState(false);

  // Combine full title
  const fullTitle = useMemo(() => {
    return [productType.trim(), brand.trim(), model.trim(), technicalSpec.trim()]
      .filter(Boolean)
      .join(' ');
  }, [productType, brand, model, technicalSpec]);

  const charCount = fullTitle.length;
  const isOverLimit = charCount > 60;
  const isIdeal = charCount >= 40 && charCount <= 60;

  // Check for banned words in the whole title
  const foundBannedWords = useMemo(() => {
    const lower = fullTitle.toLowerCase();
    return BANNED_WORDS.filter((bw) => lower.includes(bw));
  }, [fullTitle]);

  const handleCopy = () => {
    if (!fullTitle) return;
    navigator.clipboard.writeText(fullTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (exProduct: string, exBrand: string, exModel: string, exSpec: string) => {
    setProductType(exProduct);
    setBrand(exBrand);
    setModel(exModel);
    setTechnicalSpec(exSpec);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Algoritmo de Indexação SEO</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          Gerador & Validador de Título SEO para Marketplaces (Máx 60 Chars)
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 mt-1">
          Siga o padrão algorítmico do Desafio 10K para rankear no topo orgânico do Mercado Livre, Amazon e Shopee.
        </p>
      </div>

      {/* Main Tool Card */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Title Output Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300 flex items-center gap-1.5">
              <span>Prévia do Título do Anúncio:</span>
              {isIdeal && (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tamanho Perfeito
                </span>
              )}
              {isOverLimit && (
                <span className="text-rose-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Excede 60 caracteres!
                </span>
              )}
            </span>

            {/* Counter */}
            <div className="font-mono text-xs">
              <span className={`font-bold ${
                isOverLimit 
                  ? 'text-rose-400 text-sm' 
                  : isIdeal 
                  ? 'text-emerald-400' 
                  : 'text-violet-400'
              }`}>
                {charCount}
              </span>
              <span className="text-zinc-400"> / 60 caracteres</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border-2 flex items-center justify-between gap-4 transition-all ${
            isOverLimit 
              ? 'bg-rose-950/20 border-rose-500/50' 
              : isIdeal 
              ? 'bg-[#080910] border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
              : 'bg-[#080910] border-white/10'
          }`}>
            <p className="text-sm sm:text-base font-bold text-white tracking-tight break-words flex-1">
              {fullTitle || <span className="text-zinc-500 italic">Preencha os campos abaixo para gerar o título...</span>}
            </p>

            <button
              onClick={handleCopy}
              disabled={!fullTitle || isOverLimit}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {/* Progress bar for 60 chars */}
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isOverLimit 
                  ? 'bg-rose-500' 
                  : isIdeal 
                  ? 'bg-emerald-400' 
                  : 'bg-violet-500'
              }`}
              style={{ width: `${Math.min(100, (charCount / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Penalty / Banned Words Alert */}
        {foundBannedWords.length > 0 && (
          <div className="bg-rose-500/10 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-300">
                Atenção: Palavras penalizadas pelos algoritmos detectadas!
              </h4>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Você usou: <strong className="text-rose-400">{foundBannedWords.join(', ')}</strong>.
                Os algoritmos penalizam termos genéricos como <em>"Frete Grátis", "Promoção", "Original" ou "Barato"</em> no título. Remova-os para garantir o primeiro lugar nas buscas!
              </p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>1. Produto / Termo Principal</span>
              <span className="text-[10px] text-violet-400">O que é?</span>
            </label>
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              placeholder="Ex: Fone De Ouvido Sem Fio"
              className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>2. Marca do Produto</span>
              <span className="text-[10px] text-violet-400">Fabricante</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ex: Xiaomi, Haylou ou Marca Parceira"
              className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>3. Modelo Específico</span>
              <span className="text-[10px] text-violet-400">Identificação</span>
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Ex: Redmi Airdots 3"
              className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
              <span>4. Especificações Técnicas Chave</span>
              <span className="text-[10px] text-violet-400">Voltagem / Tamanho / Cor</span>
            </label>
            <input
              type="text"
              value={technicalSpec}
              onChange={(e) => setTechnicalSpec(e.target.value)}
              placeholder="Ex: Bluetooth 5.3 Preto Bateria 30h"
              className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </div>

        </div>

        {/* Quick Examples */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-zinc-400 block">
            Exemplos de Alta Conversão para Testar:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadExample('Mochila Impermeável', 'SwissLand', 'Executive Pro', 'Notebook 15.6 USB Preta')}
              className="text-xs bg-[#080910] hover:bg-[#141628] text-zinc-300 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer"
            >
              Mochila Executiva
            </button>
            <button
              onClick={() => loadExample('Luminária De Mesa LED', 'HomeDecor', 'Touch Articulável', '3 Cores Bivolt')}
              className="text-xs bg-[#080910] hover:bg-[#141628] text-zinc-300 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer"
            >
              Luminária LED
            </button>
            <button
              onClick={() => loadExample('Kit 3 Camisetas Masculinas', 'SlimFit', 'Básica Algodão', 'Gola Redonda Lisa')}
              className="text-xs bg-[#080910] hover:bg-[#141628] text-zinc-300 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer"
            >
              Kit 3 Camisetas
            </button>
          </div>
        </div>

      </div>

      {/* Pro Tips Card */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-xl p-5 flex items-start gap-4 shadow-xl">
        <Lightbulb className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 space-y-1">
          <h4 className="font-bold text-white">Regra de Ouro da Primeira Venda:</h4>
          <p className="leading-relaxed">
            Assim que seu anúncio registrar a primeira venda, a plataforma <strong>bloqueia a edição do título</strong> para preservar o histórico algorítmico! Valide o título sempre com esta ferramenta antes de ativar o produto.
          </p>
        </div>
      </div>

    </div>
  );
};
