/**
 * App.tsx - Main Application Component
 *
 * Dealer365 Platform Entry Point
 * Updated to use new unified header system.
 */

import React, { useState, useCallback, useEffect } from "react";
import { GlobalHeader, AIAssistant, AppModule } from "./components/header";
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

// Initial KPI data
const INITIAL_KPIS: KPI[] = [
  { id: "1", label: "New Leads", value: "12", trend: 3, data: [4, 6, 3, 7, 5, 9, 12] },
  { id: "2", label: "Tasks Due", value: "8", trend: -2, data: [10, 8, 12, 5, 8, 6, 8] },
  { id: "3", label: "Appts", value: "5", trend: 1, data: [2, 3, 4, 3, 5, 4, 5] },
  { id: "4", label: "Deliveries", value: "3", trend: 0, data: [1, 2, 1, 3, 2, 3, 3] }
];

// View state types
type ViewState = "landing" | "dashboard" | "deals" | "config" | "service" | "admin" | "inventory" | "calendar" | "customers";

// Mock user data
const CURRENT_USER = {
  id: "user-1",
  name: "Alex M.",
  email: "alex.m@dealer365.com",
  role: "Sales Executive",
  dealership: "Premium Motors",
};

export default function App() {
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
  const getModule = (): AppModule => {
    if (currentView === 'landing') return 'landing';
    if (currentView === 'service') return 'service';
    if (currentView === 'admin') return 'admin';
    // Dashboard, Deals, Config, Inventory, Calendar, Customers belong to Sales
    return 'sales';
  };

  // Get current view name for breadcrumb
  const getCurrentView = (): string | undefined => {
    if (currentView === 'landing') return undefined;
    return currentView;
  };

  // Unified Navigation Handler
  const handleNavigate = (target: string) => {
    // Handle module navigation
    if (target === 'sales') {
      setCurrentView('dashboard');
    } else if (['dashboard', 'deals', 'config', 'service', 'admin', 'inventory', 'calendar', 'customers', 'landing'].includes(target)) {
      setCurrentView(target as ViewState);
    } else {
      console.log('Navigation to:', target);
    }
  };

  // Get AI context based on current page
  const getAIContext = () => ({
    page: currentView,
    module: getModule(),
    data: currentView === 'dashboard' ? { kpis } : undefined,
  });

  // Determine if we should show the workspace UI (header, AI assistant, etc.)
  const isWorkspaceView = currentView !== 'landing' && currentView !== 'config';

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden font-sans">

      {/* Global Header */}
      {currentView !== "config" && (
        <GlobalHeader
          currentModule={getModule()}
          currentView={getCurrentView()}
          onNavigate={handleNavigate}
          user={CURRENT_USER}
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
              <button
                onClick={() => setCurrentView('landing')}
                className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
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
              <button
                onClick={() => setCurrentView('landing')}
                className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Back to Platform Hub
              </button>
            </div>
          </div>
        )}

        {/* 7. INVENTORY (Placeholder) */}
        {currentView === "inventory" && (
          <div className="h-full w-full flex items-center justify-center bg-slate-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Inventory Management</h2>
              <p className="text-slate-500">Vehicle inventory and stock management module.</p>
            </div>
          </div>
        )}

        {/* 8. CALENDAR (Placeholder) */}
        {currentView === "calendar" && (
          <div className="h-full w-full flex items-center justify-center bg-slate-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Calendar & Scheduling</h2>
              <p className="text-slate-500">Appointments, test drives, and delivery scheduling.</p>
            </div>
          </div>
        )}

        {/* 9. CUSTOMERS (Placeholder) */}
        {currentView === "customers" && (
          <div className="h-full w-full flex items-center justify-center bg-slate-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Customer Database</h2>
              <p className="text-slate-500">Customer profiles, communication history, and CRM.</p>
            </div>
          </div>
        )}

      </main>

      {/* Floating Quick Actions (Dashboard & Deals only) */}
      {(currentView === "dashboard" || currentView === "deals") && (
        <FloatingActions />
      )}

      {/* AI Assistant - Available across all workspace views */}
      {isWorkspaceView && (
        <AIAssistant currentContext={getAIContext()} />
      )}

      {/* KPI Detail Modal */}
      {selectedKPI && (
        <KPIDetailModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )}
    </div>
  );
}
