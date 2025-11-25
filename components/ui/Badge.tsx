import React from 'react';

interface BadgeProps {
  label: string;
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'slate';
  variant?: 'solid' | 'light';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'slate', variant = 'solid', className = '' }) => {
  
  const getClasses = () => {
    const base = "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide whitespace-nowrap";
    
    // Map colors to [Light Bg, Light Text, Solid Bg, Solid Text]
    const maps: Record<string, [string, string, string, string]> = {
        red:    ['bg-red-50', 'text-red-700', 'bg-inventis-red', 'text-white'],
        orange: ['bg-orange-50', 'text-orange-700', 'bg-inventis-orange', 'text-white'],
        yellow: ['bg-yellow-50', 'text-yellow-700', 'bg-inventis-yellow', 'text-slate-900'],
        green:  ['bg-emerald-50', 'text-emerald-700', 'bg-inventis-green', 'text-white'],
        blue:   ['bg-blue-50', 'text-blue-700', 'bg-inventis-blue', 'text-white'],
        indigo: ['bg-indigo-50', 'text-indigo-700', 'bg-inventis-indigo', 'text-white'],
        purple: ['bg-purple-50', 'text-purple-700', 'bg-inventis-purple', 'text-white'],
        slate:  ['bg-slate-100', 'text-slate-600', 'bg-slate-500', 'text-white'],
    };

    const c = maps[color] || maps.slate;
    
    if (variant === 'solid') {
        return `${base} ${c[2]} ${c[3]} shadow-sm`;
    } else {
        return `${base} ${c[0]} ${c[1]} border border-${color}-100/50`;
    }
  };

  return (
    <span className={`${getClasses()} ${className}`}>
      {label}
    </span>
  );
};