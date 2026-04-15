import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AreaChart from '@/components/AreaChart';
import { calculateInvestment, formatCurrency, convertAnnualToMonthlyRate } from '@/utils/investmentCalculations';
import { useAnalytics } from '@/hooks/useAnalytics';

const InvestmentSection = () => {
  const { trackCalculatorInteraction } = useAnalytics();
  const [aporteInicial, setAporteInicial] = useState('10.000,00');
  const [aporteMensal, setAporteMensal] = useState('1.000,00');
  const [tempoValue, setTempoValue] = useState('20');
  const [tempoUnit, setTempoUnit] = useState('anos');
  const [taxaValue, setTaxaValue] = useState('12,00');
  const [taxaUnit, setTaxaUnit] = useState('ano');
  const [results, setResults] = useState(null);
  const [effectiveMonthlyRate, setEffectiveMonthlyRate] = useState(0);

  const parseCurrency = (val) => parseFloat(val.replace(/\./g, '').replace(',', '.')) || 0;
  const parseNumber = (val) => parseFloat(val.replace(',', '.')) || 0;

  const handleCurrencyChange = (setter, fieldName) => (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value === '') { setter('0,00'); return; }
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    setter(value);
    
    // We could debounce this track, but for now simple event on change
    // Since currency change fires frequently, maybe only track major interactions?
    // For this demo, I will skip tracking every keystroke to avoid spamming analytics
  };

  const handleNumberChange = (setter, fieldName) => (e) => { 
    setter(e.target.value); 
  };

  const handleUnitChange = (setter, value, fieldName) => {
    setter(value);
    trackCalculatorInteraction('Calculadora Investimento', `Mudou ${fieldName} para ${value}`);
  }

  useEffect(() => {
    const inicial = parseCurrency(aporteInicial);
    const mensal = parseCurrency(aporteMensal);
    const tempo = parseNumber(tempoValue);
    const taxa = parseNumber(taxaValue);
    let meses = tempoUnit === 'anos' ? tempo * 12 : tempo;
    let taxaMensalDecimal = taxaUnit === 'ano' ? convertAnnualToMonthlyRate(taxa) : taxa / 100;
    setEffectiveMonthlyRate(taxaMensalDecimal * 100);
    const calcResults = calculateInvestment(inicial, mensal, meses, taxaMensalDecimal);
    setResults(calcResults);
  }, [aporteInicial, aporteMensal, tempoValue, tempoUnit, taxaValue, taxaUnit]);

  return (
    <section className="py-20 bg-bgDark">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-[22px] md:text-[36px] lg:text-[44px] font-extrabold text-textPrimary mb-4 uppercase tracking-tight whitespace-normal">
            Calculadora de Investimento
          </h2>
          <p className="text-[18px] font-medium text-textSecondary">
            Projete o crescimento do seu patrimônio ao longo do tempo
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {/* Inputs */}
          {[
            { label: 'Aporte Inicial', value: aporteInicial, setter: setAporteInicial, prefix: 'R$' },
            { label: 'Aporte Mensal', value: aporteMensal, setter: setAporteMensal, prefix: 'R$' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <label className="block text-[14px] font-semibold text-textSecondary uppercase tracking-wider">{item.label}</label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">{item.prefix}</span>
                <input
                  type="text"
                  value={item.value}
                  onChange={handleCurrencyChange(item.setter, item.label)}
                  onBlur={() => trackCalculatorInteraction('Calculadora Investimento', `Input ${item.label}: ${item.value}`)}
                  className="w-full pl-12 pr-4 h-12 bg-[#1A2942] border border-[#2A3F5F] rounded-lg text-white text-[18px] font-semibold focus:outline-none focus:border-[#FF6B35] transition-all"
                />
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-textSecondary uppercase tracking-wider">Tempo de Investimento</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="number" 
                value={tempoValue} 
                onChange={handleNumberChange(setTempoValue, 'Tempo')} 
                onBlur={() => trackCalculatorInteraction('Calculadora Investimento', `Input Tempo: ${tempoValue} ${tempoUnit}`)}
                className="w-full sm:flex-grow px-4 h-12 bg-[#1A2942] border border-[#2A3F5F] rounded-lg text-white text-[18px] font-semibold focus:outline-none focus:border-[#FF6B35]" 
              />
              <div className="flex gap-2 w-full sm:w-auto">
                {['meses', 'anos'].map(u => (
                  <button 
                    key={u} 
                    onClick={() => handleUnitChange(setTempoUnit, u, 'Unidade Tempo')} 
                    className={cn(
                      "flex-1 sm:w-24 h-12 rounded-lg text-[14px] font-bold transition-all border", 
                      tempoUnit === u 
                        ? "bg-[#FF6B35] border-[#FF6B35] text-white" 
                        : "bg-white border-[#2A3F5F] text-[#8B9BB0]"
                    )}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-textSecondary uppercase tracking-wider">Taxa de Rentabilidade (%)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="number" 
                value={taxaValue} 
                onChange={handleNumberChange(setTaxaValue, 'Taxa')} 
                onBlur={() => trackCalculatorInteraction('Calculadora Investimento', `Input Taxa: ${taxaValue}% ao ${taxaUnit}`)}
                className="w-full sm:flex-grow px-4 h-12 bg-[#1A2942] border border-[#2A3F5F] rounded-lg text-white text-[18px] font-semibold focus:outline-none focus:border-[#FF6B35]" 
              />
              <div className="flex gap-2 w-full sm:w-auto">
                {['mes', 'ano'].map(u => (
                  <button 
                    key={u} 
                    onClick={() => handleUnitChange(setTaxaUnit, u, 'Unidade Taxa')} 
                    className={cn(
                      "flex-1 sm:w-24 h-12 rounded-lg text-[14px] font-bold transition-all border", 
                      taxaUnit === u 
                        ? "bg-[#FF6B35] border-[#FF6B35] text-white" 
                        : "bg-white border-[#2A3F5F] text-[#8B9BB0]"
                    )}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[12px] text-textMuted font-medium">Taxa efetiva mensal: <span className="text-white">{effectiveMonthlyRate.toFixed(2)}%</span></p>
          </div>
        </div>

        {results && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-lg bg-[#152238] border border-[#2A3F5F] flex flex-col justify-center items-center text-center">
                <p className="text-[16px] md:text-[18px] font-bold text-textSecondary uppercase mb-3 tracking-wide">Total Investido</p>
                <p className="text-[20px] md:text-[22px] font-extrabold text-white break-words whitespace-normal leading-tight opacity-90">
                  {formatCurrency(results.totalInvestido)}
                </p>
              </div>
              <div className="p-6 rounded-lg bg-[#152238] border border-[#2A3F5F] flex flex-col justify-center items-center text-center">
                <p className="text-[16px] md:text-[18px] font-bold text-textSecondary uppercase mb-3 tracking-wide">Total em Juros</p>
                <p className="text-[20px] md:text-[22px] font-extrabold text-[#00D68F] break-words whitespace-normal leading-tight opacity-90">
                  {formatCurrency(results.totalJuros)}
                </p>
              </div>
              <div className="p-6 rounded-lg bg-[#152238] border border-[#FF6B35] flex flex-col justify-center items-center text-center">
                <p className="text-[16px] md:text-[18px] font-bold text-textSecondary uppercase mb-3 tracking-wide">Valor Final Bruto</p>
                <p className="text-[20px] md:text-[22px] font-extrabold text-[#FF6B35] break-words whitespace-normal leading-tight opacity-90">
                  {formatCurrency(results.valorFinalBruto)}
                </p>
              </div>
            </div>

            <div className="bg-[#152238] border border-[#2A3F5F] rounded-lg p-4 sm:p-8 shadow-lg overflow-hidden">
              <h3 className="text-white text-[22px] font-bold text-center mb-6 uppercase tracking-wide">Projeção de Evolução</h3>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 border-t-2 border-dashed border-[#8B9BB0]"></div>
                  <span className="text-[12px] font-semibold text-[#8B9BB0]">Investido</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00D68F]"></div>
                  <span className="text-[12px] font-semibold text-[#00D68F]">Evolução</span>
                </div>
              </div>
              <div className="w-full h-[300px]">
                 <AreaChart data={results.chartData} />
              </div>
              <p className="mt-6 text-center text-[12px] font-medium text-[#8B9BB0]">Gráfico de evolução ao longo de {results.chartData.length - 1} meses</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InvestmentSection;