import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, User, Bot, MessageSquare, ArrowRight } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

interface AIModalProps {
    onClose: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export const AIModal: React.FC<AIModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 'welcome', 
            role: 'assistant', 
            content: 'Hello! I am your DealerAI Assistant powered by Gemini. How can I help you optimize your sales today?' 
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text
        };

        // Optimistically add user message
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        // Construct history context for multi-turn conversation
        const historyContext = newMessages.map(m => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`).join('\n');

        // Context injection simulation with history
        const context = `
        System: You are an automotive sales assistant for a premium dealership called Dealer365. 
        User: Alex M. (Sales Executive).
        Current Date: ${new Date().toLocaleDateString()}.
        Data Snapshot: 3 Test drives today, 2 deliveries pending, 4 hot leads (Michael Ross - Porsche 911).
        
        Chat History:
        ${historyContext}
        
        User's New Message: ${text}
        
        Instructions: Reply to the User's New Message naturally, using the context and history. Keep it concise, professional, and actionable. Avoid generic fluff.
        `;

        const responseText = await generateAIResponse(context);

        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseText
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    // Quick Actions
    const suggestions = [
        "Summarize my day",
        "Top 5 next actions",
        "Who are my hottest leads?",
        "Draft email for Michael Ross"
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[80vh] md:h-[600px] border border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 text-white">
                        <div className="bg-teal-500/20 p-1.5 rounded-lg border border-teal-500/50">
                            <Sparkles className="text-teal-400" size={18} />
                        </div>
                        <div>
                            <h2 className="font-bold tracking-wide text-sm md:text-base">DealerAI Chat</h2>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Gemini 3 Pro Preview</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full">
                        <X size={18} />
                    </button>
                </div>

                {/* Chat Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                                    msg.role === 'user' ? 'bg-slate-200 border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-teal-400'
                                }`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                
                                {/* Bubble */}
                                <div className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-white text-slate-800 rounded-tr-none border border-slate-200' 
                                    : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-3 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-teal-400 flex items-center justify-center shrink-0 shadow-sm">
                                    <Sparkles size={16} className="animate-pulse" />
                                </div>
                                <div className="bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-800 shadow-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions (only if few messages) */}
                {messages.length < 3 && (
                    <div className="px-4 py-2 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
                        {suggestions.map((s, i) => (
                            <button 
                                key={i}
                                onClick={() => handleSendMessage(s)}
                                className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-colors shadow-sm flex items-center gap-1.5"
                            >
                                <MessageSquare size={12} />
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Gemini..."
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
                            disabled={isLoading}
                            autoFocus
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            className="absolute right-2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight size={18} />}
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-400">AI can make mistakes. Please verify sensitive information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};