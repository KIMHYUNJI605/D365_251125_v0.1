import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, List, Zap, Mail } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

interface AIModalProps {
    onClose: () => void;
}

export const AIModal: React.FC<AIModalProps> = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [activePrompt, setActivePrompt] = useState<string>('');

    const handleAction = async (promptText: string) => {
        setLoading(true);
        setResult(null);
        setActivePrompt(promptText);
        
        // Context injection simulation
        const context = `
        Context: You are an automotive sales assistant for a premium dealership. 
        User: Alex M. 
        Data: 3 Test drives today, 2 deliveries pending, 4 hot leads (Michael Ross - Porsche 911).
        Task: ${promptText}
        Output: Keep it concise, professional, and actionable. Max 100 words.
        `;

        const response = await generateAIResponse(context);
        setResult(response);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-white">
                        <Sparkles className="text-teal-400" size={20} />
                        <h2 className="font-semibold tracking-wide">DealerAI Assistant</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 overflow-auto bg-slate-50">
                    
                    {!result && !loading && (
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => handleAction('Summarize my day and key focus areas')} 
                                className="bg-white p-4 rounded-xl border border-inventis-border hover:border-teal-500 hover:shadow-md transition-all text-left group">
                                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                    <List size={20} />
                                </div>
                                <h3 className="font-semibold text-slate-800">Summarize My Day</h3>
                                <p className="text-xs text-slate-500 mt-1">Get a briefing on KPIs and urgent tasks.</p>
                            </button>

                            <button onClick={() => handleAction('Suggest top 5 next actions to close deals')} 
                                className="bg-white p-4 rounded-xl border border-inventis-border hover:border-purple-500 hover:shadow-md transition-all text-left group">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Zap size={20} />
                                </div>
                                <h3 className="font-semibold text-slate-800">Suggest Next Actions</h3>
                                <p className="text-xs text-slate-500 mt-1">AI-driven recommendations for sales velocity.</p>
                            </button>

                             <button onClick={() => handleAction('Who are my hottest leads right now and why?')} 
                                className="bg-white p-4 rounded-xl border border-inventis-border hover:border-red-500 hover:shadow-md transition-all text-left group">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <MessageSquare size={20} />
                                </div>
                                <h3 className="font-semibold text-slate-800">Highlight HOT Leads</h3>
                                <p className="text-xs text-slate-500 mt-1">Focus on high-propensity buyers.</p>
                            </button>

                             <button onClick={() => handleAction('Draft a follow-up email for Michael Ross regarding the 911 Turbo S')} 
                                className="bg-white p-4 rounded-xl border border-inventis-border hover:border-blue-500 hover:shadow-md transition-all text-left group">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                </div>
                                <h3 className="font-semibold text-slate-800">Draft Follow-up</h3>
                                <p className="text-xs text-slate-500 mt-1">Generate personalized communication.</p>
                            </button>
                        </div>
                    )}

                    {loading && (
                         <div className="flex flex-col items-center justify-center h-48 space-y-4">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
                            <p className="text-slate-500 font-medium animate-pulse">Analyzing CRM Data...</p>
                         </div>
                    )}

                    {result && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="flex items-center gap-2 mb-4">
                                <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">Prompt</span>
                                <span className="text-sm text-slate-600 italic">"{activePrompt}"</span>
                             </div>
                             <div className="bg-white p-6 rounded-xl border border-teal-100 shadow-sm relative overflow-hidden">
                                 <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                                 <div className="prose prose-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                                    {result}
                                 </div>
                             </div>
                             <div className="mt-6 flex justify-end">
                                 <button onClick={() => setResult(null)} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
                                    Ask Another Question
                                 </button>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};