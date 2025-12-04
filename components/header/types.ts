/**
 * Header Component Type Definitions
 * Dealer365 - Unified Header System
 */

// === Navigation & Routing Types ===
export type AppModule = 'landing' | 'sales' | 'service' | 'analytics' | 'portal' | 'admin';
export type SalesView = 'dashboard' | 'deals' | 'inventory' | 'calendar' | 'customers' | 'config';
export type ServiceView = 'workshop' | 'appointments' | 'parts' | 'history';

export interface NavigationState {
  module: AppModule;
  view?: string;
  subView?: string;
}

// === Menu Hierarchy for Breadcrumbs ===
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

export const MENU_HIERARCHY: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    children: [
      { id: 'sales-dashboard', label: 'Sales', path: '/dashboard/sales' },
      { id: 'service-dashboard', label: 'Service', path: '/dashboard/service' },
      { id: 'management-dashboard', label: 'Management', path: '/dashboard/management' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    path: '/customers',
    children: [
      { id: 'customer-database', label: 'Database', path: '/customers/database' },
      { id: 'leads', label: 'Leads & Opportunities', path: '/customers/leads' },
      { id: 'communication', label: 'Communication', path: '/customers/communication' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    path: '/sales',
    children: [
      { id: 'digital-retailing', label: 'Digital Retailing', path: '/sales/digital-retailing' },
      { id: 'inventory', label: 'Inventory', path: '/sales/inventory' },
      { id: 'test-drive', label: 'Test Drive', path: '/sales/test-drive' },
      { id: 'deal-management', label: 'Deal Management', path: '/sales/deals' },
    ],
  },
  {
    id: 'service',
    label: 'Service',
    path: '/service',
    children: [
      { id: 'scheduling', label: 'Smart Scheduling', path: '/service/scheduling' },
      { id: 'repair-orders', label: 'Repair Orders', path: '/service/ro' },
      { id: 'workshop', label: 'Workshop', path: '/service/workshop' },
      { id: 'service-communication', label: 'Communication', path: '/service/communication' },
      { id: 'service-history', label: 'History', path: '/service/history' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
  },
  {
    id: 'portal',
    label: 'Portal',
    path: '/portal',
  },
];

// === Search Types ===
export type SearchCategory = 'all' | 'customers' | 'vehicles' | 'deals' | 'ros' | 'documents';

export interface SearchFilter {
  id: SearchCategory;
  label: string;
  icon: string;
}

export const SEARCH_FILTERS: SearchFilter[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'customers', label: 'Customers', icon: 'users' },
  { id: 'vehicles', label: 'Vehicles', icon: 'car' },
  { id: 'deals', label: 'Deals', icon: 'file-text' },
  { id: 'ros', label: 'ROs', icon: 'wrench' },
  { id: 'documents', label: 'Documents', icon: 'folder' },
];

export interface SearchResult {
  id: string;
  type: SearchCategory;
  title: string;
  subtitle: string;
  meta?: string;
  avatar?: string;
  status?: 'hot' | 'warm' | 'cold' | 'active' | 'pending';
}

export interface RecentSearch {
  id: string;
  query: string;
  category: SearchCategory;
  timestamp: Date;
}

// === AI Suggestion Types ===
export interface AISuggestion {
  id: string;
  type: 'hot-lead' | 'pending-approval' | 'follow-up' | 'opportunity' | 'alert';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

// === User Types ===
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  dealership: string;
}

// === Notification Types ===
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// === Header Props ===
export interface GlobalHeaderProps {
  currentModule: AppModule;
  currentView?: string;
  onNavigate: (target: string) => void;
  user?: User;
  theme?: 'light' | 'dark';
}

export interface BreadcrumbProps {
  module: AppModule;
  view?: string;
  subView?: string;
  onNavigate: (target: string) => void;
}

export interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, category: SearchCategory) => void;
  placeholder?: string;
}

export interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  currentContext?: {
    page: string;
    data?: any;
  };
  notificationCount?: number;
}
