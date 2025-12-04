import React from 'react';
import { Search, Bell, HelpCircle, User, Mic, Camera, ScanText, Sparkles, CheckCircle } from 'lucide-react';

export type AppMode = 'SALES' | 'SERVICE' | 'ADMIN';

interface AppHeaderProps {
  mode: AppMode;
  theme?: 'light' | 'dark';
  onSearch?: (query: string) => void;
  onAiAdvisor?: () => void;
  onCheckIn?: () => void; // New Action
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  mode, 
  theme = 'light',
  onSearch,
  onAiAdvisor,
  onCheckIn
}) => {
  const isDark = theme === 'dark';
  
  // --- Design Tokens (Standardized) ---
  // Primary Brand: #00D2BA (Teal)
  // Dark Background: #111827 (Dark Navy)
  
  const colors = {
    bg: isDark ? 'bg-[#111827] border-gray-800' : 'bg-white border-gray-200',
    textPrimary: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-400' : 'text-gray-500',
    inputBg: isDark 
      ? 'bg-gray-900 text-white placeholder:text-gray-600 focus:border-[#00D2BA]' 
      : 'bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#00D2BA]',
    logoBg: isDark ? 'bg-[#00D2BA] text-gray-900' : 'bg-[#111827] text-white'
  };

  // Mode Badge Logic
  const getModeLabel = () => {
    switch(mode) {
      case 'SALES': return isDark ? 'Showroom Mode' : 'Sales Workspace';
      case 'SERVICE': return 'Service Center';
      case 'ADMIN': return 'Admin Console';
      default: return '';
    }
  };

  return (
    <header className={`h-16 w-full border-b flex items-center justify-between px-6 shrink-0 z-50 transition-colors duration-300 ${colors.bg}`}>
      
      {/* LEFT: Identity (Cleaned up - No Grid Icon) */}
      <div className="flex items-center gap-3 min-w-[240px]">
        {/* Logo Mark */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm shrink-0 ${colors.logoBg}`}>
          D
        </div>
        {/* Brand Name & Mode */}
        <div className="flex flex-col justify-center">
          <span className={`text-base font-bold leading-none tracking-tight ${colors.textPrimary}`}>
            Dealer365
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-[#00D2BA]">
            {getModeLabel()}
          </span>
        </div>
      </div>

      {/* CENTER: Omni-Search (Retained functional icons) */}
      <div className="flex-1 max-w-2xl px-8">
        <div className="relative group">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${colors.textSecondary}`}>
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder={mode === 'SERVICE' ? "Search RO, VIN, License Plate..." : "Search Leads, Inventory, Customers..."}
            className={`w-full h-10 pl-10 pr-24 rounded-full border border-transparent focus:ring-1 focus:ring-[#00D2BA] outline-none text-sm transition-all ${colors.inputBg}`}
          />
          {/* Input Action Icons (Voice/OCR/Cam) */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <button className={`p-1.5 rounded-full hover:bg-gray-500/10 transition-colors ${colors.textSecondary}`} title="Voice Search"><Mic size={14}/></button>
             <button className={`p-1.5 rounded-full hover:bg-gray-500/10 transition-colors ${colors.textSecondary}`} title="OCR Scan"><ScanText size={14}/></button>
             <button className={`p-1.5 rounded-full hover:bg-gray-500/10 transition-colors ${colors.textSecondary}`} title="Image Search"><Camera size={14}/></button>
          </div>
        </div>
      </div>

      {/* RIGHT: Global Actions */}
      <div className="flex items-center gap-3 min-w-[240px] justify-end">
        
        {/* 1. Primary Action: Check-in (New Standard) */}
        <button 
          onClick={onCheckIn}
          className="bg-[#00D2BA] hover:bg-[#00bfab] text-gray-900 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-transform active:scale-95 shadow-[0_0_10px_rgba(0,210,186,0.2)]"
        >
          <CheckCircle size={14} strokeWidth={2.5} />
          <span>Check-in</span>
        </button>

        {/* 2. AI Advisor */}
        <button 
          onClick={onAiAdvisor}
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all border ${
            isDark 
            ? 'border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-[#00D2BA]' 
            : 'border-gray-200 bg-white text-gray-600 hover:text-[#111827] hover:border-[#111827]'
          }`}
        >
          <Sparkles size={14} className={isDark ? "text-[#00D2BA]" : "text-purple-600"} />
          <span>AI Advisor</span>
        </button>
        
        <div className={`h-5 w-px mx-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {/* 3. Notifications */}
        <button className={`p-2 rounded-full hover:bg-gray-500/10 transition-colors relative ${colors.textSecondary}`}>
           <Bell size={20} />
           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111827]"></span>
        </button>

        {/* 4. Help */}
        <button className={`p-2 rounded-full hover:bg-gray-500/10 transition-colors ${colors.textSecondary}`}>
           <HelpCircle size={20} />
        </button>

        {/* 5. Profile */}
        <button className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm transition-all ml-1 ${
          isDark 
          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-[#00D2BA]' 
          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
        }`}>
           <User size={18} />
        </button>
      </div>

    </header>
  );
};