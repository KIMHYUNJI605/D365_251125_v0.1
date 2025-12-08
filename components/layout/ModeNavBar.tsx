import React from 'react';
import { LayoutGrid, FileText, Calendar, Car, UserCheck, BarChart3, Wrench, MessageSquare, Receipt, Settings, Database, Lock, ArrowLeft, Plus } from 'lucide-react';

type AppMode = 'SALES' | 'SERVICE' | 'ADMIN';

interface ModeNavBarProps {
  mode: AppMode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  theme?: 'light' | 'dark';
  
  // Actions
  onNewDeal?: () => void;
  onConfigurator?: () => void;
  onNewRO?: () => void;
  onBackToDashboard?: () => void; // For Config mode
}

export const ModeNavBar: React.FC<ModeNavBarProps> = ({ 
  mode, activeTab, onTabChange, theme = 'light', 
  onNewDeal, onConfigurator, onNewRO, onBackToDashboard
}) => {
  const isDark = theme === 'dark';

  // Theme Styles
  const bgClass = isDark ? 'bg-[#0F172A]/90 backdrop-blur-md border-slate-800' : 'bg-white border-slate-200';
  const textClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const activeTextClass = isDark ? 'text-white' : 'text-slate-900';
  const activeBgClass = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const hoverClass = isDark ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-slate-50';

  // Tabs Configuration
  const getTabs = () => {
    if (mode === 'SALES') return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { id: 'deals', label: 'Deals Pipeline', icon: FileText },
      { id: 'inventory', label: 'Inventory', icon: Car },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'customers', label: 'Customers', icon: UserCheck },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
    ];
    if (mode === 'SERVICE') return [
      { id: 'workbench', label: 'RO Workbench', icon: Wrench },
      { id: 'jobboard', label: 'Job Board', icon: Calendar },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
      { id: 'billing', label: 'Billing', icon: Receipt },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];
    if (mode === 'ADMIN') return [
      { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
      { id: 'master', label: 'Master Data', icon: Database },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'security', label: 'Security', icon: Lock },
    ];
    return [];
  };

  const tabs = getTabs();

  return (
    <nav className={`h-[56px] w-full border-b flex items-center justify-between px-6 shrink-0 z-40 transition-colors duration-300 ${bgClass}`}>
      
      {/* LEFT: Context Label */}
      <div className="flex items-center min-w-[240px]">
         {isDark ? (
             // Configurator Mode: Back Button
             <button onClick={onBackToDashboard} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-[#3FE0C5] transition-colors group">
                <div className="p-1.5 rounded-full bg-slate-800 border border-slate-700 group-hover:border-[#3FE0C5] transition-colors">
                    <ArrowLeft size={14} />
                </div>
                Back to Dashboard
             </button>
         ) : (
             // Standard Mode: Breadcrumb style
             <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-slate-400 uppercase tracking-wider">{mode}</span>
                <span className="text-slate-300">/</span>
                <span className={`font-bold ${activeTextClass}`}>
                    {tabs.find(t => t.id === activeTab)?.label || 'Overview'}
                </span>
             </div>
         )}
      </div>

      {/* CENTER: Tabs */}
      <div className="flex-1 flex justify-center h-full">
        <div className="flex items-center gap-1 h-full">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative h-[36px] px-4 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                        activeTab === tab.id 
                        ? `${activeTextClass} ${activeBgClass}` 
                        : `${textClass} ${hoverClass}`
                    }`}
                >
                    <tab.icon size={16} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    <span className="hidden xl:inline">{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* RIGHT: Quick Actions */}
      <div className="flex items-center justify-end gap-3 min-w-[240px]">
          {mode === 'SALES' && !isDark && (
              <>
                <button onClick={onNewDeal} className="hidden md:flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-bold border border-transparent hover:border-slate-200 transition-all">
                    <Plus size={16} /> New Lead
                </button>
                <button onClick={onConfigurator} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-md transition-all active:scale-95">
                    <Car size={16} />
                    <span>Configurator</span>
                </button>
              </>
          )}
          {mode === 'SERVICE' && (
               <button onClick={onNewRO} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 shadow-md transition-all active:scale-95">
                    <Wrench size={16} />
                    <span>New RO</span>
               </button>
          )}
          {mode === 'ADMIN' && (
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300 transition-all">
                   <Settings size={16} /> System Status
               </button>
          )}
          
          {/* Config Mode Specific Actions */}
          {isDark && (
              <div className="flex items-center gap-2">
                   <span className="text-xs text-slate-500 font-medium mr-2">Auto-saved</span>
                   <button className="px-4 py-1.5 rounded border border-slate-700 text-slate-300 text-xs font-bold hover:text-white hover:border-slate-500">Save</button>
              </div>
          )}
      </div>

    </nav>
  );
};