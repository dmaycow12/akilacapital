import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, className }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        "p-8 flex flex-col items-center text-center bg-[#152238] border border-[#2A3F5F] rounded-[12px] h-full",
        "transition-all duration-300 hover:border-[#FF6B35] hover:shadow-lg hover:shadow-[#FF6B35]/10",
        className
      )}
    >
      <div className="w-12 h-12 bg-[#FF6B35] rounded-md flex items-center justify-center mb-5 shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-[24px] font-bold text-white mb-3 leading-tight">
        {title}
      </h3>
      
      <p className="text-[17px] leading-[1.6] font-medium text-[#8B9BB0] px-4">
        {description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;