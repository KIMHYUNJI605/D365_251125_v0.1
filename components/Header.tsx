import React from 'react';
import { User, Search, Grid, Wrench, Car, LayoutDashboard, FileText, Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  currentView?: string;
  onNavigate?: (view: any) => void;
  currentModule: 'landing' | 'sales' | 'service' | 'config';
}

const NavItem: React.FC<{ 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
  icon?: React.ReactNode;
}> = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors duration-200 rounded-lg ${
      active 
      ? 'text-slate-900 bg-slate-100' 
      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, currentModule }) => {
  
  // 1. LANDING MODE: Minimal Header
  if (currentModule === 'landing') {
      return (
        <header className="h-[64px] bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-8 shrink-0 z-40">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#3FE0C5] rounded-lg flex items-center justify-center text-slate-900 font-extrabold text-base shadow-[0_0_15px_rgba(63,224,197,0.3)]">D</div>
                <span className="text-xl font-bold tracking-tight text-white leading-none">Dealer365</span>
            </div>
             <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white">Alex M.</p>
                    <p className="text-[10px] text-slate-400">Sales Executive</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 cursor-pointer hover:border-[#3FE0C5] transition-colors">
                    <User size={18} />
                </div>
            </div>
        </header>
      )
  }

  // 2. WORKSPACE MODES (Sales / Service / Config)
  return (
    <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between shrink-0 relative z-40 shadow-sm px-4 lg:px-6 font-sans">
      
      {/* LEFT: Module Identity & App Switcher */}
      <div className="flex items-center h-full gap-4">
        <button 
            onClick={() => onNavigate && onNavigate('landing')}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="Go to Launchpad"
        >
            <Grid size={20} />
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm ${currentModule === 'service' ? 'bg-orange-500' : 'bg-slate-900'}`}>D</div>
            <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 leading-none hidden sm:block">Dealer365</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${currentModule === 'service' ? 'text-orange-500' : 'text-slate-500'}`}>
                    {currentModule === 'service' ? 'Service Center' : 'Sales Workspace'}
                </span>
            </div>
        </div>
      </div>

      {/* CENTER: Contextual Navigation Tabs */}
      <div className="hidden md:flex items-center justify-center gap-1 flex-1 h-full px-4">
        {currentModule === 'sales' || currentModule === 'config' ? (
            <>
                <NavItem label="Dashboard" icon={<LayoutDashboard size={16}/>} active={currentView === 'dashboard'} onClick={() => onNavigate && onNavigate('sales')} />
                <NavItem label="Deals Pipeline" icon={<FileText size={16}/>} active={currentView === 'deals'} onClick={() => onNavigate && onNavigate('deals')} />
                <NavItem label="Inventory" icon={<Car size={16}/>} />
                <NavItem label="Calendar" icon={<Calendar size={16}/>} />
            </>
        ) : currentModule === 'service' ? (
            <>
                <NavItem label="Workshop" icon={<Wrench size={16}/>} active={true} />
                <NavItem label="Appointments" icon={<Calendar size={16}/>} />
                <NavItem label="Parts" icon={<Settings size={16}/>} />
            </>
        ) : null}
      </div>

      {/* RIGHT: Contextual Tools */}
      <div className="flex items-center justify-end gap-3 shrink-0 h-full">
        
        {/* Contextual Search */}
        <div className="relative hidden lg:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder={currentModule === 'sales' ? "Search Leads, Vehicles..." : "Search RO, VIN, Tag..."}
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent rounded-full text-xs font-medium focus:bg-white focus:ring-2 focus:ring-slate-200 focus:outline-none w-56 transition-all"
            />
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Primary Action Button */}
        {(currentModule === 'sales' || currentModule === 'config') && (
            <button
              onClick={() => onNavigate && onNavigate('config')}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${
                  currentView === 'config' 
                  ? 'bg-[#3FE0C5] text-slate-900 hover:bg-[#32b29d]' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Car size={16} /> {currentView === 'config' ? 'Config Active' : 'Configurator'}
            </button>
        )}
        
        {currentModule === 'service' && (
             <button
             className="hidden sm:flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm"
           >
             <Wrench size={16} /> New RO
           </button>
        )}

        {/* User Profile */}
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-white shadow-sm ring-1 ring-slate-100 cursor-pointer ml-1">
            <User size={16} />
        </div>
      </div>

    </header>
  );
};