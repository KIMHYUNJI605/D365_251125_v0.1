import React from 'react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { RowTwo } from './components/ActivityRow';
import { RowThree } from './components/LeadsRow';
import { FloatingActions } from './components/FloatingActions';
import { KPI } from './types';

// --- MOCK KPI DATA ---
const KPIS: KPI[] = [
  { id: '1', label: 'New Leads', value: '12', trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: '2', label: 'Tasks Due', value: '8', trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: '3', label: 'Appts', value: '5', trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: '4', label: 'Deliveries', value: '3', trend: 0, data: [1, 2, 1, 3, 2, 3, 3] },
];

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-inventis-bg font-sans overflow-y-auto lg:overflow-hidden">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:overflow-hidden flex flex-col gap-4 md:gap-6 pb-32 md:pb-6">
        
        {/* ROW 1: KPIs */}
        {/* Mobile: 2x2 Grid. Portrait: 2x2 Grid. Landscape: 4x1 Fixed Height. */}
        <div className="shrink-0">
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-2 md:gap-6 lg:h-[104px]">
              {KPIS.map((kpi) => (
                <div key={kpi.id} className="col-span-1 md:h-32 lg:col-span-3 lg:h-full h-28">
                  <KPICard kpi={kpi} />
                </div>
              ))}
           </div>
        </div>

        {/* REMAINING SPACE */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-0 lg:overflow-hidden">
            
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
    </div>
  );
}