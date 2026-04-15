import React from 'react';
import { cn } from '@/lib/utils';

const RangeSlider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  unit = '',
  className 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-textPrimary">{label}</label>
          <span className="text-[16px] font-bold text-primary">
            {value}{unit}
          </span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${percentage}%, #2A3F5F ${percentage}%, #2A3F5F 100%)`
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[12px] font-medium text-textMuted">{min}{unit}</span>
        <span className="text-[12px] font-medium text-textMuted">{max}{unit}</span>
      </div>
    </div>
  );
};

export default RangeSlider;