/**
 * GlobalHeader Component
 *
 * Unified header container for Dealer365.
 * Layout: [Logo] [Nav Items] ... (spacer) ... [Search] [AI] [Notif] [User]
 * Height: 64px
 *
 * Features:
 * - Responsive design with mobile adaptations
 * - Module-aware navigation tabs
 * - Integrated global search with keyboard shortcut
 * - AI Advisor quick access
 * - Notification center
 * - User profile menu
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  LayoutDashboard,
  FileText,
  Car,
  Calendar,
  Wrench,
  Settings,
  Users,
  Sparkles,
  BarChart3,
  Globe,
} from 'lucide-react';
import { GlobalHeaderProps, AppModule } from './types';
import { Breadcrumb, BreadcrumbCompact } from './Breadcrumb';
import { GlobalSearch, SearchTrigger } from './GlobalSearch';
import { NotificationBell } from './NotificationBell';
import { UserMenu } from './UserMenu';

// Navigation tab configuration per module
interface NavTab {
  id: string;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
  view: string;
}

const MODULE_TABS: Record<AppModule, NavTab[]> = {
  landing: [],
  sales: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { id: 'deals', label: 'Deals Pipeline', icon: FileText, view: 'deals' },
    { id: 'inventory', label: 'Inventory', icon: Car, view: 'inventory' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, view: 'calendar' },
    { id: 'customers', label: 'Customers', icon: Users, view: 'customers' },
  ],
  service: [
    { id: 'workshop', label: 'Workshop', icon: Wrench, view: 'workshop' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, view: 'appointments' },
    { id: 'parts', label: 'Parts', icon: Settings, view: 'parts' },
  ],
  analytics: [
    { id: 'overview', label: 'Overview', icon: BarChart3, view: 'overview' },
    { id: 'reports', label: 'Reports', icon: FileText, view: 'reports' },
  ],
  portal: [
    { id: 'portal-home', label: 'Portal Home', icon: Globe, view: 'portal-home' },
  ],
  admin: [
    { id: 'settings', label: 'Settings', icon: Settings, view: 'settings' },
    { id: 'users', label: 'Users', icon: Users, view: 'users' },
  ],
};

// Module colors for branding
const MODULE_COLORS: Record<AppModule, { primary: string; accent: string }> = {
  landing: { primary: 'slate-900', accent: '#3FE0C5' },
  sales: { primary: 'slate-900', accent: '#3FE0C5' },
  service: { primary: 'orange-500', accent: '#F97316' },
  analytics: { primary: 'blue-600', accent: '#3B82F6' },
  portal: { primary: 'purple-600', accent: '#9333EA' },
  admin: { primary: 'slate-700', accent: '#64748B' },
};

// Module labels
const MODULE_LABELS: Record<AppModule, string> = {
  landing: 'Platform Hub',
  sales: 'Sales Workspace',
  service: 'Service Center',
  analytics: 'Analytics',
  portal: 'Customer Portal',
  admin: 'Admin Console',
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentModule,
  currentView,
  onNavigate,
  user,
  theme = 'light',
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const tabs = MODULE_TABS[currentModule] || [];
  const moduleLabel = MODULE_LABELS[currentModule];
  const moduleColor = MODULE_COLORS[currentModule];

  // Global keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle navigation
  const handleTabClick = useCallback(
    (view: string) => {
      onNavigate(view);
    },
    [onNavigate]
  );

  // Landing page has a different header style
  if (currentModule === 'landing') {
    return (
      <header className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#3FE0C5] rounded-lg flex items-center justify-center text-slate-900 font-black text-lg shadow-[0_0_15px_rgba(63,224,197,0.3)]">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">
              Dealer365
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3FE0C5]">
              Platform Hub
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Trigger (Dark) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-sm">Search</span>
            <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px] font-mono text-slate-500">
              ⌘K
            </kbd>
          </button>

          <div className="h-6 w-px bg-slate-700" />

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">
                {user?.name || 'Alex M.'}
              </p>
              <p className="text-[10px] text-slate-400">
                {user?.role || 'Sales Executive'}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 cursor-pointer hover:border-[#3FE0C5] transition-colors">
              <span className="text-sm font-bold">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Modal */}
        <GlobalSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </header>
    );
  }

  // Standard workspace header
  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40 shadow-sm">
        {/* LEFT: Module Identity & App Switcher */}
        <div className="flex items-center gap-3 min-w-[200px]">
          {/* App Switcher / Home Button */}
          <button
            onClick={() => onNavigate('landing')}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors"
            title="Go to Platform Hub"
          >
            <Grid size={20} />
          </button>

          {/* Logo & Module Name */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm ${
                currentModule === 'service' ? 'bg-orange-500' : 'bg-slate-900'
              }`}
            >
              D
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">
                Dealer365
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                  currentModule === 'service'
                    ? 'text-orange-500'
                    : 'text-[#3FE0C5]'
                }`}
              >
                {moduleLabel}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-slate-200 ml-2" />

          {/* Breadcrumb (Desktop) */}
          <div className="hidden md:block ml-2">
            <Breadcrumb
              module={currentModule}
              view={currentView}
              onNavigate={onNavigate}
            />
          </div>
        </div>

        {/* CENTER: Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.view;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.view)}
                className={`relative px-4 py-2 text-sm font-semibold flex items-center gap-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3FE0C5] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Global Actions */}
        <div className="flex items-center gap-2 min-w-[200px] justify-end">
          {/* Search Trigger */}
          <SearchTrigger
            onClick={() => setIsSearchOpen(true)}
            placeholder={
              currentModule === 'service'
                ? 'Search RO, VIN...'
                : 'Search leads, vehicles...'
            }
          />

          {/* AI Advisor Button */}
          <button
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-xs font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Sparkles size={14} />
            <span className="hidden xl:inline">AI Advisor</span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Notifications */}
          <NotificationBell />

          {/* User Menu */}
          <UserMenu user={user} onLogout={() => onNavigate('landing')} />
        </div>
      </header>

      {/* Mobile Breadcrumb Bar */}
      <div className="md:hidden bg-slate-50 border-b border-slate-200 px-4 py-2">
        <BreadcrumbCompact
          module={currentModule}
          view={currentView}
          onNavigate={onNavigate}
        />
      </div>

      {/* Mobile Navigation Tabs */}
      {tabs.length > 0 && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.view;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.view)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default GlobalHeader;
