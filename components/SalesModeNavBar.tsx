import React from 'react';
import { LayoutGrid, FileText, Calendar, Car, UserCheck, BarChart3, Plus, ArrowRight } from 'lucide-react';
import { HeaderTheme } from './AppHeader';

export type SalesTab = 'dashboard' | 'deals' | 'config' | 'calendar' | 'customers' | 'reports';

interface SalesModeNavBarProps {
  activeTab: SalesTab;
  onTabChange: (tabId: SalesTab) => void;
  theme?: HeaderTheme;
  
  // Actions
  onNewDeal?: () => void;
  onConfigurator?: () => void;
  onNewRO?: () => void;
  onBackToDashboard?: () => void; 
}

export const SalesModeNavBar: React.FC<SalesModeNavBarProps> = ({ 
  activeTab, 
  onTabChange, 
  theme = 'light',
  onNewDeal, 
  onConfigurator, 
  onNewRO, 
  onBackToDashboard
}) => {
  const isDark = theme === 'dark';

  // Theme Styles
  const styles = {
    bg: isDark ? 'bg-[#0F172A]/95 backdrop-blur-md border-slate-800' : 'bg-white border-slate-200',
    textDefault: isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800',
    textActive: isDark ? 'text-white' : 'text-slate-900',
    indicator: isDark ? 'bg-[#3FE0C5]' : 'bg-slate-900',
    labelColor: isDark ? 'text-slate-400' : 'text-slate-500',
    activeLabelColor: isDark ? 'text-white' : 'text-slate-900',
    primaryBtn: isDark 
      ? 'bg-[#3FE0C5] text-slate-900 hover:bg-[#32b29d]' 
      : 'bg-slate-900 text-white hover:bg-slate-800',
  };

  const tabs: { id: SalesTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'deals', label: 'Deals Pipeline', icon: FileText },
    { id: 'config', label: 'Inventory & Configure', icon: Car },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Dashboard';

  return (
    <nav className={`h-[56px] w-full border-b flex items-center justify-between px-6 shrink-0 z-40 transition-colors duration-300 ${styles.bg} sticky top-[64px]`}>
      
      {/* LEFT: Breadcrumb */}
      <div className="flex items-center min-w-[240px] gap-2 text-sm">
         <span className={`font-bold uppercase tracking-wider ${styles.labelColor}`}>SALES</span>
         <span className="text-slate-300/50">/</span>
         <span className={`font-bold ${styles.activeLabelColor}`}>{currentTabLabel}</span>
      </div>

      {/* CENTER: Tabs */}
      <div className="flex-1 flex justify-center h-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 h-full px-4">
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative h-full flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
                            isActive ? styles.textActive : styles.textDefault
                        }`}
                    >
                        <span className="hidden xl:inline-block"><tab.icon size={16} strokeWidth={isActive ? 2.5 : 2} /></span>
                        <span>{tab.label}</span>
                        {isActive && (
                            <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-full ${styles.indicator}`} />
                        )}
                    </button>
                );
            })}
        </div>
      </div>

      {/* RIGHT: Quick Actions (Reduced) */}
      <div className="flex items-center justify-end gap-3 min-w-[240px]">
          {/* Mode Specific Actions */}
          {!isDark && onNewDeal && (
            <button onClick={onNewDeal} className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 ${styles.primaryBtn}`}>
                <Plus size={14} /> New Deal
            </button>
          )}
          
          {isDark && onBackToDashboard && (
             <button onClick={onBackToDashboard} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-[#3FE0C5] transition-colors group">
                <div className="p-1.5 rounded-full bg-slate-800 border border-slate-700 group-hover:border-[#3FE0C5] transition-colors">
                    <ArrowLeft size={14} />
                </div>
                Back to Dashboard
             </button>
          )}
      </div>

    </nav>
  );
};