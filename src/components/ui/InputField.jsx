import React from 'react';
import { cn } from '@/lib/utils';

const InputField = React.forwardRef(({ 
  className, 
  label, 
  error, 
  touched,
  prefix,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[14px] font-semibold mb-2 text-textPrimary">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary text-[16px] font-medium">
            {prefix}
          </span>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 bg-bgInput border border-border rounded-md",
            "text-textPrimary text-[16px] font-medium placeholder:text-textMuted",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all duration-200",
            "hover:border-textMuted",
            error && touched && "border-error focus:ring-error",
            prefix && "pl-12",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && touched && (
        <p className="mt-1 text-error text-[12px] font-medium">{error}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;