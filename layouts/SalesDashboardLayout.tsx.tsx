import React from 'react';
import { AppHeader } from '../components/AppHeader';
import { SalesModeNavBar, SalesTab } from '../components/SalesModeNavBar';

interface Props {
    children: React.ReactNode;
    currentTab: SalesTab;
    onTabChange: (tab: SalesTab) => void;
    onToggleMode: () => void; // Switches to Config View
    onNavigate?: (target: string) => void; // For AppHeader nav
}

export const SalesDashboardLayout: React.FC<Props> = ({ children, currentTab, onTabChange, onToggleMode, onNavigate }) => {
    return (
        <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden">
            {/* Level 1: Global Header (Light) */}
            <AppHeader 
                theme="light" 
                viewMode="crm"
                onAiAdvisor={() => console.log("Open AI Advisor")}
                onToggleMode={(mode) => { if(mode === 'configure') onToggleMode(); }}
                onNavigate={onNavigate}
            />

            {/* Level 2: Sales Nav (Light) */}
            <SalesModeNavBar 
                activeTab={currentTab}
                onTabChange={onTabChange}
                theme="light"
                isConfigMode={false}
                onNewDeal={() => console.log("New Deal")}
            />

            {/* Body Content */}
            <main className="flex-1 relative overflow-hidden">
                {children}
            </main>
        </div>
    );
};