import React, { useState } from 'react';
import { Plus, Car, FileText, ClipboardList, PhoneCall, UserPlus } from 'lucide-react';

/**
 * FloatingActions Component
 *
 * Quick action FAB for common operations (New Lead, Book Drive, etc.)
 * Note: AI Assistant is now handled separately by AIAssistant component.
 */
export const FloatingActions: React.FC = () => {
    const [quickOpen, setQuickOpen] = useState(false);

    return (
        <>
            {/* Quick Actions - Bottom Left */}
            <div className="fixed z-40 bottom-6 left-6 flex flex-col items-start">
                
                {/* Expanded Menu */}
                <div className={`flex flex-col items-start gap-3 mb-4 transition-all duration-300 origin-bottom ${quickOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                    {[
                        { label: 'New Lead', icon: UserPlus, color: 'bg-blue-600' },
                        { label: 'Book Drive', icon: Car, color: 'bg-emerald-600' },
                        { label: 'Create Quote', icon: FileText, color: 'bg-purple-600' },
                        { label: 'Add Task', icon: ClipboardList, color: 'bg-yellow-500 text-slate-900' },
                        { label: 'Log Call', icon: PhoneCall, color: 'bg-slate-700' },
                    ].map((action, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <button className={`w-10 h-10 ${action.color} text-white rounded-full shadow-md flex items-center justify-center hover:brightness-110 hover:scale-105 transition-all`}>
                                <action.icon size={18} />
                            </button>
                            <span className="text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">{action.label}</span>
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
                    <span className="hidden md:block text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">Quick Actions</span>
                </div>
            </div>
        </>
    );
};