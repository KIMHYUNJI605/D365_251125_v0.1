import React from 'react';
import { KPI } from '../types';

interface KPICardProps {
  kpi: KPI;
  onClick?: (kpi: KPI) => void;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, onClick }) => {
  const isPositive = kpi.trend >= 0;

  // Render specific dummy chart based on label using native SVG
  const renderChart = () => {
    const commonSvgClass = "w-full h-full overflow-visible";

    // 1. New Leads: Area Sparkline
    if (kpi.label.toLowerCase().includes('leads')) {
      return (
        <svg viewBox="0 0 100 40" className={commonSvgClass} preserveAspectRatio="none">
          <defs>
            <linearGradient id="leadsGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 35 C 20 35, 30 15, 50 20 S 80 5, 100 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <path d="M0 35 C 20 35, 30 15, 50 20 S 80 5, 100 10 V 40 H 0 Z" fill="url(#leadsGradient)" stroke="none" />
        </svg>
      );
    } 
    // 2. Tasks Due: Bar Chart
    else if (kpi.label.toLowerCase().includes('tasks')) {
      return (
        <svg viewBox="0 0 100 40" className={commonSvgClass} preserveAspectRatio="none">
          <rect x="5" y="15" width="10" height="25" rx="1" fill="#cbd5e1" />
          <rect x="20" y="25" width="10" height="15" rx="1" fill="#cbd5e1" />
          <rect x="35" y="10" width="10" height="30" rx="1" fill="#cbd5e1" />
          <rect x="50" y="20" width="10" height="20" rx="1" fill="#cbd5e1" />
          <rect x="65" y="5"  width="10" height="35" rx="1" fill="#cbd5e1" />
          <rect x="80" y="15" width="10" height="25" rx="1" fill="#cbd5e1" />
        </svg>
      );
    } 
    // 3. Appointments: Line/Dot Plot
    else if (kpi.label.toLowerCase().includes('appts')) {
       return (
        <svg viewBox="0 0 100 40" className={commonSvgClass} preserveAspectRatio="none">
           <polyline points="5,30 20,25 35,35 50,15 65,20 80,10 95,15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
           {[
             {cx:5, cy:30}, {cx:20, cy:25}, {cx:35, cy:35}, {cx:50, cy:15}, 
             {cx:65, cy:20}, {cx:80, cy:10}, {cx:95, cy:15}
           ].map((p, i) => (
             <circle key={i} cx={p.cx} cy={p.cy} r="3" fill="#94a3b8" />
           ))}
        </svg>
      );
    } 
    // 4. Deliveries: Column Chart
    else {
       return (
        <svg viewBox="0 0 100 40" className={commonSvgClass} preserveAspectRatio="none">
          <rect x="2" y="30" width="12" height="10" rx="1" fill="#94a3b8" />
          <rect x="18" y="20" width="12" height="20" rx="1" fill="#94a3b8" />
          <rect x="34" y="35" width="12" height="5"  rx="1" fill="#94a3b8" />
          <rect x="50" y="15" width="12" height="25" rx="1" fill="#94a3b8" />
          <rect x="66" y="25" width="12" height="15" rx="1" fill="#94a3b8" />
          <rect x="82" y="10" width="12" height="30" rx="1" fill="#94a3b8" />
        </svg>
      );
    }
  };

  return (
    <div 
      onClick={() => onClick && onClick(kpi)}
      className="bg-slate-50 lg:bg-white rounded-xl shadow-sm border border-inventis-border px-4 py-3 flex flex-col justify-between h-full relative overflow-hidden cursor-pointer hover:border-blue-400 hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 group select-none"
    >
      
      {/* Row 1: Title & Trend */}
      <div className="flex justify-between items-start h-5 shrink-0">
        <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate mr-1 group-hover:text-blue-600 transition-colors">{kpi.label}</p>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-none ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            <span className="animate-bounce">{isPositive ? '▲' : '▼'}</span>
            <span>{Math.abs(kpi.trend)}</span>
        </div>
      </div>

      {/* Row 2: Value */}
      <div className="flex-1 flex items-center min-h-[40px]">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-none tracking-tight">{kpi.value}</h2>
      </div>
      
      {/* Row 3: Chart (Static SVG) */}
      <div className="h-10 w-full opacity-80 shrink-0 mt-2">
        {renderChart()}
      </div>
    </div>
  );
};