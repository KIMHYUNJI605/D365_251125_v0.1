/**
 * GlobalSearch Component
 *
 * AI-enhanced search with modal expansion, recent searches,
 * AI suggestions, filtering, and live results.
 *
 * Features:
 * - Keyboard shortcut: ⌘K (Mac) / Ctrl+K (Win)
 * - Category filtering (All, Customers, Vehicles, Deals, ROs, Documents)
 * - Recent searches with quick access
 * - AI-powered suggestions (Hot Leads, Pending Approvals, etc.)
 * - Live search results with type-ahead
 * - NLP-style natural language processing UI
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  Command,
  Clock,
  Sparkles,
  User,
  Car,
  FileText,
  Wrench,
  Folder,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Mic,
  Camera,
} from 'lucide-react';
import {
  SearchCategory,
  SearchResult,
  RecentSearch,
  AISuggestion,
  SEARCH_FILTERS,
} from './types';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResultClick?: (result: SearchResult) => void;
}

// Icon mapping for categories
const CategoryIcon: Record<SearchCategory, React.FC<{ size?: number; className?: string }>> = {
  all: Search,
  customers: User,
  vehicles: Car,
  deals: FileText,
  ros: Wrench,
  documents: Folder,
};

// Mock data for demo
const MOCK_RECENT_SEARCHES: RecentSearch[] = [
  { id: '1', query: 'Michael Ross', category: 'customers', timestamp: new Date() },
  { id: '2', query: 'BMW X5 2024', category: 'vehicles', timestamp: new Date() },
  { id: '3', query: 'RO-2024-1847', category: 'ros', timestamp: new Date() },
];

const MOCK_AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: 'ai-1',
    type: 'hot-lead',
    title: 'Michael Ross',
    description: 'Ready to close - Porsche 911 Carrera',
    action: 'View Deal',
    priority: 'high',
  },
  {
    id: 'ai-2',
    type: 'pending-approval',
    title: '3 Credit Applications',
    description: 'Awaiting your approval',
    action: 'Review',
    priority: 'medium',
  },
  {
    id: 'ai-3',
    type: 'follow-up',
    title: 'Sarah Johnson',
    description: 'Test drive scheduled - BMW i4',
    action: 'Prepare',
    priority: 'medium',
  },
];

const MOCK_RESULTS: SearchResult[] = [
  {
    id: 'r1',
    type: 'customers',
    title: 'Michael Ross',
    subtitle: 'VIP Customer • 3 Vehicles Purchased',
    meta: 'Last contact: 2 days ago',
    status: 'hot',
  },
  {
    id: 'r2',
    type: 'vehicles',
    title: '2024 BMW M4 Competition',
    subtitle: 'Isle of Man Green • Stock #BM-4421',
    meta: '₩89,000,000',
    status: 'active',
  },
  {
    id: 'r3',
    type: 'deals',
    title: 'Deal #D-2024-0892',
    subtitle: 'James Wilson • Porsche Cayenne',
    meta: 'Stage: F&I Review',
    status: 'pending',
  },
];

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  onResultClick,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Simulated search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter mock results based on query and category
      const filtered = MOCK_RESULTS.filter((r) => {
        const matchesQuery =
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = activeCategory === 'all' || r.type === activeCategory;
        return matchesQuery && matchesCategory;
      });
      setResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, activeCategory]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        onResultClick?.(results[selectedIndex]);
        onClose();
      }
    },
    [results, selectedIndex, onResultClick, onClose]
  );

  // Status badge colors
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-700';
      case 'warm':
        return 'bg-orange-100 text-orange-700';
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Global Search"
      >
        {/* Search Input Area */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search customers, vehicles, deals..."
            className="flex-1 text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
            autoComplete="off"
          />

          {/* Voice & Camera Actions */}
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Voice Search"
            >
              <Mic size={16} />
            </button>
            <button
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Scan VIN/Document"
            >
              <Camera size={16} />
            </button>
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs">
            <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">ESC</kbd>
            <span>to close</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {SEARCH_FILTERS.map((filter) => {
            const Icon = CategoryIcon[filter.id];
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon size={14} />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* No Query State - Show Recent & AI Suggestions */}
          {!query.trim() && (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Clock size={14} />
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {MOCK_RECENT_SEARCHES.map((search) => {
                    const Icon = CategoryIcon[search.category];
                    return (
                      <button
                        key={search.id}
                        onClick={() => setQuery(search.query)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-slate-50 transition-colors group"
                      >
                        <Icon size={16} className="text-slate-400" />
                        <span className="flex-1 text-sm text-slate-700">
                          {search.query}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Suggestions */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-500" />
                  AI Suggestions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MOCK_AI_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-colors text-left group"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          suggestion.priority === 'high'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {suggestion.type === 'hot-lead' ? (
                          <TrendingUp size={16} />
                        ) : (
                          <AlertCircle size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {suggestion.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {suggestion.description}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        {suggestion.action}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-600 mb-2">
                  💡 Search Tips
                </h4>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>
                    • Try natural language:{' '}
                    <span className="text-slate-700 font-medium">
                      "Show hot leads from this week"
                    </span>
                  </li>
                  <li>
                    • Filter by type:{' '}
                    <span className="text-slate-700 font-medium">
                      customer:Ross
                    </span>{' '}
                    or{' '}
                    <span className="text-slate-700 font-medium">
                      vin:WBA123...
                    </span>
                  </li>
                  <li>
                    • Use voice or scan VIN barcode for quick lookup
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && query.trim() && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Search Results */}
          {!isLoading && query.trim() && results.length > 0 && (
            <div className="p-2">
              <div className="px-2 py-1 mb-2">
                <span className="text-xs font-medium text-slate-400">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <div className="space-y-1">
                {results.map((result, index) => {
                  const Icon = CategoryIcon[result.type];
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={result.id}
                      onClick={() => {
                        onResultClick?.(result);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                        isSelected
                          ? 'bg-slate-100'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {result.title}
                          </p>
                          {result.status && (
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${getStatusColor(
                                result.status
                              )}`}
                            >
                              {result.status}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      {result.meta && (
                        <span className="text-xs text-slate-400 hidden sm:block">
                          {result.meta}
                        </span>
                      )}
                      <ArrowRight
                        size={16}
                        className="text-slate-300 shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && query.trim() && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Search size={24} className="text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                No results found
              </p>
              <p className="text-xs text-slate-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white rounded border border-slate-200 font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white rounded border border-slate-200 font-mono">↵</kbd>
              Select
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Sparkles size={12} className="text-purple-500" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Search Trigger Button Component
 * Displays in the header bar, opens the search modal
 */
interface SearchTriggerProps {
  onClick: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchTrigger: React.FC<SearchTriggerProps> = ({
  onClick,
  placeholder = 'Search...',
  className = '',
}) => {
  // Detect OS for shortcut display
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-500 transition-colors group ${className}`}
    >
      <Search size={16} className="text-slate-400" />
      <span className="hidden lg:inline text-slate-400">{placeholder}</span>
      <div className="hidden lg:flex items-center gap-0.5 ml-2 text-slate-400">
        <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px] font-mono border border-slate-200 shadow-sm">
          {isMac ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px] font-mono border border-slate-200 shadow-sm">
          K
        </kbd>
      </div>
    </button>
  );
};

export default GlobalSearch;
