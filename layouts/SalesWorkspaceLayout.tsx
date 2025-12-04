import React, { useState } from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { ModeNavBar } from '../components/layout/ModeNavBar';

export const SalesWorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConfigMode, setIsConfigMode] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Level 1: Global Header */}
      <AppHeader 
        mode="SALES" 
        theme={isConfigMode ? 'dark' : 'light'} 
        onAiAdvisor={() => console.log("AI Clicked")}
      />

      {/* Level 2: Mode Nav */}
      <ModeNavBar 
        mode="SALES"
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        theme={isConfigMode ? 'dark' : 'light'}
        onConfigurator={() => setIsConfigMode(true)}
        onBackToDashboard={() => setIsConfigMode(false)}
      />

      {/* Level 3: Page Content */}
      <main className="flex-1 relative overflow-hidden">
         {/* If isConfigMode is true, render dark background content or PP-SALES-01 */}
         {/* Else render standard white/gray background content like PP-CORE-01 */}
         {children}
      </main>
    </div>
  );
};