import React, { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { KPICard } from "./components/KPICard";
import { RowTwo } from "./components/ActivityRow";
import { RowThree } from "./components/LeadsRow";
import { FloatingActions } from "./components/FloatingActions";
import { KPIDetailModal } from "./components/KPIDetailModal";
import { DealsScreen } from "./components/DealsScreen";
import { ConfigScreen } from "./components/ConfigScreen";
import { KPI } from "./types";
import { Wrench, Settings } from "lucide-react";

// ... (KPIS data remains same) ...
const INITIAL_KPIS: KPI[] = [
  { id: "1", label: "New Leads", value: "12", trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: "2", label: "Tasks Due", value: "8", trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: "3", label: "Appts", value: "5", trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: "4", label: "Deliveries", value: "3", trend: 0, data: [1, 2, 1, 3, 2, 3, 3] }
];

// Updated View States
type ViewState = "landing" | "dashboard" | "deals" | "config" | "service" | "admin";

export default function App() {
  // Start at Landing Page
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [kpis, setKpis] = useState<KPI[]>(INITIAL_KPIS);

  // Mock Data Refresh Logic
  const refreshData = useCallback(() => {
    setTimeout(() => {
      setKpis(prev => prev.map(kpi => {
        const currentVal = parseInt(kpi.value);
        const change = Math.floor(Math.random() * 4) - 1; 
        const newVal = Math.max(0, currentVal + change);
        let newTrend = kpi.trend;
        if (newVal > currentVal) newTrend += 1;
        if (newVal < currentVal) newTrend -= 1;
        return { ...kpi, value: newVal.toString(), trend: newTrend };
      }));
    }, 800);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(refreshData, 30000);
    return () => clearInterval(intervalId);
  }, [refreshData]);

  // Determine Module Context for Header
  const getModule = (): 'landing' | 'sales' | 'service' | 'config' => {
      if (currentView === 'landing') return 'landing';
      if (currentView === 'service') return 'service';
      if (currentView === 'config') return 'config';
      // Dashboard and Deals belong to Sales
      return 'sales'; 
  };

  // Unified Navigation Handler
  const handleNavigate = (target: any) => {
      if (target === 'sales') setCurrentView('dashboard'); // Sales card -> Dashboard
      else setCurrentView(target);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      
      {/* Global Header (Contextual) */}
      {currentView !== "config" && currentView !== "landing" && (
        <Header 
            currentView={currentView} 
            onNavigate={handleNavigate} 
            currentModule={getModule()}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 relative">
        
        {/* 1. LANDING PAGE */}
        {currentView === "landing" && (
            <LandingPage onNavigate={handleNavigate} />
        )}

        {/* 2. SALES DASHBOARD */}
        {currentView === "dashboard" && (
          <div className="h-full w-full flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="shrink-0 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <KPICard key={k.id} kpi={k} onClick={() => setSelectedKPI(k)} />
              ))}
            </div>
            <div className="flex-1 min-h-0 flex flex-col gap-4">
              <div className="flex-1 min-h-0"><RowTwo /></div>
              <div className="flex-1 min-h-0"><RowThree /></div>
            </div>
          </div>
        )}

        {/* 3. DEALS PIPELINE */}
        {currentView === "deals" && (
          <div className="h-full w-full">
            <DealsScreen />
          </div>
        )}

        {/* 4. CONFIGURATOR (Has its own header) */}
        {currentView === "config" && (
            <div className="absolute inset-0 z-50 bg-white">
                <ConfigScreen onNavigate={handleNavigate} />
            </div>
        )}

        {/* 5. SERVICE MODULE (Placeholder) */}
        {currentView === "service" && (
            <div className="h-full w-full flex items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wrench size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Service Workspace</h2>
                    <p className="text-slate-500 max-w-md">
                        Repair Orders, VHC Inspection, and Technician Dispatch modules will be loaded here.
                    </p>
                    <button onClick={() => setCurrentView('landing')} className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                        Back to Platform Hub
                    </button>
                </div>
            </div>
        )}
        
        {/* 6. ADMIN MODULE (Placeholder) */}
         {currentView === "admin" && (
            <div className="h-full w-full flex items-center justify-center bg-slate-100">
                <div className="text-center">
                     <div className="w-20 h-20 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Admin Console</h2>
                    <p className="text-slate-500">System configuration and user management.</p>
                    <button onClick={() => setCurrentView('landing')} className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                        Back to Platform Hub
                    </button>
                </div>
            </div>
        )}

      </main>

      {/* Floating Actions (Only in Sales Dashboard/Deals) */}
      {(currentView === "dashboard" || currentView === "deals") && <FloatingActions />}

      {/* Modal */}
      {selectedKPI && (
        <KPIDetailModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )}
    </div>
  );
}