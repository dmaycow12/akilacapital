import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { TrendingUp, Building2, FileCheck } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: FileCheck,
      title: 'Consórcios',
      description: 'Planeje a aquisição do seu bem de forma inteligente e sem juros abusivos. Oferecemos as melhores condições do mercado.'
    },
    {
      icon: TrendingUp,
      title: 'Alavancagem Patrimonial',
      description: 'Multiplique seu patrimônio com estratégias personalizadas de investimento e consultoria financeira especializada.'
    },
    {
      icon: Building2,
      title: 'Cartas Contempladas',
      description: 'Adquira seu bem imediatamente com cartas de crédito contempladas. Entrada facilitada e parcelas ajustáveis.'
    }
  ];

  return (
    <section className="py-24 bg-bgDark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="text-[22px] sm:text-[32px] lg:text-[44px] font-extrabold text-textPrimary uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            Nossos Serviços
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <div key={index} className="flex">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;