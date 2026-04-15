export const calculateConsortium = (valorBem, prazoMeses, operadora, parcelaReduzida) => {
  if (!valorBem || !prazoMeses || prazoMeses === 0) {
    return {
      valorTotal: 0,
      parcelaMensal: 0,
      parcelaMaxima: 0
    };
  }

  // Base administration rates per operator (mock values for simulation)
  const operatorRates = {
    'Bradesco': 14.5,
    'Caixa': 15.0,
    'Itaú': 16.0,
    'Santander': 15.5,
    'Porto Seguro': 14.0,
    'Sicredi': 13.5,
    'Banco do Brasil': 14.5,
    'Safra': 16.5
  };

  const taxaAdmin = operatorRates[operadora] || 15.0;
  const taxaDecimal = taxaAdmin / 100;
  
  // Calculate full values
  const valorComTaxa = valorBem * (1 + taxaDecimal);
  let parcelaMensal = valorComTaxa / prazoMeses;

  // Apply reduction if selected
  if (parcelaReduzida && parcelaReduzida !== 'Não') {
    const reductionPercent = parseFloat(parcelaReduzida.replace('%', ''));
    if (!isNaN(reductionPercent)) {
      parcelaMensal = parcelaMensal * (1 - (reductionPercent / 100));
    }
  }

  // Max parcel calculation (buffer logic)
  const parcelaMaxima = parcelaMensal * 1.15; 

  return {
    valorTotal: valorComTaxa,
    parcelaMensal: parcelaMensal,
    parcelaMaxima: parcelaMaxima
  };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};