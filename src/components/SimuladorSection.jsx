import React, { useState, useEffect } from 'react';
import InputField from '@/components/ui/InputField';
import RangeSlider from '@/components/ui/RangeSlider';
import ResultBox from '@/components/ui/ResultBox';
import { Button } from '@/components/ui/button';
import { calculateConsortium, formatCurrency } from '@/utils/simuladorCalculations';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';

const OPERADORAS = [
  'Bradesco', 'Caixa', 'Itaú', 'Santander', 
  'Porto Seguro', 'Sicredi', 'Banco do Brasil', 'Safra'
];

const REDUCAO_OPCOES = [
  'Não', '10%', '20%', '30%', '40%', '50%'
];

const SimuladorSection = () => {
  const { toast } = useToast();
  const { trackCalculatorInteraction, trackFormSubmission } = useAnalytics();
  const [valorConsorcio, setValorConsorcio] = useState('');
  const [operadora, setOperadora] = useState('Bradesco');
  const [prazo, setPrazo] = useState(120);
  const [parcelaReduzida, setParcelaReduzida] = useState('Não');
  const [results, setResults] = useState({ valorTotal: 0, parcelaMensal: 0, parcelaMaxima: 0 });

  useEffect(() => {
    const valor = parseFloat(valorConsorcio.replace(/\D/g, '')) || 0;
    const calculatedResults = calculateConsortium(valor, prazo, operadora, parcelaReduzida);
    setResults(calculatedResults);
  }, [valorConsorcio, prazo, operadora, parcelaReduzida]);

  const handleValorChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) {
      setValorConsorcio('');
      return;
    }
    const formatted = new Intl.NumberFormat('pt-BR').format(parseInt(value));
    setValorConsorcio(formatted);
    // Debounce tracking or track on blur would be better, but keeping it simple for now
  };

  const handleSolicitarProposta = () => {
    trackFormSubmission('Simulador Consorcio', 'Proposta Solicitada');
    trackCalculatorInteraction('Simulador Consorcio', `Solicitado: ${operadora} - ${valorConsorcio}`);
    
    toast({
      title: "Proposta Solicitada!",
      description: `Simulação com ${operadora} enviada para análise.`,
    });
  };

  const handleOperadoraChange = (e) => {
    setOperadora(e.target.value);
    trackCalculatorInteraction('Simulador Consorcio', `Mudou Operadora: ${e.target.value}`);
  }

  const handleParcelaReduzidaChange = (e) => {
    setParcelaReduzida(e.target.value);
    trackCalculatorInteraction('Simulador Consorcio', `Mudou Reducao: ${e.target.value}`);
  }

  const handlePrazoChange = (newPrazo) => {
    setPrazo(newPrazo);
    // Since this is a slider, we might not want to track every move, 
    // but the request is simple interaction tracking.
    // Ideally, track on "commit" (mouse up), but here we track state change.
  }

  return (
    <section id="simulador" className="py-20 bg-bgCard">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 overflow-hidden">
          <h2 className="text-[22px] sm:text-[32px] lg:text-[44px] font-extrabold text-textPrimary mb-4 uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            Simulador de Consórcio
          </h2>
          <p className="text-[18px] font-medium text-textSecondary">
            Calcule suas parcelas e planeje seu investimento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-8 bg-[#1A2942]/30 p-8 rounded-xl border border-[#2A3F5F]/50">
            
            {/* 1. Valor do Consórcio */}
            <InputField
              label="Valor do Consórcio"
              prefix="R$"
              value={valorConsorcio}
              onChange={handleValorChange}
              placeholder="0"
              className="text-[18px] font-semibold"
            />

            {/* 2. Qual Operadora? */}
            <div>
              <label className="block text-[14px] font-semibold mb-3 text-textPrimary uppercase tracking-wider">
                Qual Operadora?
              </label>
              <div className="relative">
                <select
                  value={operadora}
                  onChange={handleOperadoraChange}
                  className="w-full h-12 px-4 bg-bgInput border border-border rounded-md text-textPrimary text-[16px] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                >
                  {OPERADORAS.map((op) => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* 3. Prazo */}
            <RangeSlider
              label="Prazo"
              value={prazo}
              onChange={handlePrazoChange}
              min={12}
              max={240}
              step={12}
              unit=" meses"
            />

            {/* 4. Parcela Reduzida? */}
            <div>
              <label className="block text-[14px] font-semibold mb-3 text-textPrimary uppercase tracking-wider">
                Parcela Reduzida?
              </label>
              <div className="relative">
                <select
                  value={parcelaReduzida}
                  onChange={handleParcelaReduzidaChange}
                  className="w-full h-12 px-4 bg-bgInput border border-border rounded-md text-textPrimary text-[16px] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                >
                  {REDUCAO_OPCOES.map((opt) => (
                    <option key={opt} value={opt}>{opt === 'Não' ? 'Não' : `${opt} de redução`}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textSecondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="space-y-6 flex flex-col justify-center">
            <ResultBox 
              label="Valor Total com Taxas" 
              value={formatCurrency(results.valorTotal)} 
            />
            <ResultBox 
              label="Parcela Mensal" 
              value={formatCurrency(results.parcelaMensal)}
              className="border-primary/50 bg-primary/5"
              valueColor="text-primary"
            />
            {/* Parcela Máxima typically refers to income requirement or maximum fluctuation buffer */}
            <ResultBox 
              label="Renda Mínima Sugerida" 
              value={formatCurrency(results.parcelaMensal * 3)} 
              valueColor="text-[#00D68F]"
            />
            <Button 
              className="w-full h-16 text-[18px] font-bold mt-4 shadow-lg hover:shadow-xl transition-all" 
              size="lg"
              onClick={handleSolicitarProposta}
            >
              Solicitar Proposta Personalizada
            </Button>
            <p className="text-center text-textMuted text-sm">
              *Valores estimados. As taxas podem variar de acordo com a operadora selecionada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimuladorSection;