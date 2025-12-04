import React from 'react';
import { Car, Wrench, Settings, ArrowRight, TrendingUp, AlertCircle, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (module: 'sales' | 'service' | 'admin') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="h-full w-full bg-[#0F172A] flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#3FE0C5]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-12 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Welcome to <span className="text-[#3FE0C5]">DEALER365</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Select a workspace to begin. Your unified platform for sales, service, and dealership management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl z-10">
        
        {/* SALES MODULE CARD */}
        <div 
          onClick={() => onNavigate('sales')}
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#3FE0C5] hover:shadow-[0_0_30px_rgba(63,224,197,0.15)] transition-all duration-300 cursor-pointer flex flex-col h-[320px]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3FE0C5] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-[#3FE0C5] group-hover:text-slate-900 transition-colors">
              <Car size={32} strokeWidth={1.5} />
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2 border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">Live</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Sales Workspace</h2>
          <p className="text-slate-400 text-sm mb-8 flex-1">
            Manage leads, configure vehicles, and track deals pipeline. Access the 3D showroom and customer CRM.
          </p>

          {/* Live Data Snippet */}
          <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 flex items-center justify-between group-hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-green-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Hot Leads Today</p>
                <p className="text-lg font-bold text-white">12 <span className="text-xs font-normal text-green-400">(+3)</span></p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-600 group-hover:text-[#3FE0C5] transition-colors" />
          </div>
        </div>

        {/* SERVICE MODULE CARD */}
        <div 
          onClick={() => onNavigate('service')}
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(251,146,60,0.15)] transition-all duration-300 cursor-pointer flex flex-col h-[320px]"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-400 group-hover:text-slate-900 transition-colors">
              <Wrench size={32} strokeWidth={1.5} />
            </div>
             <div className="bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2 border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">Live</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Service Center</h2>
          <p className="text-slate-400 text-sm mb-8 flex-1">
            Handle repair orders (RO), schedule appointments, and manage technician workflow efficiency.
          </p>

           {/* Live Data Snippet */}
           <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 flex items-center justify-between group-hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-orange-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Urgent ROs</p>
                <p className="text-lg font-bold text-white">4 <span className="text-xs font-normal text-slate-400">Pending</span></p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-600 group-hover:text-orange-400 transition-colors" />
          </div>
        </div>

        {/* ADMIN MODULE CARD */}
        <div 
          onClick={() => onNavigate('admin')}
          className="group relative bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col h-[320px]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
              <Settings size={32} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-300 mb-2">Admin Console</h2>
          <p className="text-slate-500 text-sm mb-8 flex-1">
            System configuration, user management, and dealership settings. (Restricted Access)
          </p>

           {/* Static Snippet */}
           <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-800/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={18} className="text-slate-600" />
              <div>
                <p className="text-xs text-slate-600 uppercase font-bold">Active Users</p>
                <p className="text-lg font-bold text-slate-400">28</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-700" />
          </div>
        </div>

      </div>
      
      <div className="mt-12 text-slate-600 text-xs">
        © 2025 Dealer365 Platform. All rights reserved. v2.0.4
      </div>
    </div>
  );
};