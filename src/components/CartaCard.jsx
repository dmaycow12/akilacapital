import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CartaCard = ({ type, value, company, entry, installments, isHighlighted }) => {
  const handleInterestClick = () => {
    window.open('https://wa.me/5534998918954', '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-300",
        "bg-[#152238]", // Dark background
        isHighlighted 
          ? "border-[#FF6B35] shadow-[0_0_30px_-10px_rgba(255,107,53,0.3)]" 
          : "border-gray-700/50 hover:border-gray-500 hover:shadow-xl"
      )}
    >
      {/* Top Banner/Badge Area */}
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start mb-4">
          <span className={cn(
            "px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider",
            "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          )}>
            {type}
          </span>
          <span className="text-gray-400 text-sm font-semibold tracking-wide">
            {company}
          </span>
        </div>

        {/* Main Value */}
        <div className="mb-2">
          <h3 className="text-[26px] md:text-[28px] font-extrabold text-white leading-tight">
            {value}
          </h3>
          <p className="text-gray-500 text-[13px] font-medium uppercase tracking-wide mt-1">
            Crédito Disponível
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2" />

      {/* Details Section */}
      <div className="p-6 pt-2 space-y-5 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[13px] text-gray-400 font-medium mb-1">Entrada</span>
            <span className="text-[18px] font-bold text-[#FF6B35]">
              {entry}
            </span>
          </div>
          <div className="h-8 w-px bg-gray-700/50"></div>
          <div className="flex flex-col items-end">
            <span className="text-[13px] text-gray-400 font-medium mb-1">Parcelas</span>
            <span className="text-[18px] font-bold text-white">
              {installments}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-0 mt-auto">
        <Button 
          onClick={handleInterestClick}
          className={cn(
            "w-full h-12 text-[15px] font-bold uppercase tracking-wide transition-all duration-300 rounded-lg px-6 py-2",
            // Always orange, white text, and hover effects for all cards
            "bg-[#FF6B35] hover:bg-[#E55A2B] text-white shadow-lg border border-transparent hover:opacity-90 hover:scale-[1.02]"
          )}
        >
          TENHO INTERESSE
        </Button>
      </div>
    </motion.div>
  );
};

export default CartaCard;