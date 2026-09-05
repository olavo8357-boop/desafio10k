import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw
} from 'lucide-react';
import { CATEGORY_FEES } from '../data/courseData';

export const FeeSimulator: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(89.90);
  const [productCost, setProductCost] = useState<number>(32.00);
  const [packagingCost, setPackagingCost] = useState<number>(3.50);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('eletronicos');
  const [listingType, setListingType] = useState<'classico' | 'premium'>('premium');
  const [sellerReputation, setSellerReputation] = useState<'lider' | 'verde' | 'amarela'>('lider');
  const [taxRate, setTaxRate] = useState<number>(4.0);
  const [adsBudgetPercent, setAdsBudgetPercent] = useState<number>(5.0);

  // Get selected category
  const selectedCategory = CATEGORY_FEES.find((c) => c.id === selectedCategoryId) || CATEGORY_FEES[0];

  // Fee calculation logic
  const results = useMemo(() => {
    const isBelow79 = salePrice < 79.0;
    
    // Commission rate
    const commissionPercent = listingType === 'premium' ? selectedCategory.premiumRate : selectedCategory.classicRate;
    const commissionAmount = (salePrice * commissionPercent) / 100;

    // Fixed fee for products under R$ 79.00
    const fixedFeeAmount = isBelow79 ? 6.00 : 0.00;

    // Mandatory Free Shipping for products >= R$ 79.00
    let shippingSubsidy = 0;
    if (!isBelow79) {
      if (sellerReputation === 'lider') {
        shippingSubsidy = 19.50;
      } else if (sellerReputation === 'verde') {
        shippingSubsidy = 22.80;
      } else {
        shippingSubsidy = 32.00;
      }
    }

    // Taxes
    const taxesAmount = (salePrice * taxRate) / 100;

    // Ads cost
    const adsAmount = (salePrice * adsBudgetPercent) / 100;

    // Total deductions
    const totalMlDeduction = commissionAmount + fixedFeeAmount + shippingSubsidy;
    const totalCost = productCost + packagingCost + taxesAmount + adsAmount + totalMlDeduction;

    const netProfit = salePrice - totalCost;
    const netMargin = salePrice > 0 ? (netProfit / salePrice) * 100 : 0;
    const roi = (productCost + packagingCost) > 0 ? (netProfit / (productCost + packagingCost)) * 100 : 0;

    return {
      isBelow79,
      commissionPercent,
      commissionAmount,
      fixedFeeAmount,
      shippingSubsidy,
      taxesAmount,
      adsAmount,
      totalMlDeduction,
      totalCost,
      netProfit,
      netMargin,
      roi,
    };
  }, [salePrice, productCost, packagingCost, selectedCategory, listingType, sellerReputation, taxRate, adsBudgetPercent]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Ferramenta Oficial</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Simulador de Margem & Lucro Sem Estoque
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Calcule a margem exata por venda considerando custo do fornecedor parceiro, taxas de marketplace e envio.
            </p>
          </div>

          <button
            onClick={() => {
              setSalePrice(89.90);
              setProductCost(32.00);
              setPackagingCost(3.50);
              setListingType('premium');
              setSelectedCategoryId('eletronicos');
              setTaxRate(4.0);
              setAdsBudgetPercent(5.0);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#080910] text-zinc-300 hover:text-white rounded-xl text-xs font-semibold border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
            <span>Restaurar Padrões</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-[#0c0e18] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
            <h2 className="text-xs font-bold text-violet-400 uppercase tracking-wider border-b border-white/10 pb-3">
              1. Dados do Produto & Fornecedor
            </h2>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                Categoria de Produto
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
              >
                {CATEGORY_FEES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} (Clássico {cat.classicRate}% / Premium {cat.premiumRate}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Listing Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                <span>Tipo de Exposição do Anúncio</span>
                <span className="text-[11px] text-violet-400 font-normal">Recomendado: Premium</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setListingType('classico')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    listingType === 'classico'
                      ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                      : 'bg-[#080910] border-white/10 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Clássico</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Taxa de {selectedCategory.classicRate}%</p>
                  <p className="text-[10px] text-zinc-500 mt-1">Parcelamento padrão</p>
                </button>

                <button
                  type="button"
                  onClick={() => setListingType('premium')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    listingType === 'premium'
                      ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                      : 'bg-[#080910] border-white/10 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">Premium</p>
                    <span className="text-[9px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black px-1.5 py-0.2 rounded shadow-sm">TOP CONVERSÃO</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Taxa de {selectedCategory.premiumRate}%</p>
                  <p className="text-[10px] text-emerald-400 mt-1 font-medium">Até 12x sem juros (Escala máxima)</p>
                </button>
              </div>
            </div>

            {/* Prices Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Preço de Venda Final (R$)</span>
                  {results.isBelow79 ? (
                    <span className="text-[10px] text-violet-400 font-bold">&lt; R$79 (+R$6 taxa)</span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold">Frete Grátis</span>
                  )}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="1"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                    className="w-full bg-[#080910] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Custo Fornecedor Parceiro (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={productCost}
                    onChange={(e) => setProductCost(Number(e.target.value) || 0)}
                    className="w-full bg-[#080910] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Packaging & Shipping Reputation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Embalagem / Crossdocking
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">R$</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(Number(e.target.value) || 0)}
                    className="w-full bg-[#080910] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  Nível de Conta / Desconto Frete
                </label>
                <select
                  value={sellerReputation}
                  onChange={(e) => setSellerReputation(e.target.value as any)}
                  className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="lider">MercadoLíder / Top Seller (50% desconto)</option>
                  <option value="verde">Reputação Verde (40% desconto)</option>
                  <option value="amarela">Conta Iniciante / Sem termômetro</option>
                </select>
              </div>
            </div>

            {/* Taxes & Ads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Imposto Nota Fiscal (%)</span>
                  <span className="text-[10px] text-zinc-400">MEI: 0% / Simples: 4%</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="30"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                    className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-violet-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Verba para Tráfego / Ads (%)</span>
                  <span className="text-[10px] text-zinc-400">ACOS Alvo</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="50"
                    value={adsBudgetPercent}
                    onChange={(e) => setAdsBudgetPercent(Number(e.target.value) || 0)}
                    className="w-full bg-[#080910] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-violet-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Educational Insights */}
          {results.isBelow79 ? (
            <div className="bg-violet-950/30 border border-violet-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-violet-300">
                  Dica de Otimização: Escape da taxa fixa de R$ 6,00!
                </h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  Como seu produto custa menos de R$ 79,00 (R$ {salePrice.toFixed(2)}), há uma taxa fixa de R$ 6,00. 
                  <strong> Estratégia Recomendada:</strong> crie KITS de 2 ou 3 unidades com o fornecedor para superar R$ 79,00, zerando a taxa fixa e garantindo frete grátis!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-400">
                  Anúncio no Padrão Ouro (Acima de R$ 79,00)
                </h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  Sem taxa fixa de R$ 6,00! Frete grátis ativado com até 50% de desconto institucional, maximizando o índice de conversão no algoritmo.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Financial Results Summary */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-gradient-to-b from-[#0c0e18] to-[#080910] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-5">
            
            <div className="text-center pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider font-extrabold text-zinc-400">
                Seu Lucro Líquido por Venda
              </span>
              <div className={`text-3xl sm:text-4xl font-black mt-2 tracking-tight ${
                results.netProfit > 0 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-rose-400'
              }`}>
                R$ {results.netProfit.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-3 mt-2 text-xs">
                <span className="bg-[#141628] px-2.5 py-1 rounded-full text-zinc-200 font-semibold border border-white/10">
                  Margem: <strong className={results.netMargin >= 18 ? 'text-emerald-400' : 'text-violet-400'}>{results.netMargin.toFixed(1)}%</strong>
                </span>
                <span className="bg-[#141628] px-2.5 py-1 rounded-full text-zinc-200 font-semibold border border-white/10">
                  ROI: <strong className="text-violet-400">{results.roi.toFixed(0)}%</strong>
                </span>
              </div>
            </div>

            {/* Breakdown item list */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>(+) Preço de Venda Bruto:</span>
                <span className="font-bold text-white">R$ {salePrice.toFixed(2)}</span>
              </div>

              <div className="border-t border-white/10 pt-2 space-y-2">
                <div className="flex justify-between text-rose-300">
                  <span>(-) Comissão Marketplace ({results.commissionPercent}%):</span>
                  <span className="font-semibold">- R$ {results.commissionAmount.toFixed(2)}</span>
                </div>

                {results.fixedFeeAmount > 0 && (
                  <div className="flex justify-between text-rose-300">
                    <span>(-) Taxa Fixa (&lt; R$79):</span>
                    <span className="font-semibold">- R$ {results.fixedFeeAmount.toFixed(2)}</span>
                  </div>
                )}

                {results.shippingSubsidy > 0 && (
                  <div className="flex justify-between text-rose-300">
                    <span>(-) Frete Subsidiado:</span>
                    <span className="font-semibold">- R$ {results.shippingSubsidy.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>(-) Fornecedor Parceiro:</span>
                  <span>- R$ {productCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>(-) Embalagens / Operacional:</span>
                  <span>- R$ {packagingCost.toFixed(2)}</span>
                </div>

                {results.taxesAmount > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>(-) Impostos ({taxRate}%):</span>
                    <span>- R$ {results.taxesAmount.toFixed(2)}</span>
                  </div>
                )}

                {results.adsAmount > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>(-) Tráfego / Ads ({adsBudgetPercent}%):</span>
                    <span>- R$ {results.adsAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-white/10 pt-3 flex justify-between font-bold text-sm text-white">
                <span>Total de Custos & Taxas:</span>
                <span className="text-rose-400">- R$ {results.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Projection Widget */}
            <div className="bg-[#080910] border border-white/10 rounded-xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                Projeção (100 Vendas / Mês)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-[#141628] p-2 rounded-lg border border-white/10">
                  <span className="text-[10px] text-zinc-400 block">Faturamento</span>
                  <span className="text-xs font-bold text-white">
                    R$ {(salePrice * 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-[#141628] p-2 rounded-lg border border-white/10">
                  <span className="text-[10px] text-zinc-400 block">Lucro Líquido</span>
                  <span className="text-xs font-bold text-emerald-400">
                    R$ {(results.netProfit * 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
