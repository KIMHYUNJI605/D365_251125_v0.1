
import React, { useState, useEffect } from 'react';
import { User, Menu, X, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentView?: 'dashboard' | 'deals' | 'config';
  onNavigate?: (view: 'dashboard' | 'deals' | 'config') => void;
}

const NavItem: React.FC<{ 
  label: string; 
  active?: boolean; 
  mobile?: boolean;
  onClick?: () => void; 
}> = ({ label, active, mobile, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 group ${
      mobile ? 'w-full text-left border-l-4 py-3 px-4' : ''
    } ${
      active
        ? mobile ? 'border-primary-600 bg-primary-50 text-slate-900' : 'text-slate-900'
        : mobile ? 'border-transparent text-slate-500 hover:bg-slate-50' : 'text-slate-500 hover:text-slate-800'
    }`}
  >
    {label}
    {/* Underline for Desktop Active State */}
    {!mobile && active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-full" />
    )}
    {!mobile && !active && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-200 group-hover:w-full transition-all duration-300 rounded-full" />
    )}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView = 'dashboard', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Derive mode from currentView
  const mode = currentView === 'config' ? 'Config' : 'CRM';

  const handleNav = (view: 'dashboard' | 'deals' | 'config') => {
    if (onNavigate) onNavigate(view);
    setMobileMenuOpen(false);
  };

  const setMode = (newMode: 'CRM' | 'Config') => {
      if (newMode === 'CRM') {
          handleNav('dashboard');
      } else {
          handleNav('config');
      }
  };

  return (
    <>
      <header className="h-[56px] bg-white border-b border-slate-200 flex items-center justify-between shrink-0 relative z-40 shadow-sm">
        
        {/* LEFT: Logo (Columns 1-3) */}
        <div className="flex items-center h-full pl-8 shrink-0 w-auto cursor-pointer" onClick={() => handleNav('dashboard')}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-sm shadow-sm">D</div>
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Dealer365</span>
          </div>
        </div>

        {/* CENTER: Navigation (Columns 4-9) */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1 h-full px-4 overflow-hidden">
          {mode === 'CRM' ? (
            <div className="flex items-center gap-1">
                <NavItem label="Dashboard" active={currentView === 'dashboard'} onClick={() => handleNav('dashboard')} />
                <NavItem label="Deals" active={currentView === 'deals'} onClick={() => handleNav('deals')} />
                <NavItem label="Inventory" />
                <NavItem label="Test Drives" />
                <div className="hidden lg:block">
                    <NavItem label="More" />
                </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
                <NavItem label="Select Model" active={true} />
                <NavItem label="Saved Builds" />
                <NavItem label="Comparison" />
            </div>
          )}
        </div>

        {/* RIGHT: Actions (Columns 10-12) */}
        <div className="hidden md:flex items-center justify-end pr-8 gap-5 shrink-0 h-full">
          
          {/* Search Icon */}
          <button className="text-slate-400 hover:text-slate-700 transition-colors p-1">
             <Search size={20} strokeWidth={2} />
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200" />

          {/* CRM/Config Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex shrink-0 relative h-8 items-center">
            <button
              onClick={() => setMode('CRM')}
              className={`px-4 h-full rounded-md text-[11px] font-bold tracking-wide transition-all duration-200 ease-out z-10 ${
                mode === 'CRM' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 bg-transparent'
              }`}
            >
              CRM
            </button>
            <button
              onClick={() => setMode('Config')}
              className={`px-4 h-full rounded-md text-[11px] font-bold tracking-wide transition-all duration-200 ease-out z-10 ${
                mode === 'Config' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 bg-transparent'
              }`}
            >
              Config
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
              <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                  Alex M. <span className="text-slate-400 font-normal">(Sales Exec)</span>
              </p>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-white shadow-sm ring-1 ring-slate-100">
                  <User size={16} />
              </div>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE (Visible only on SM) */}
        <button 
          className="md:hidden p-4 text-slate-700 hover:bg-slate-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] z-30 bg-slate-900/50 backdrop-blur-sm md:hidden">
          <div className="bg-white w-full shadow-xl border-b border-slate-200 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-56px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
              {/* Mobile User Header */}
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-white shadow-sm">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Alex M.</p>
                    <p className="text-xs text-slate-500">Sales Executive</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 my-1" />

              <NavItem label="Dashboard" active={currentView === 'dashboard'} mobile onClick={() => handleNav('dashboard')} />
              <NavItem label="Deals" active={currentView === 'deals'} mobile onClick={() => handleNav('deals')} />
              <NavItem label="Inventory" mobile />
              <NavItem label="Test Drives" mobile />
              <NavItem label="More" mobile />

              <div className="h-px bg-slate-100 my-1" />
              
              <div className="px-4 py-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">System Mode</p>
                <div className="bg-slate-100 p-1 rounded-lg flex w-full">
                  <button
                    onClick={() => setMode('CRM')}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      mode === 'CRM' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    CRM
                  </button>
                  <button
                    onClick={() => setMode('Config')}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all duration-200 ${
                      mode === 'Config' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    Config
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};
