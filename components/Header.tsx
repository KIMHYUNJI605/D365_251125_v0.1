import React, { useState } from 'react';
import { User, Menu, X, Search } from 'lucide-react';

const NavItem: React.FC<{ label: string; active?: boolean; mobile?: boolean }> = ({ label, active, mobile }) => (
  <button
    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      mobile ? 'w-full text-left border-l-4' : 'border-b-2'
    } ${
      active
        ? mobile ? 'border-primary-600 bg-primary-50 text-primary-700' : 'text-primary-600 border-primary-600'
        : mobile ? 'border-transparent text-slate-600 hover:bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-700'
    }`}
  >
    {label}
  </button>
);

export const Header: React.FC = () => {
  const [mode, setMode] = useState<'CRM' | 'Config'>('CRM');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-[64px] md:h-[72px] bg-white border-b border-inventis-border flex items-center justify-between px-4 md:px-8 shrink-0 relative z-40">
        {/* LEFT: Logo */}
        <div className="flex items-center md:w-1/4 lg:w-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">D</div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900">Dealer365</span>
          </div>
        </div>

        {/* CENTER: Navigation (Tablet/Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1">
          <NavItem label="Dashboard" active />
          <NavItem label="Leads" />
          <NavItem label="Inventory" />
          <NavItem label="Test Drives" />
          <NavItem label="Quotes" />
          <NavItem label="Orders" />
        </div>

        {/* RIGHT: Toggle & Profile (Tablet/Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-4 lg:gap-6 md:w-1/4 lg:w-auto">
          
          {/* Search Bar */}
          <div className="relative hidden lg:block group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-500 transition-colors" size={16} />
             <input 
                type="text" 
                placeholder="Search CRM..." 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-100 focus:bg-white focus:border-slate-300 w-48 xl:w-56 transition-all placeholder:text-slate-400 text-slate-700"
             />
          </div>

          {/* Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg flex shrink-0">
            <button
              onClick={() => setMode('CRM')}
              className={`px-3 lg:px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                mode === 'CRM' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              CRM
            </button>
            <button
              onClick={() => setMode('Config')}
              className={`px-3 lg:px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                mode === 'Config' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Config
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden xl:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none">Alex M.</p>
                  <p className="text-xs text-slate-500 mt-1">Sales Exec</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-white shadow-sm">
                  <User size={20} />
              </div>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-30 bg-slate-900/50 backdrop-blur-sm md:hidden">
          <div className="bg-white w-full shadow-xl border-b border-inventis-border animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-64px)] overflow-auto">
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 rounded-lg">
                 <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-white shadow-sm">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Alex M.</p>
                    <p className="text-xs text-slate-500">Sales Exec</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-100 my-1" />

              <NavItem label="Dashboard" active mobile />
              <NavItem label="Leads" mobile />
              <NavItem label="Inventory" mobile />
              <NavItem label="Test Drives" mobile />
              <NavItem label="Quotes" mobile />
              <NavItem label="Orders" mobile />

              <div className="h-px bg-slate-100 my-1" />
              
              <div className="px-4 py-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Mode</p>
                <div className="bg-slate-100 p-1 rounded-lg flex w-full">
                  <button
                    onClick={() => setMode('CRM')}
                    className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${
                      mode === 'CRM' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    CRM
                  </button>
                  <button
                    onClick={() => setMode('Config')}
                    className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${
                      mode === 'Config' ? 'bg-primary-600 text-white shadow-sm' : 'text-slate-500'
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