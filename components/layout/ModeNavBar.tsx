import React from 'react';
import { LayoutGrid, FileText, Calendar, Car, UserCheck, BarChart3, Wrench, MessageSquare, Receipt, Settings, Database, Lock, ArrowLeft, Plus, LayoutDashboard } from 'lucide-react';

export type AppMode = 'SALES' | 'SERVICE' | 'ADMIN';
export type ViewMode = 'CRM' | 'SHOWROOM';

interface ModeNavBarProps {
  mode: AppMode;            // 현재 대분류 모듈 (SALES, SERVICE...)
  activeTab: string;        // 현재 선택된 탭 (Dashboard, Deals...)
  onTabChange: (tabId: string) => void;
  
  // View Mode for Sales (CRM vs Showroom)
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;

  // Actions
  onNewDeal?: () => void;
  onNewRO?: () => void;
}

export const ModeNavBar: React.FC<ModeNavBarProps> = ({ 
  mode, 
  activeTab, 
  onTabChange, 
  viewMode = 'CRM', 
  onViewModeChange,
  onNewDeal, 
  onNewRO
}) => {
  // Showroom 모드일 때만 다크 테마 적용
  const isShowroom = mode === 'SALES' && viewMode === 'SHOWROOM';
  
  // --- Design Tokens ---
  // Dark Navy: #111827, Teal: #00D2BA
  const styles = {
    nav: isShowroom ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200',
    text: isShowroom ? 'text-gray-400' : 'text-gray-500',
    activeText: isShowroom ? 'text-white' : 'text-gray-900',
    activeBg: isShowroom ? 'bg-transparent' : 'bg-transparent', // 배경색 대신 텍스트 강조만
    activeBorder: isShowroom ? 'border-[#00D2BA]' : 'border-[#111827]',
    hover: isShowroom ? 'hover:text-white' : 'hover:text-gray-900',
  };

  // Tabs Configuration
  const getTabs = () => {
    if (mode === 'SALES') return [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { id: 'deals', label: 'Deals Pipeline', icon: FileText },
      { id: 'inventory', label: 'Inventory', icon: Car },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
    ];
    if (mode === 'SERVICE') return [
      { id: 'workbench', label: 'RO Workbench', icon: Wrench },
      { id: 'schedule', label: 'Schedule', icon: Calendar },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
      { id: 'billing', label: 'Billing', icon: Receipt },
    ];
    if (mode === 'ADMIN') return [
      { id: 'overview', label: 'Overview', icon: LayoutGrid },
      { id: 'users', label: 'Users & Roles', icon: UserCheck },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
    return [];
  };

  const tabs = getTabs();

  return (
    <nav className={`h-14 w-full border-b flex items-center justify-between px-6 shrink-0 z-40 transition-colors duration-300 ${styles.nav}`}>
      
      {/* LEFT: Navigation Tabs */}
      <div className="flex items-center gap-1 h-full overflow-x-auto">
         {tabs.map(tab => {
           const isActive = activeTab === tab.id;
           return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`h-full px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isActive 
                  ? `${styles.activeText} ${styles.activeBorder}` 
                  : `${styles.text} border-transparent ${styles.hover}`
              }`}
            >
              <tab.icon size={16} className={isActive && isShowroom ? 'text-[#00D2BA]' : ''} />
              <span>{tab.label}</span>
            </button>
           );
         })}
      </div>

      {/* RIGHT: View Mode Toggle & Actions */}
      <div className="flex items-center gap-4">
        
        {/* View Mode Toggle (Only for SALES) */}
        {mode === 'SALES' && onViewModeChange && (
          <div className="flex items-center gap-3 mr-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isShowroom ? 'text-gray-500' : 'text-gray-400'}`}>
              View Mode
            </span>
            <div className={`p-1 rounded-lg flex items-center gap-1 ${isShowroom ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <button 
                onClick={() => onViewModeChange('CRM')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === 'CRM' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LayoutDashboard size={14} />
                CRM
              </button>
              
              <button 
                onClick={() => onViewModeChange('SHOWROOM')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === 'SHOWROOM' 
                    ? 'bg-[#00D2BA] text-gray-900 shadow-[0_0_10px_rgba(0,210,186,0.3)]' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Car size={14} />
                Showroom
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {mode === 'SALES' && viewMode === 'CRM' && (
          <button onClick={onNewDeal} className="bg-[#111827] text-white hover:bg-black px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
            <Plus size={14} /> New Deal
          </button>
        )}

        {mode === 'SERVICE' && (
          <button onClick={onNewRO} className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
            <Plus size={14} /> New RO
          </button>
        )}
      </div>

    </nav>
  );
};