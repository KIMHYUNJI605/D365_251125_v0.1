import React, { useState } from 'react';
import { Plus, Sparkles, Car, FileText, ClipboardList, PhoneCall, UserPlus } from 'lucide-react';
import { AIModal } from './AIModal';

export const FloatingActions: React.FC = () => {
    const [quickOpen, setQuickOpen] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);

    return (
        <>
            {/* Container for Mobile Bottom Actions - 2 Separate Groups */}
            
            {/* 1. AI FAB - Bottom Right (Always) */}
            <div className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-center gap-2">
                 <button 
                    onClick={() => setAiOpen(true)}
                    className="w-12 h-12 md:w-14 md:h-14 bg-white text-slate-900 border border-slate-200 rounded-full shadow-fab hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative overflow-hidden group"
                 >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-100 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <Sparkles size={20} className="md:hidden text-inventis-purple" />
                    <Sparkles size={24} className="hidden md:block text-inventis-purple" />
                 </button>
                 {/* Label only on tablet/desktop */}
                 <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">AI Assist</span>
            </div>

            {/* 2. Quick Actions - Bottom Center (Mobile) / Bottom Right (Tablet) */}
            <div className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 md:right-24 md:left-auto md:translate-x-0 flex flex-col items-center md:items-end">
                
                {/* Expanded Menu */}
                <div className={`flex flex-col items-center md:items-end gap-3 mb-4 transition-all duration-300 origin-bottom ${quickOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                    {[
                        { label: 'New Lead', icon: UserPlus, color: 'bg-blue-600' },
                        { label: 'Book Drive', icon: Car, color: 'bg-emerald-600' }, 
                        { label: 'Create Quote', icon: FileText, color: 'bg-purple-600' },
                        { label: 'Add Task', icon: ClipboardList, color: 'bg-yellow-500 text-slate-900' },
                        { label: 'Log Call', icon: PhoneCall, color: 'bg-slate-700' },
                    ].map((action, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="hidden md:block text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">{action.label}</span>
                            <button className={`w-10 h-10 ${action.color} text-white rounded-full shadow-md flex items-center justify-center hover:brightness-110`}>
                                <action.icon size={18} />
                            </button>
                            <span className="md:hidden text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">{action.label}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <button 
                        onClick={() => setQuickOpen(!quickOpen)}
                        className={`w-14 h-14 bg-slate-900 text-white rounded-full shadow-fab hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center z-10 ${quickOpen ? 'rotate-45' : ''}`}
                    >
                        <Plus size={28} />
                    </button>
                    <span className="hidden md:block text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">Actions</span>
                </div>
            </div>

            {/* AI Modal */}
            {aiOpen && <AIModal onClose={() => setAiOpen(false)} />}
        </>
    );
};