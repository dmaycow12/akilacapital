import React, { useState, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChart = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bgCard border border-border rounded-lg p-4 shadow-lg z-50">
          <p className="body-sm text-textSecondary mb-2">Mês {label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="body-sm font-semibold" style={{ color: entry.color }}>
                {entry.name}: {formatCurrency(entry.value)}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorEvolucao" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D68F" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#00D68F" stopOpacity={0}/>
          </linearGradient>
           <linearGradient id="colorInvestido" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1F2F45" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#1F2F45" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A3F5F" vertical={false} opacity={0.5} />
        <XAxis 
          dataKey="mes" 
          stroke="#5A6B7F"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: '12px' }}
          tickMargin={10}
          hide={isMobile}
        />
        <YAxis 
          stroke="#5A6B7F"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
          width={isMobile ? 0 : 70}
          hide={isMobile}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A3F5F', strokeWidth: 1 }} />
        
        <Area 
          name="Evolução"
          type="monotone" 
          dataKey="evolucao" 
          stroke="#00D68F" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorEvolucao)" 
          activeDot={{ r: 6, strokeWidth: 0, fill: '#00D68F' }}
        />
        <Area 
          name="Investido"
          type="monotone" 
          dataKey="investido" 
          stroke="#8B9BB0" 
          strokeWidth={2}
          strokeDasharray="5 5"
          fillOpacity={1} 
          fill="url(#colorInvestido)" 
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;