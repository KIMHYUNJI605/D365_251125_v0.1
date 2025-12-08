import React from 'react';
import { Search, Bell, HelpCircle, User, Mic, Camera, ScanText, Sparkles } from 'lucide-react';

export type AppMode = 'SALES' | 'SERVICE' | 'ADMIN';

interface AppHeaderProps {
  mode: AppMode;
  theme?: 'light' | 'dark';
  onSearch?: (query: string) => void;
  onAiAdvisor?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  mode, 
  theme = 'light',
  onSearch,
  onAiAdvisor 
}) => {
  const isDark = theme === 'dark';
  
  // Color Tokens based on Theme
  const bgClass = isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderClass = isDark ? 'border-slate-700' : 'border-slate-200';
  const inputBg = isDark ? 'bg-slate-900 text-white placeholder:text-slate-600' : 'bg-slate-100 text-slate-900 placeholder:text-slate-400';

  // Mode Badge Color
  const getModeColor = () => {
    if (mode === 'SALES') return isDark ? 'text-[#3FE0C5]' : 'text-blue-600';
    if (mode === 'SERVICE') return 'text-orange-500';
    return 'text-purple-500';
  };

  return (
    <header className={`h-[64px] w-full border-b flex items-center justify-between px-6 shrink-0 z-50 transition-colors duration-300 ${bgClass}`}>
      
      {/* LEFT: Identity */}
      <div className="flex items-center gap-4 min-w-[240px]">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm ${isDark ? 'bg-[#3FE0C5] text-slate-900' : 'bg-slate-900 text-white'}`}>
            D
          </div>
          <div className="flex flex-col justify-center">
             <span className={`text-base font-bold leading-none ${textPrimary}`}>Dealer365</span>
             <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${getModeColor()}`}>
               {mode === 'SALES' && (isDark ? 'Showroom' : 'Sales Workspace')}
               {mode === 'SERVICE' && 'Service Center'}
               {mode === 'ADMIN' && 'Admin Console'}
             </span>
          </div>
        </div>
      </div>

      {/* CENTER: Super Search */}
      <div className="flex-1 max-w-2xl px-4">
        <div className="relative group">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSecondary}`}>
               <Search size={18} />
            </div>
            <input 
               type="text"
               placeholder={mode === 'SERVICE' ? "Search RO, VIN, License Plate..." : "Search Leads, Inventory, Customers..."}
               className={`w-full h-10 pl-10 pr-24 rounded-xl border border-transparent focus:border-[#3FE0C5] focus:ring-1 focus:ring-[#3FE0C5] outline-none text-sm transition-all ${inputBg}`}
            />
            {/* Input Action Icons */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button className={`p-1.5 rounded-md hover:bg-slate-500/10 transition-colors ${textSecondary}`} title="Voice Search"><Mic size={16}/></button>
                <button className={`p-1.5 rounded-md hover:bg-slate-500/10 transition-colors ${textSecondary}`} title="OCR Scan"><ScanText size={16}/></button>
                <button className={`p-1.5 rounded-md hover:bg-slate-500/10 transition-colors ${textSecondary}`} title="Image Search"><Camera size={16}/></button>
            </div>
        </div>
      </div>

      {/* RIGHT: Global Actions */}
      <div className="flex items-center gap-3 min-w-[240px] justify-end">
        <button 
          onClick={onAiAdvisor}
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${isDark ? 'bg-[#3FE0C5] text-slate-900 hover:bg-[#32b29d]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
        >
          <Sparkles size={14} />
          <span>AI Advisor</span>
        </button>
        
        <div className={`h-6 w-px mx-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

        <button className={`p-2 rounded-full hover:bg-slate-500/10 transition-colors relative ${textSecondary}`}>
           <Bell size={20} />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className={`p-2 rounded-full hover:bg-slate-500/10 transition-colors ${textSecondary}`}>
           <HelpCircle size={20} />
        </button>
        <button className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm hover:ring-2 hover:ring-offset-1 transition-all ml-1 ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 ring-offset-slate-900' : 'bg-white border-slate-200 text-slate-600'}`}>
           <User size={18} />
        </button>
      </div>

    </header>
  );
};