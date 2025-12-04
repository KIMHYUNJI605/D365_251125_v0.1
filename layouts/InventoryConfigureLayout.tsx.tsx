import React from 'react';
import { AppHeader } from '../components/AppHeader';
import { SalesModeNavBar, SalesTab } from '../components/SalesModeNavBar';

interface Props {
    children: React.ReactNode;
    currentTab: SalesTab;
    onTabChange: (tab: SalesTab) => void;
    onToggleMode: () => void; // Switches back to CRM View
    onNavigate?: (target: string) => void;
}

export const InventoryConfigureLayout: React.FC<Props> = ({ children, currentTab, onTabChange, onToggleMode, onNavigate }) => {
    return (
        <div className="h-screen w-screen flex flex-col bg-[#0F172A] overflow-hidden">
            {/* Level 1: Global Header (Dark) */}
            <AppHeader 
                theme="dark" 
                viewMode="configure"
                onAiAdvisor={() => console.log("Open AI Advisor")}
                onToggleMode={(mode) => { if(mode === 'crm') onToggleMode(); }}
                onNavigate={onNavigate}
            />

            {/* Level 2: Sales Nav (Dark) */}
            <SalesModeNavBar 
                activeTab={currentTab} 
                onTabChange={onTabChange}
                theme="dark"
                isConfigMode={true}
                onBackToDashboard={onToggleMode}
            />

            {/* Body Content (3D Configurator etc.) */}
            <main className="flex-1 relative overflow-hidden">
                {children}
            </main>
        </div>
    );
};