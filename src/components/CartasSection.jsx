import React from 'react';
import CartaCard from '@/components/CartaCard';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

const CartasSection = () => {
  const { trackButtonClick } = useAnalytics();

  const handleCardClick = (company, type, value) => {
    trackButtonClick('Carta Card Interaction', `${company} - ${type} - ${value}`);
  };

  const opportunities = [
    {
      type: "IMÓVEL",
      value: "R$ 350.000,00",
      company: "Bradesco",
      entry: "R$ 115.000,00",
      installments: "148x R$ 2.450,00",
      isHighlighted: false
    },
    {
      type: "VEÍCULO",
      value: "R$ 85.000,00",
      company: "Porto Seguro",
      entry: "R$ 28.000,00",
      installments: "64x R$ 1.120,00",
      isHighlighted: false
    },
    {
      type: "IMÓVEL",
      value: "R$ 500.000,00",
      company: "Caixa",
      entry: "R$ 160.000,00",
      installments: "180x R$ 3.100,00",
      isHighlighted: true
    },
    {
      type: "VEÍCULO",
      value: "R$ 120.000,00",
      company: "Itaú",
      entry: "R$ 42.000,00",
      installments: "72x R$ 1.650,00",
      isHighlighted: false
    },
    {
      type: "IMÓVEL",
      value: "R$ 200.000,00",
      company: "Adamantina",
      entry: "R$ 75.000,00",
      installments: "150x R$ 1.350,00",
      isHighlighted: false
    },
    {
      type: "VEÍCULO",
      value: "R$ 45.000,00",
      company: "Yamaha",
      entry: "R$ 18.000,00",
      installments: "48x R$ 890,00",
      isHighlighted: false
    }
  ];

  return (
    <section className="py-24 bg-[#0B1221]" id="cartas-contempladas">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold text-white mb-4 uppercase tracking-tight">
              Cartas Contempladas
            </h2>
            <p className="text-[18px] text-gray-400 font-medium">
              <span className="border-b-2 border-[#FF6B35] pb-1 text-gray-300">
                Oportunidades únicas disponíveis agora
              </span>
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {opportunities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(item.company, item.type, item.value)}
              className="cursor-pointer"
            >
              <CartaCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CartasSection;