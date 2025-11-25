import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { KPI } from '../types';

interface KPICardProps {
  kpi: KPI;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const chartData = kpi.data.map((val, idx) => ({ i: idx, v: val }));
  const isPositive = kpi.trend > 0;

  return (
    <div className="bg-slate-50 lg:bg-white rounded-xl shadow-sm lg:shadow-card border border-inventis-border p-3 md:p-5 flex flex-col justify-between h-full relative overflow-hidden">
      
      <div className="flex justify-between items-start relative z-10">
        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
        <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-md ${isPositive ? 'text-emerald-700 bg-emerald-100/50' : 'text-red-700 bg-red-100/50'}`}>
            {isPositive ? '+' : ''}{kpi.trend}
        </span>
      </div>

      <div className="flex items-end justify-between mt-2 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-none">{kpi.value}</h2>
      </div>
      
      {/* Chart - Subtler on mobile, prominent on desktop */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 opacity-40 lg:opacity-100 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
                type="monotone" 
                dataKey="v" 
                stroke="#64748b" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill={`url(#gradient-${kpi.id})`} 
                isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};