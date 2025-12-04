/**
 * AIAssistant Component
 *
 * Floating AI assistant with contextual suggestions and chat interface.
 *
 * Features:
 * - Fixed position: bottom-right (24px offset)
 * - Floating button with gradient, sparkles icon
 * - Hover scale-up with shadow
 * - Notification badge
 * - Expanded panel with:
 *   - Contextual suggestions based on current page
 *   - Quick action buttons
 *   - Chat interface with input
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  User,
  Bot,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { generateAIResponse } from '../../services/geminiService';

interface AIAssistantProps {
  currentContext?: {
    page: string;
    module?: string;
    data?: Record<string, any>;
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ContextualSuggestion {
  id: string;
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  description: string;
  action: string;
}

// Contextual suggestions based on page
const getContextualSuggestions = (page: string): ContextualSuggestion[] => {
  const basesuggestions: Record<string, ContextualSuggestion[]> = {
    dashboard: [
      {
        id: 'ds-1',
        icon: TrendingUp,
        title: 'Daily Performance',
        description: 'Review your key metrics and trends',
        action: 'Analyze',
      },
      {
        id: 'ds-2',
        icon: Calendar,
        title: 'Schedule Overview',
        description: '5 appointments today',
        action: 'View',
      },
      {
        id: 'ds-3',
        icon: Lightbulb,
        title: 'AI Insights',
        description: 'Based on your recent activity',
        action: 'Explore',
      },
    ],
    deals: [
      {
        id: 'dl-1',
        icon: TrendingUp,
        title: 'Hot Deals Alert',
        description: '3 deals ready to close this week',
        action: 'Review',
      },
      {
        id: 'dl-2',
        icon: FileText,
        title: 'Missing Documents',
        description: '2 deals need attention',
        action: 'Fix',
      },
      {
        id: 'dl-3',
        icon: Zap,
        title: 'Speed Up Process',
        description: 'AI tips to close faster',
        action: 'Learn',
      },
    ],
    config: [
      {
        id: 'cf-1',
        icon: CheckCircle,
        title: 'Configuration Check',
        description: 'Validate pricing and options',
        action: 'Verify',
      },
      {
        id: 'cf-2',
        icon: FileText,
        title: 'Generate Quote',
        description: 'Create customer proposal',
        action: 'Generate',
      },
      {
        id: 'cf-3',
        icon: Sparkles,
        title: 'Similar Configs',
        description: 'See what others chose',
        action: 'Compare',
      },
    ],
    default: [
      {
        id: 'df-1',
        icon: Lightbulb,
        title: 'Getting Started',
        description: 'Quick tips for this page',
        action: 'Learn',
      },
      {
        id: 'df-2',
        icon: MessageSquare,
        title: 'Ask Anything',
        description: 'I can help with any question',
        action: 'Chat',
      },
    ],
  };

  return basesuggestions[page] || basesuggestions['default'];
};

// Quick action prompts
const QUICK_PROMPTS = [
  'Summarize my day',
  'Who needs follow-up?',
  'Best deals to focus on',
  'Draft customer email',
];

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello! I\'m your AI Assistant. How can I help you today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount] = useState(2);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = getContextualSuggestions(currentContext?.page || 'default');

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle sending message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build context for AI
      const context = `
        System: You are a helpful AI assistant for Dealer365, an automotive dealership platform.
        Current Page: ${currentContext?.page || 'Unknown'}
        Current Module: ${currentContext?.module || 'Unknown'}
        User Query: ${text}

        Provide a helpful, concise response. Be specific and actionable.
      `;

      const response = await generateAIResponse(context);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[1000] w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-700 rotate-0'
            : 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/25'
        }`}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <>
            <Sparkles size={24} className="text-white" />
            {/* Notification Badge */}
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {notificationCount}
              </span>
            )}
          </>
        )}

        {/* Shimmer effect on button */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        )}
      </button>

      {/* Label under button */}
      {!isOpen && (
        <span className="fixed bottom-1 right-6 z-[1000] text-[10px] font-bold text-slate-500 uppercase tracking-wider w-14 text-center">
          AI Assist
        </span>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[999] w-[380px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200"
          role="dialog"
          aria-label="AI Assistant Panel"
        >
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Assistant</h3>
                  <p className="text-[10px] text-white/80 uppercase tracking-wider">
                    Dealer365 Intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-white/80">Active</span>
              </div>
            </div>
          </div>

          {/* Contextual Suggestions */}
          {messages.length <= 1 && (
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Suggestions for you
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSendMessage(suggestion.title)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {suggestion.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {suggestion.description}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {suggestion.action}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-100 text-slate-800 rounded-tr-none'
                        : 'bg-purple-50 text-slate-700 rounded-tl-none border border-purple-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-white animate-pulse" />
                  </div>
                  <div className="bg-purple-50 px-4 py-3 rounded-2xl rounded-tl-none border border-purple-100 flex items-center gap-1">
                    <div
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-100">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Zap size={12} />
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              Powered by Gemini AI • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
