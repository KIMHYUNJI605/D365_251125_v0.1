import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { RowTwo } from './components/ActivityRow';
import { RowThree } from './components/LeadsRow';
import { FloatingActions } from './components/FloatingActions';
import { KPIDetailModal } from './components/KPIDetailModal';
import { KPI } from './types';
import { RefreshCw } from 'lucide-react';

// --- MOCK KPI DATA ---
const INITIAL_KPIS: KPI[] = [
  { id: '1', label: 'New Leads', value: '12', trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: '2', label: 'Tasks Due', value: '8', trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: '3', label: 'Appts', value: '5', trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: '4', label: 'Deliveries', value: '3', trend: 0, data: [1, 2, 1, 3, 2, 3, 3] },
];

export default function App() {
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpis, setKpis] = useState<KPI[]>(INITIAL_KPIS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    
    // Simulate network request delay for realism
    setTimeout(() => {
      setKpis(prev => prev.map(kpi => {
        // Parse current value
        const currentVal = parseInt(kpi.value);
        
        // Random fluctuation between -1 and 2
        const change = Math.floor(Math.random() * 4) - 1; 
        const newVal = Math.max(0, currentVal + change);
        
        // Update trend slightly based on value change direction
        let newTrend = kpi.trend;
        if (newVal > currentVal) newTrend += 1;
        if (newVal < currentVal) newTrend -= 1;
        
        // Update history data (shift left)
        const newData = [...kpi.data.slice(1), newVal];

        return {
          ...kpi,
          value: newVal.toString(),
          trend: newTrend,
          data: newData
        };
      }));
      setIsRefreshing(false);
    }, 800);
  }, []);

  // Set up periodic refresh (every 30 seconds)
  useEffect(() => {
    const intervalId = setInterval(refreshData, 30000);
    return () => clearInterval(intervalId);
  }, [refreshData]);

  return (
    <div className="flex flex-col h-screen w-screen bg-inventis-bg font-sans overflow-y-auto lg:overflow-hidden">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:overflow-hidden flex flex-col gap-4 md:gap-4 pb-32 md:pb-6">
        
        {/* ROW 1: KPIs */}
        <div className="shrink-0 flex flex-col gap-3">
           
           {/* Section Header with Refresh Control */}
           <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Overview</h2>
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                 {isRefreshing ? 'Updating...' : 'Refresh Data'}
              </button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="col-span-1">
                  <KPICard 
                    kpi={kpi} 
                    onClick={(k) => setSelectedKPI(k)}
                  />
                </div>
              ))}
           </div>
        </div>

        {/* REMAINING SPACE */}
        <div className="flex-1 flex flex-col gap-4 md:gap-4 min-h-0 lg:overflow-hidden">
            
            {/* ROW 2: Activities & Actions */}
            <div className="lg:flex-1 lg:min-h-0 h-auto shrink-0">
                <RowTwo />
            </div>

            {/* ROW 3: Leads & Timeline */}
            <div className="lg:flex-1 lg:min-h-0 h-auto shrink-0">
                <RowThree />
            </div>
            
        </div>
      </main>

      <FloatingActions />
      
      {/* KPI Detail Modal */}
      {selectedKPI && (
        <KPIDetailModal 
          kpi={selectedKPI} 
          onClose={() => setSelectedKPI(null)} 
        />
      )}
    </div>
  );
}