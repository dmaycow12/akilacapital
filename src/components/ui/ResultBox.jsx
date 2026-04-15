import React from 'react';
import { cn } from '@/lib/utils';

const ResultBox = ({ label, value, className, valueColor = 'text-primary' }) => {
  return (
    <div className={cn(
      "p-6 rounded-lg bg-gradient-to-br from-bgCard to-bgInput border border-border",
      "transition-all duration-300 hover:border-primary/30",
      className
    )}>
      <p className="text-[13px] font-semibold text-textSecondary mb-2 uppercase tracking-wide">{label}</p>
      {/* Removed truncate class and ensured text wraps or scales down slightly on smaller screens */}
      <p className={cn("text-[24px] sm:text-[32px] font-extrabold break-words whitespace-normal leading-tight", valueColor)}>
        {value}
      </p>
    </div>
  );
};

export default ResultBox;