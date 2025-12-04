import React from 'react';

type BadgeVariant = 'solid' | 'light' | 'outline';
type BadgeColor = 'slate' | 'red' | 'orange' | 'blue' | 'green' | 'purple';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  label, 
  variant = 'light', 
  color = 'slate',
  className = ''
}) => {
  
  // Color Maps
  const colors: Record<string, Record<string, string>> = {
    slate: { solid: 'bg-slate-800 text-white', light: 'bg-slate-100 text-slate-600', outline: 'border-slate-300 text-slate-600' },
    red: { solid: 'bg-red-500 text-white', light: 'bg-red-50 text-red-600', outline: 'border-red-200 text-red-600' },
    orange: { solid: 'bg-orange-500 text-white', light: 'bg-orange-50 text-orange-600', outline: 'border-orange-200 text-orange-600' },
    blue: { solid: 'bg-blue-500 text-white', light: 'bg-blue-50 text-blue-600', outline: 'border-blue-200 text-blue-600' },
    green: { solid: 'bg-emerald-500 text-white', light: 'bg-emerald-50 text-emerald-600', outline: 'border-emerald-200 text-emerald-600' },
    purple: { solid: 'bg-purple-500 text-white', light: 'bg-purple-50 text-purple-600', outline: 'border-purple-200 text-purple-600' },
  };

  const selectedColor = colors[color] || colors.slate;
  
  const baseStyles = "inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-[4px]";
  const variantStyles = variant === 'outline' ? 'border' : '';
  const colorStyles = variant === 'outline' ? selectedColor.outline : selectedColor[variant];

  return (
    <span className={`${baseStyles} ${variantStyles} ${colorStyles} ${className}`}>
      {label}
    </span>
  );
};