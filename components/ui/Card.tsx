import React from 'react';

interface CardProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  fullHeight?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, action, children, className = 'bg-white', footer, fullHeight = true }) => {
  // Note: className default is 'bg-white' unless passed. If passed, user must include bg color.
  const combinedClass = `rounded-xl shadow-card md:shadow-md border border-inventis-border flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover ${fullHeight ? 'h-full' : ''} ${className}`;

  return (
    <div className={combinedClass}>
      {(title || action) && (
        <div className="px-4 py-3 md:px-6 md:py-3 border-b border-slate-300/50 flex justify-between items-center shrink-0">
          {title && <h3 className="text-base md:text-lg font-bold text-slate-800 leading-tight tracking-tight">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4 md:px-6 py-3 flex-1 overflow-auto no-scrollbar relative">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 md:px-6 md:py-4 border-t border-slate-300 bg-white/60 shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};