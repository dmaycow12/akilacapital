export const convertAnnualToMonthlyRate = (annualRatePercent) => {
  // Formula: (1 + i_annual)^(1/12) - 1
  const decimalRate = annualRatePercent / 100;
  return Math.pow(1 + decimalRate, 1 / 12) - 1;
};

export const calculateInvestment = (aporteInicial, aporteMensal, meses, taxaMensalDecimal) => {
  let totalInvestido = aporteInicial;
  let valorFuturo = aporteInicial;
  const chartData = [];

  // Initial point (Month 0)
  chartData.push({
    mes: 0,
    investido: aporteInicial,
    evolucao: aporteInicial
  });

  for (let i = 1; i <= meses; i++) {
    // Apply interest to previous balance first (start of period or end of period convention? 
    // usually investment grows then contribution is added, or contribution added then grows.
    // Standard future value formula assumes contribution at end of period)
    
    // 1. Grow existing amount
    valorFuturo = valorFuturo * (1 + taxaMensalDecimal);
    
    // 2. Add monthly contribution
    valorFuturo += aporteMensal;
    
    // 3. Update total invested (principal only)
    totalInvestido += aporteMensal;

    chartData.push({
      mes: i,
      investido: totalInvestido,
      evolucao: valorFuturo
    });
  }

  const valorFinalBruto = valorFuturo;
  const totalJuros = valorFinalBruto - totalInvestido;

  return {
    totalInvestido,
    totalJuros,
    valorFinalBruto,
    chartData
  };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};