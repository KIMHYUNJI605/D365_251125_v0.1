import React from 'react';
import { X, TrendingUp, TrendingDown, Clock, ArrowRight, Activity, CheckCircle } from 'lucide-react';
import { KPI } from '../types';
import { Badge } from './ui/Badge';

interface KPIDetailModalProps {
  kpi: KPI;
  onClose: () => void;
}

export const KPIDetailModal: React.FC<KPIDetailModalProps> = ({ kpi, onClose }) => {
  const isPositive = kpi.trend >= 0;

  // Generate dummy rows based on KPI label
  const getDummyRows = () => {
    const rows = [];
    const count = 6;
    const type = kpi.label.toLowerCase();
    
    for (let i = 0; i < count; i++) {
        let title = `Record #${1000 + i}`;
        let sub = 'Processed successfully';
        let val = 'Done';
        
        if (type.includes('lead')) {
            title = ['James Smith', 'Maria Garcia', 'Robert Johnson', 'Michael Brown', 'Jennifer Davis', 'William Wilson'][i];
            sub = ['Web Inquiry', 'Walk-in', 'Referral', 'Phone', 'Web Inquiry', 'Event'][i];
            val = ['Hot', 'Warm', 'Hot', 'Cold', 'Warm', 'Warm'][i];
        } else if (type.includes('task')) {
            title = ['Follow up Quote', 'Schedule Service', 'Update CRM', 'Email Campaign', 'Call Manager', 'Inventory Check'][i];
            sub = 'Due Today';
            val = 'Pending';
        } else if (type.includes('appt')) {
             title = ['Test Drive: 911', 'Delivery: X5', 'Service: Macan', 'Meeting: Sales', 'Test Drive: C-Class', 'Delivery: Q7'][i];
             sub = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:15 PM'][i];
             val = 'Confirmed';
        } else if (type.includes('deliv')) {
             title = ['BMW X5 M50i', 'Porsche 911', 'Audi Q8', 'Mercedes GLE', 'Range Rover', 'Tesla Model S'][i];
             sub = 'Ready for pickup';
             val = 'Delivered';
        }

        rows.push({ title, sub, val });
    }
    return rows;
  };

  const rows = getDummyRows();

  // Custom SVG Chart Logic
  const renderCustomChart = () => {
    const data = kpi.data;
    if (!data || data.length === 0) return null;

    const width = 100;
    const height = 40;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;

    // Generate points for the line
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height * 0.8) - (height * 0.1); // 10% padding top/bottom
      return `${x},${y}`;
    }).join(' ');

    // Generate area path (line points + corners to close the shape)
    const areaPoints = `${points} ${width},${height} 0,${height}`;
    
    const color = isPositive ? '#10b981' : '#ef4444'; // Emerald or Red

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
        {/* Grid lines */}
        <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

        <polygon points={areaPoints} fill="url(#chartGradient)" />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Dots on points */}
        {data.map((val, i) => {
           const x = (i / (data.length - 1)) * width;
           const y = height - ((val - min) / range) * (height * 0.8) - (height * 0.1);
           return (
             <circle key={i} cx={x} cy={y} r="1.5" fill="white" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
           )
        })}
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden scale-100" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                <Activity size={20} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-slate-900 leading-none">{kpi.label} Report</h2>
                <p className="text-xs text-slate-500 mt-1">Live analytics & history</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Key Stat Card */}
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 rotate-12">
                     {isPositive ? <TrendingUp size={120} /> : <TrendingDown size={120} />}
                  </div>
                  <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Current Period</span>
                      </div>
                      <h1 className="text-5xl font-bold tracking-tight text-white mb-1">{kpi.value}</h1>
                      <p className="text-sm text-slate-400 font-medium">{kpi.label}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Trend</span>
                      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{Math.abs(kpi.trend)}%</span>
                      </div>
                  </div>
              </div>

              {/* Enhanced Chart */}
              <div className="md:col-span-2 bg-white border border-inventis-border rounded-xl p-5 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-slate-700">Performance Trend</h3>
                     <select className="text-xs border-none bg-slate-100 rounded px-2 py-1 text-slate-600 font-medium focus:ring-0 cursor-pointer">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                     </select>
                  </div>
                  <div className="flex-1 w-full min-h-[120px] bg-slate-50/50 rounded-lg border border-slate-100 p-2">
                    {renderCustomChart()}
                  </div>
              </div>
           </div>

           {/* Granular Data Table */}
           <div>
              <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                     <CheckCircle size={18} className="text-slate-400" />
                     Recent Records
                  </h3>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                      Full Report <ArrowRight size={14} />
                  </button>
              </div>
              <div className="bg-white border border-inventis-border rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
                  {rows.map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                {row.title.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{row.title}</p>
                                <p className="text-xs text-slate-500">{row.sub}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <Badge label={row.val} variant="light" color="slate" />
                        </div>
                      </div>
                  ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};