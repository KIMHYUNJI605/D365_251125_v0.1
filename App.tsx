
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { RowTwo } from './components/ActivityRow';
import { RowThree } from './components/LeadsRow';
import { FloatingActions } from './components/FloatingActions';
import { KPIDetailModal } from './components/KPIDetailModal';
import { DealsScreen } from './components/DealsScreen';
import { ConfigScreen } from './components/ConfigScreen';
import { KPI } from './types';
import { RefreshCw } from 'lucide-react';

// --- MOCK KPI DATA ---
const INITIAL_KPIS: KPI[] = [
  { id: '1', label: 'New Leads', value: '12', trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: '2', label: 'Tasks Due', value: '8', trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: '3', label: 'Appts', value: '5', trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: '4', label: 'Deliveries', value: '3', trend: 0, data: [1, 2, 1, 3, 2, 3, 3] },
];

type ViewState = 'dashboard' | 'deals' | 'config';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('deals'); // Defaulting to Deals as per prompt instruction implicitly
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpis, setKpis] = useState<KPI[]>(INITIAL_KPIS);

  const refreshData = useCallback(() => {
    // Simulate network request delay for realism
    setTimeout(() => {
      setKpis(prev => prev.map(kpi => {
        const currentVal = parseInt(kpi.value);
        const change = Math.floor(Math.random() * 4) - 1; 
        const newVal = Math.max(0, currentVal + change);
        let newTrend = kpi.trend;
        if (newVal > currentVal) newTrend += 1;
        if (newVal < currentVal) newTrend -= 1;
        const newData = [...kpi.data.slice(1), newVal];

        return {
          ...kpi,
          value: newVal.toString(),
          trend: newTrend,
          data: newData
        };
      }));
    }, 800);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(refreshData, 30000);
    return () => clearInterval(intervalId);
  }, [refreshData]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#FFFFFF] font-sans overflow-hidden">
      
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 h-full overflow-hidden relative">
        
        {/* DASHBOARD VIEW */}
        <div className={`absolute inset-0 flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-y-auto lg:overflow-hidden transition-opacity duration-300 ${currentView === 'dashboard' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
           {/* KPI Row */}
           <div className="shrink-0 flex flex-col gap-3">
             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.id} className="col-span-1">
                    <KPICard kpi={kpi} onClick={(k) => setSelectedKPI(k)} />
                  </div>
                ))}
             </div>
           </div>

           {/* Dashboard Grid */}
           <div className="flex-1 flex flex-col gap-4 min-h-0">
              <div className="lg:flex-1 lg:min-h-0 h-auto shrink-0">
                  <RowTwo />
              </div>
              <div className="lg:flex-1 lg:min-h-0 h-auto shrink-0">
                  <RowThree />
              </div>
           </div>
        </div>

        {/* DEALS VIEW */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${currentView === 'deals' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <DealsScreen />
        </div>

        {/* CONFIG VIEW */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${currentView === 'config' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <ConfigScreen />
        </div>

      </main>

      {/* Global Floating Actions - Show on Dashboard/Deals only */}
      {currentView !== 'config' && <FloatingActions />}
      
      {/* KPI Modal (Dashboard only) */}
      {selectedKPI && (
        <KPIDetailModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )}
    </div>
  );
}
